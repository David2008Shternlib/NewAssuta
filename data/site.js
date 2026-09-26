export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://assuta.org";

// Интеграции: чтобы ВКЛЮЧИТЬ — впиши значение, чтобы выключить — оставь "".
// Jivo: ID виджета из кода Jivo (например "awgE4pOVUu"). Метрика: номер счётчика (например 39297525).
export const integrations = {
  jivoId: "", // JivoChat: вставь виджет-ID — чат включится, наш демо-виджет спрячется
  yandexMetrikaId: "", // Яндекс.Метрика: вставь номер счётчика — метрика включится
};

/* ─────────────────────────────────────────────────────────────────────
 ОПЕРАТОР САЙТА.
 Ключевое требование аудита: сайт обязан называть того, кто за ним стоит.
 Мы — компания-организатор лечения, а НЕ больница. Всё, что ниже,
 выводится в подвале, на странице «О компании» и в разметке Organization.

 ДАННЫЕ ВЗЯТЫ ИЗ АУДИТА (реестр компаний Израиля) И ТРЕБУЮТ
 ПИСЬМЕННОГО ПОДТВЕРЖДЕНИЯ КЛИЕНТА ПЕРЕД ЗАПУСКОМ.
 Пустое значение — блок просто не выводится, ничего не ломается.
 ───────────────────────────────────────────────────────────────────── */
export const operator = {
  legalName: "MONADA MEDICAL GROUP LTD",
  displayName: { ru: "Monada Medical Center", en: "Monada Medical Center" },
  registryNumber: "516117348", // номер в реестре компаний Израиля
  registeredSince: "2019-12-10",
  // Адрес ОФИСА ОПЕРАТОРА (не больницы). Ждём от клиента.
  office: { ru: "", en: "" },
  email: "", // ждём от клиента
  // Запись в реестре агентов медицинского туризма Минздрава Израиля
  license: { number: "", url: "" },
  // Членство в отраслевых ассоциациях (в аудите упомянута IMTA)
  memberships: ["IMTA"],
  // Главная формулировка доверия — выводится в подвале каждой страницы
  role: {
    ru: "Официальный представитель клиники Assuta. Мы организуем лечение и сопровождение пациентов и не являемся больницей.",
    en: "Official representative of Assuta clinic. We organise treatment and patient support; we are not a hospital.",
  },
};

// Билингвальные данные (RU/EN), собранные с assuta.org, для превью.
export const site = {
  name: "Assuta",
  founded: 1935,
  address: {
    ru: "Израиль, Тель-Авив, Рамат-ха-Хаяль, ул. ха-Барзель, 11",
    en: "Israel, Tel Aviv, Ramat HaHayal, HaBarzel St. 11",
  },
  mapUrl: "https://maps.google.com/?q=Assuta+HaBarzel+11+Tel+Aviv",
  // Картинки лежат в public/images — не тянем их со старого сайта,
  // иначе всё отвалится в день переключения домена.
  logo: "/images/assuta-logo.png",
  heroBg: "/images/hero-bg.webp",
  phones: [
    { label: { ru: "Израиль", en: "Israel" }, value: "+972 74-702-0202", href: "tel:+972747020202", code: "IL" },
    { label: { ru: "Россия (бесплатно)", en: "Russia (toll-free)" }, value: "8 800-302-49-06", href: "tel:88003024906", code: "RU" },
    { label: { ru: "Украина", en: "Ukraine" }, value: "0 800-357-14", href: "tel:080035714", code: "UA" },
  ],
  messengers: [
    { label: "WhatsApp", value: "+972 53-425-3652", href: "https://api.whatsapp.com/send/?phone=972534253652" },
    { label: "Telegram", value: "@belenkaya_yana", href: "https://t.me/belenkaya_yana" },
    { label: "Viber", value: "+972 53-425-3652", href: "viber://chat?number=972534253652" },
  ],
};

// Возраст клиники считается от года основания, а не вписан числом:
// на оригинальном сайте стоит 88 лет — значение, зашитое ещё в 2023 году
// и с тех пор не обновлявшееся. Здесь оно всегда актуально.
export const clinicAge = new Date().getFullYear() - site.founded;

// «91 год», «92 года», «95 лет» — русский требует согласования
function yearsWord(n) {
  const d = n % 10;
  const h = n % 100;
  if (d === 1 && h !== 11) return "год";
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return "года";
  return "лет";
}

export const stats = [
  {
    num: "13%",
    label: { ru: "Всех операций в Израиле проводятся в Ассута", en: "All operations in Israel are conducted in Assuta" },
    href: "/about",
    btn: "aboutClinic",
  },
  { num: "500+", label: { ru: "Видов операций", en: "Types of operations" }, href: "/diagnostics", btn: "diagnosticsBtn" },
  {
    num: String(clinicAge),
    unit: { ru: yearsWord(clinicAge), en: clinicAge === 1 ? "year" : "years" },
    label: {
      ru: `Клиника Ассута основана в ${site.founded} году`,
      en: `Clinic Assuta was founded in ${site.founded}`,
    },
    href: "/about",
    btn: "aboutClinic",
  },
  {
    num: "92000+",
    label: { ru: "Столько операций врачи выполняют ежегодно", en: "That's how many surgeries doctors perform every year" },
    href: "/diagnostics",
    btn: "diagnosticsBtn",
  },
];

export const offers = [
  {
    title: { ru: "Врачи клиники Ассута", en: "Assuta clinic doctors" },
    desc: {
      ru: "Высококвалифицированные специалисты с внушительным опытом клинической практики. Надёжность и качество услуг гарантированы.",
      en: "Highly qualified specialists with vast clinical experience. Reliability and quality of care are guaranteed.",
    },
    img: "/images/offer-1.webp",
    href: "/doctors",
  },
  {
    title: { ru: "Современные технологии", en: "Modern technologies" },
    desc: {
      ru: "Постоянное внедрение новейших разработок, доказавших высокую эффективность в международных клинических исследованиях.",
      en: "Continuous adoption of the latest developments proven effective in international clinical studies.",
    },
    img: "/images/offer-2.webp",
    href: "/diagnostics",
  },
  {
    title: { ru: "Выбор врача", en: "Choice of doctor" },
    desc: {
      ru: "Возможность самостоятельно выбрать лечащего специалиста среди лучших экспертов клиники.",
      en: "The option to choose your treating specialist among the clinic's best experts.",
    },
    img: "/images/offer-3.webp",
    href: "/doctors",
  },
];

export const nav = [
  { label: { ru: "Врачи", en: "Doctors" }, href: "/doctors" },
  { label: { ru: "Направления", en: "Areas" }, href: "/departments" },
  { label: { ru: "Диагностика", en: "Diagnostics" }, href: "/diagnostics" },
  { label: { ru: "Заболевания", en: "Conditions" }, href: "/diseases" },
  { label: { ru: "Цены", en: "Prices" }, href: "/prices" },
  { label: { ru: "Отзывы", en: "Reviews" }, href: "/reviews" },
  { label: { ru: "Новости", en: "News" }, href: "/news" },
  { label: { ru: "Контакты", en: "Contacts" }, href: "/contacts" },
  { label: { ru: "Поиск", en: "Search" }, href: "/search" },
];

export const departments = [
  {
    icon: "oncology",
    slug: "oncology",
    docDepts: ["Онкологи"],
    disCats: ["Онкология"],
    title: { ru: "Онкология", en: "Oncology" },
    desc: { ru: "Диагностика и лечение всех видов рака по современным протоколам.", en: "Diagnosis and treatment of all cancers by modern protocols." },
  },
  {
    icon: "cardiology",
    slug: "cardiology",
    docDepts: ["Кардиологи"],
    disCats: ["Кардиология"],
    title: { ru: "Кардиология", en: "Cardiology" },
    desc: { ru: "Полный спектр кардиохирургии и интервенционного лечения сердца.", en: "Full range of cardiac surgery and interventional heart care." },
  },
  {
    icon: "orthopedic",
    slug: "orthopedic",
    docDepts: ["Ортопеды"],
    disCats: ["Ортопедия"],
    title: { ru: "Ортопедия", en: "Orthopedics" },
    desc: { ru: "Эндопротезирование суставов и лечение позвоночника.", en: "Joint replacement and spine treatment." },
  },
  {
    icon: "neurosurgery",
    slug: "neurosurgery",
    docDepts: ["Нейрохирурги", "Неврологи"],
    disCats: ["Нейрохирургия", "Неврология"],
    title: { ru: "Нейрохирургия", en: "Neurosurgery" },
    desc: { ru: "Операции на головном и спинном мозге любой сложности.", en: "Brain and spinal surgery of any complexity." },
  },
  {
    icon: "urology",
    slug: "urology",
    docDepts: ["Урологи", "Урогинекологи"],
    disCats: ["Урология"],
    title: { ru: "Урология", en: "Urology" },
    desc: { ru: "Диагностика и лечение заболеваний мочеполовой системы.", en: "Diagnosis and treatment of the urogenital system." },
  },
  {
    icon: "gynecologists",
    slug: "gynecologists",
    docDepts: ["Гинекологи", "Акушеры", "Специалисты ЭКО"],
    disCats: ["Гинекология", "ЭКО"],
    title: { ru: "Гинекология", en: "Gynecology" },
    desc: { ru: "Женское здоровье, репродукция, онкогинекология.", en: "Women's health, reproduction, gynecologic oncology." },
  },
  {
    icon: "gastroenterology",
    slug: "gastroenterology",
    docDepts: ["Гастроэнтерологи"],
    disCats: ["Гастроэнторология"],
    title: { ru: "Гастроэнтерология", en: "Gastroenterology" },
    desc: { ru: "Заболевания ЖКТ, эндоскопия, малоинвазивная хирургия.", en: "GI disorders, endoscopy, minimally invasive surgery." },
  },
  {
    icon: "plastic-surgery",
    slug: "plastic-surgery",
    docDepts: ["Пластические хирурги"],
    disCats: ["Пластическая хирургия"],
    title: { ru: "Пластическая хирургия", en: "Plastic surgery" },
    desc: { ru: "Эстетическая и реконструктивная хирургия.", en: "Aesthetic and reconstructive surgery." },
  },
  {
    icon: "ophthalmolog",
    slug: "ophthalmolog",
    docDepts: ["Офтальмологи"],
    disCats: ["Офтальмология"],
    title: { ru: "Офтальмология", en: "Ophthalmology" },
    desc: { ru: "Микрохирургия глаза, катаракта, лечение сетчатки.", en: "Eye microsurgery, cataract, retinal care." },
  },
  {
    icon: "endocrinologists",
    slug: "endocrinologists",
    docDepts: ["Эндокринологи"],
    disCats: ["Эндокринология"],
    title: { ru: "Эндокринология", en: "Endocrinology" },
    desc: { ru: "Диабет, щитовидная железа, гормональные нарушения.", en: "Diabetes, thyroid, hormonal disorders." },
  },
  {
    icon: "ent-doctors",
    slug: "ent-doctors",
    docDepts: ["ЛОР-специалисты"],
    disCats: ["ЛОР"],
    title: { ru: "ЛОР", en: "ENT" },
    desc: { ru: "Диагностика и хирургия уха, горла и носа.", en: "Diagnosis and surgery of ear, nose and throat." },
  },
  {
    icon: "hematology",
    slug: "hematology",
    docDepts: ["Гематологи"],
    disCats: ["Гематология"],
    title: { ru: "Гематология", en: "Hematology" },
    desc: { ru: "Лечение заболеваний крови и лимфатической системы.", en: "Treatment of blood and lymphatic diseases." },
  },
];

// Старые статические списки врачей/заболеваний/отзывов/новостей удалены:
// всё это теперь приходит из CMS (Sanity). Они же тянули картинки со старого сайта.

export const deptNames = Object.fromEntries(departments.map((d) => [d.slug, d.title]));

// Названия отделений и категорий в CMS («Онкологи», «Кардиология») работают
// ключами: по ним сайт собирает врачей и статьи в разделы. Поэтому в базе они
// не переводятся, а подпись для английской версии берётся отсюда.
// На русской версии значение остаётся ровно таким, как его ввели в CMS.
const cmsLabelsEn = {};
for (const d of departments) {
  for (const n of d.docDepts || []) cmsLabelsEn[n] = d.title.en;
  for (const c of d.disCats || []) cmsLabelsEn[c] = d.title.en;
}

// В CMS есть специальности и категории, для которых нет отдельного раздела на
// сайте: они никуда не группируются, но стоят подписью в карточке врача и в
// статье. Без них на английской версии оставалась русская подпись —
// «Дерматологи» под именем Prof. Eli Sprecher и так далее.
const extraLabelsEn = {
  // специальности врачей
  "Дерматологи": "Dermatology",
  "Иммунологи": "Immunology",
  "Нефрологи": "Nephrology",
  "Радиологи": "Radiology",
  "Ревматологи": "Rheumatology",
  "Хирурги": "Surgery",
  "Торакальные хирурги": "Thoracic surgery",
  // категории заболеваний
  "Дерматология": "Dermatology",
  "Ревматология": "Rheumatology",
  "Общая хирургия": "General surgery",
  "Сосудистая хирургия": "Vascular surgery",
};
for (const [ru, en] of Object.entries(extraLabelsEn)) {
  if (!cmsLabelsEn[ru]) cmsLabelsEn[ru] = en;
}

export function cmsLabel(value, lang) {
  if (lang !== "en") return value || "";
  return cmsLabelsEn[value] || value || "";
}
