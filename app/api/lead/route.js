// Приём заявок с форм.
//
// Каналов доставки три, и они независимы:
//   1. Sanity — основной. Заявка ложится документом «Заявка с сайта» в тот же
//      редактор, где клиника правит тексты. Нужен SANITY_WRITE_TOKEN
//      (или SANITY_API_TOKEN) с правом записи;
//   2. Telegram — если заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID;
//   3. файл на диске — страховка, путь в LEADS_FILE (по умолчанию leads.log
//      в корне приложения).
//
// Почему так. Хостинг в России не может достучаться до api.telegram.org:
// соединение висит и отваливается по таймауту. Раньше это исключение вылетало
// из обработчика, посетитель ждал десять секунд и получал «не удалось
// отправить», а заявка пропадала. Теперь ни один канал не может уронить
// запрос: каждый ловит свои ошибки, а ответ «принято» отдаётся, только если
// заявку удалось где-то сохранить.

import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

export const dynamic = "force-dynamic";

// Сколько ждём Telegram, прежде чем махнуть рукой. Посетителю нельзя
// показывать крутилку на десять секунд из-за недоступного мессенджера.
const TELEGRAM_TIMEOUT_MS = 4000;

const NAME_MAX = 100;
const COMMENT_MAX = 500;
const PHONE_MAX = 20;

// Ограничение частоты: не больше 5 заявок с одного адреса за 10 минут.
// Память процесса — этого достаточно: приложение работает в одном контейнере.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const fresh = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  // подчищаем карту, чтобы она не росла бесконечно
  if (hits.size > 5000) hits.clear();
  if (fresh.length >= MAX_PER_WINDOW) {
    hits.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  hits.set(ip, fresh);
  return false;
}

function clientIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Обрезаем, убираем управляющие символы и экранируем разметку Telegram
function clean(value, max) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x1f]/g, " ")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

// Запись заявки в Sanity. Никогда не бросает исключений.
// Клиент создаётся на каждый запрос: токен читается из окружения, а самих
// заявок немного — экономить тут не на чем.
async function saveToSanity(fields) {
  const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
  if (!token) return false;

  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });
    await client.create({ _type: "lead", ...fields });
    return true;
  } catch (e) {
    console.error("[lead] Sanity не принял заявку:", e?.message || e);
    return false;
  }
}

// Отправка в Telegram. Никогда не бросает исключений: возвращает true/false.
async function sendToTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
      cache: "no-store",
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("[lead] Telegram ответил", res.status);
      return false;
    }
    return true;
  } catch (e) {
    // Самый частый случай — хостинг не пускает запрос к api.telegram.org
    console.error("[lead] Telegram недоступен:", e?.name || e);
    return false;
  }
}

// Запись на диск. Тоже никогда не бросает исключений.
// Это не архив, а страховка: пока не настроен надёжный канал, заявку можно
// достать из файла. Переживает перезапуск контейнера, но не переустановку.
async function saveToFile(text) {
  const file = process.env.LEADS_FILE || path.join(process.cwd(), "leads.log");
  try {
    await fs.appendFile(file, `\n${"=".repeat(60)}\n${text}\n`, "utf8");
    return true;
  } catch (e) {
    console.error("[lead] Не удалось записать заявку в файл:", e?.message || e);
    return false;
  }
}

export async function POST(req) {
  try {
    if (rateLimited(clientIp(req))) {
      return Response.json(
        { ok: false, error: "too_many" },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    // защита от гигантских тел запроса
    const raw = await req.text();
    if (raw.length > 8000) return Response.json({ ok: false, error: "too_large" }, { status: 413 });

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
    }

    // honeypot: скрытое поле заполнил бот — отвечаем как обычно, но ничего не шлём
    if (data && data.company) return Response.json({ ok: true });

    const name = clean(data?.name, NAME_MAX);
    const phoneRaw = clean(data?.phone, PHONE_MAX);
    const comment = clean(data?.comment, COMMENT_MAX);
    const country = clean(data?.country, 8);
    const source = clean(data?.source, 120);
    const heardFrom = clean(data?.heardFrom, 80);

    // Откуда пришёл человек. Собрано на стороне браузера при первом заходе
    // (lib/utm.js). Чистим каждое поле отдельно: это данные из адресной
    // строки, то есть пришедшие снаружи, и доверять им нельзя.
    const a = data?.attribution || {};
    const attribution = {
      utmSource: clean(a.utmSource, 64),
      utmMedium: clean(a.utmMedium, 64),
      utmCampaign: clean(a.utmCampaign, 64),
      utmContent: clean(a.utmContent, 64),
      utmTerm: clean(a.utmTerm, 64),
      landing: clean(a.landing, 120),
      referrer: clean(a.referrer, 120),
      firstSeenAt: clean(a.firstSeenAt, 40),
      lastSource: clean(a.lastSource, 64),
    };

    // Расшифровка источника для координатора.
    //
    // У клиента своя схема меток, и имя блогера лежит НЕ в utm_source, как
    // принято по умолчанию, а в utm_content. В utm_source — площадка (ig,
    // tg), в utm_medium — форма оплаты блогеру (fx значит фиксированная
    // ставка). Поэтому выводим каждую часть отдельной строкой с подписью,
    // а не склеиваем три поля через косую черту: при склейке имя блогера
    // в сообщение просто не попадало, и координатор видел «ig / fx» без
    // главного — кто именно привёл человека.
    //
    // Рядом с подписью оставлено техническое имя метки: схема именования
    // принадлежит клиенту и может поменяться, а так всегда видно, какое
    // поле за что отвечает, и не нужно лезть в код.
    const sourceRows = [
      ["Кто привёл (utm_content)", attribution.utmContent],
      ["Площадка (utm_source)", attribution.utmSource],
      ["Размещение (utm_medium)", attribution.utmMedium],
      ["Кампания (utm_campaign)", attribution.utmCampaign],
      ["Метка (utm_term)", attribution.utmTerm],
      ["Вернулся из", attribution.lastSource],
      ["Переход с", attribution.referrer],
      ["Первая страница", attribution.landing],
    ].filter(([, v]) => v);

    const sourceBlock = sourceRows.length
      ? sourceRows.map(([label, v]) => `${label}: ${v}`).join("\n")
      : "Источник: не определён";

    const digits = (phoneRaw.match(/\d/g) || []).length;
    if (!name || digits < 7) {
      return Response.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    // без согласия на обработку персональных данных заявку принимать нельзя
    if (data?.consent !== true) {
      return Response.json({ ok: false, error: "no_consent" }, { status: 400 });
    }

    const text =
      `Новая заявка с сайта Assuta\n\n` +
      `Имя: ${name}\n` +
      `Телефон: ${phoneRaw}\n` +
      `Страна: ${country || "-"}\n` +
      `Комментарий: ${comment || "-"}\n` +
      `Страница: ${source || "-"}\n\n` +
      `${sourceBlock}\n` +
      (heardFrom ? `Со слов пациента: ${heardFrom}\n` : "") +
      `Согласие на обработку данных: да, ${new Date().toISOString()}`;

    const now = new Date().toISOString();

    // Каналы независимы: пробуем все, падение одного не мешает другим.
    const [viaSanity, viaTelegram, viaFile] = await Promise.all([
      saveToSanity({
        name,
        phone: phoneRaw,
        country: country || undefined,
        comment: comment || undefined,
        source: source || undefined,
        heardFrom: heardFrom || undefined,
        ...Object.fromEntries(Object.entries(attribution).filter(([, v]) => v)),
        consentAt: now,
        createdAt: now,
        status: "new",
      }),
      sendToTelegram(text),
      saveToFile(text),
    ]);

    // В лог пишем всегда — это последний рубеж, если недоступно всё.
    console.log(`[lead] sanity=${viaSanity} telegram=${viaTelegram} файл=${viaFile}\n${text}`);

    // «Спасибо» показываем, только если заявка где-то осела. Иначе честная
    // ошибка: пусть человек позвонит, а не думает, что с ним свяжутся.
    if (!viaSanity && !viaTelegram && !viaFile) {
      return Response.json({ ok: false, error: "not_delivered" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[lead] Ошибка обработки заявки:", e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
