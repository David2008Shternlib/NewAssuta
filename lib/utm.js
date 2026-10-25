/**
 * Откуда пришёл посетитель.
 *
 * Клиника платит блогерам за приведённых пациентов, значит в каждой заявке
 * должно быть написано, по чьей ссылке человек пришёл. Для этого в адресе
 * ссылки блогера стоят метки вида ?utm_source=masha&utm_medium=blogger.
 *
 * Главная сложность не в том, чтобы их прочитать, а в том, чтобы не потерять.
 * Человек приходит на главную с меткой, потом смотрит врачей, цены,
 * заболевания — и к моменту заполнения формы метки в адресе давно нет.
 * Поэтому при первом заходе мы её запоминаем и держим 90 дней.
 *
 * Храним ДВА источника:
 *  — first: по чьей ссылке человек впервые попал на сайт. Именно он
 *    определяет, кому платить: заслуга привода принадлежит блогеру, даже
 *    если через неделю человек вернулся из поиска;
 *  — last: последний источник. Нужен, чтобы видеть, что именно вернуло
 *    человека к заявке.
 *
 * Хранилище — localStorage. Он может быть недоступен (приватный режим
 * в Safari, запрет сторонних данных), поэтому каждое обращение обёрнуто:
 * при отказе просто теряем привязку, но форма продолжает работать.
 */

const KEY = "assuta_attr";
const TTL_DAYS = 90;

// Метки, которые понимаем. utm_term — для контекстной рекламы, пока не
// используется, но пусть доезжает: дешевле принять, чем потом добавлять.
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

const safeGet = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const safeSet = (value) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* хранилище недоступно — молча продолжаем без привязки */
  }
};

const expired = (iso) => {
  if (!iso) return true;
  const age = Date.now() - new Date(iso).getTime();
  return !Number.isFinite(age) || age > TTL_DAYS * 24 * 60 * 60 * 1000;
};

// Из чужих доменов нам интересен только хост: полный адрес реферера
// может содержать чужие параметры, и тащить их в карточку пациента незачем.
function referrerHost() {
  try {
    if (!document.referrer) return "";
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    return host === window.location.hostname ? "" : host;
  } catch {
    return "";
  }
}

/**
 * Что можно вычитать из текущего адреса. Возвращает null, если взять нечего:
 * иначе каждый переход внутри сайта затирал бы источник пустотой.
 */
function currentTouch() {
  const p = new URLSearchParams(window.location.search);
  const touch = {};

  UTM_KEYS.forEach((k) => {
    const v = (p.get(k) || "").trim().slice(0, 64);
    if (v) touch[k.replace("utm_", "")] = v;
  });

  const ref = referrerHost();

  // Переход с чужого сайта без меток — тоже источник, пусть и грубый:
  // лучше «пришёл из telegram», чем пустая строка.
  if (!Object.keys(touch).length && ref) {
    touch.source = ref;
    touch.medium = "referral";
  }

  if (!Object.keys(touch).length) return null;

  if (ref) touch.ref = ref;
  touch.landing = window.location.pathname.slice(0, 120);
  touch.at = new Date().toISOString();
  return touch;
}

/**
 * Запомнить источник. Вызывается на каждой загрузке страницы.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;

  const touch = currentTouch();
  if (!touch) return;

  const saved = safeGet() || {};
  const next = { ...saved, last: touch };

  // Первый источник перезаписываем только если его нет или он просрочен.
  if (!saved.first || expired(saved.first.at)) next.first = touch;

  safeSet(next);
}

/**
 * Что отправить вместе с заявкой. Плоский объект — так его проще положить
 * в документ Sanity и вывести строкой в Телеграме.
 */
export function readAttribution() {
  if (typeof window === "undefined") return {};
  const saved = safeGet();
  if (!saved) return {};

  const f = saved.first || {};
  const l = saved.last || {};

  return {
    utmSource: f.source || "",
    utmMedium: f.medium || "",
    utmCampaign: f.campaign || "",
    utmContent: f.content || "",
    utmTerm: f.term || "",
    landing: f.landing || "",
    referrer: f.ref || "",
    firstSeenAt: f.at || "",
    lastSource: l.source && l.source !== f.source ? l.source : "",
  };
}

/**
 * Короткий код источника для живого человека: его видно в тексте сообщения
 * в WhatsApp, и координатор понимает, откуда пришёл обратившийся.
 * Возвращает пустую строку, если источник неизвестен.
 */
export function attributionCode() {
  const a = readAttribution();
  if (!a.utmSource) return "";
  return a.utmCampaign ? `${a.utmSource}/${a.utmCampaign}` : a.utmSource;
}

/**
 * Дописывает код источника в заготовку сообщения WhatsApp.
 *
 * Без этого обращения через мессенджер остаются неучтёнными, а на первом
 * экране кнопка WhatsApp стоит рядом с кнопкой заявки — туда уходит
 * заметная часть людей.
 */
export function withWhatsAppSource(href, greeting = "Здравствуйте!") {
  if (typeof window === "undefined" || !href) return href;
  const code = attributionCode();
  if (!code) return href;

  try {
    const url = new URL(href);
    const text = `${greeting} [${code}]`;
    url.searchParams.set("text", text);
    return url.toString();
  } catch {
    return href;
  }
}
