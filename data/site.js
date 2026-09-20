export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://assuta.org";

// Интеграции: чтобы ВКЛЮЧИТЬ — впиши значение, чтобы выключить — оставь "".
// Jivo: ID виджета из кода Jivo (например "awgE4pOVUu"). Метрика: номер счётчика (например 39297525).
export const integrations = {
  jivoId: "",            // JivoChat: вставь виджет-ID — чат включится, наш демо-виджет спрячется
  yandexMetrikaId: "",   // Яндекс.Метрика: вставь номер счётчика — метрика включится
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
    { label: { ru: "Израиль", en: "Israel" }, value: "+972 74-702-0202", href: "tel:+972747020202", flag: "🇮🇱" },
    { label: { ru: "Россия (бесплатно)", en: "Russia (toll-free)" }, value: "8 800-302-49-06", href: "tel:88003024906", flag: "🇷🇺" },
    { label: { ru: "Украина", en: "Ukraine" }, value: "0 800-357-14", href: "tel:080035714", flag: "🇺🇦" },
  ],
  messengers: [
    { label: "WhatsApp", value: "+972 53-425-3652", href: "https://api.whatsapp.com/send/?phone=972534253652" },
    { label: "Telegram", value: "@belenkaya_yana", href: "https://t.me/belenkaya_yana" },
    { label: "Viber", value: "+972 53-425-3652", href: "viber://chat?number=972534253652" },
  ],
};

export const stats = [
  { num: "13%", label: { ru: "Всех операций в Израиле проводятся в Ассута", en: "All operations in Israel are conducted in Assuta" }, href: "/about", btn: "aboutClinic" },
  { num: "500+", label: { ru: "Видов операций", en: "Types of operations" }, href: "/diagnostics", btn: "diagnosticsBtn" },
  { num: "88", unit: { ru: "лет", en: "years" }, label: { ru: "Клиника Ассута основана в 1935 году", en: "Clinic Assuta was founded in 1935" }, href: "/about", btn: "aboutClinic" },
  { num: "92000+", label: { ru: "Столько операций врачи выполняют ежегодно", en: "That's how many surgeries doctors perform every year" }, href: "/diagnostics", btn: "diagnosticsBtn" },
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
];

export const departments = [
  { icon: "🎗️", slug: "oncology", title: { ru: "Онкология", en: "Oncology" }, desc: { ru: "Диагностика и лечение всех видов рака по современным протоколам.", en: "Diagnosis and treatment of all cancers by modern protocols." } },
  { icon: "🫀", slug: "cardiology", title: { ru: "Кардиология", en: "Cardiology" }, desc: { ru: "Полный спектр кардиохирургии и интервенционного лечения сердца.", en: "Full range of cardiac surgery and interventional heart care." } },
  { icon: "🦴", slug: "orthopedic", title: { ru: "Ортопедия", en: "Orthopedics" }, desc: { ru: "Эндопротезирование суставов и лечение позвоночника.", en: "Joint replacement and spine treatment." } },
  { icon: "🧠", slug: "neurosurgery", title: { ru: "Нейрохирургия", en: "Neurosurgery" }, desc: { ru: "Операции на головном и спинном мозге любой сложности.", en: "Brain and spinal surgery of any complexity." } },
  { icon: "🔬", slug: "urology", title: { ru: "Урология", en: "Urology" }, desc: { ru: "Диагностика и лечение заболеваний мочеполовой системы.", en: "Diagnosis and treatment of the urogenital system." } },
  { icon: "👶", slug: "gynecologists", title: { ru: "Гинекология", en: "Gynecology" }, desc: { ru: "Женское здоровье, репродукция, онкогинекология.", en: "Women's health, reproduction, gynecologic oncology." } },
  { icon: "🩺", slug: "gastroenterology", title: { ru: "Гастроэнтерология", en: "Gastroenterology" }, desc: { ru: "Заболевания ЖКТ, эндоскопия, малоинвазивная хирургия.", en: "GI disorders, endoscopy, minimally invasive surgery." } },
  { icon: "✨", slug: "plastic-surgery", title: { ru: "Пластическая хирургия", en: "Plastic surgery" }, desc: { ru: "Эстетическая и реконструктивная хирургия.", en: "Aesthetic and reconstructive surgery." } },
  { icon: "👁️", slug: "ophthalmolog", title: { ru: "Офтальмология", en: "Ophthalmology" }, desc: { ru: "Микрохирургия глаза, катаракта, лечение сетчатки.", en: "Eye microsurgery, cataract, retinal care." } },
  { icon: "🧬", slug: "endocrinologists", title: { ru: "Эндокринология", en: "Endocrinology" }, desc: { ru: "Диабет, щитовидная железа, гормональные нарушения.", en: "Diabetes, thyroid, hormonal disorders." } },
  { icon: "👂", slug: "ent-doctors", title: { ru: "ЛОР", en: "ENT" }, desc: { ru: "Диагностика и хирургия уха, горла и носа.", en: "Diagnosis and surgery of ear, nose and throat." } },
  { icon: "🩸", slug: "hematology", title: { ru: "Гематология", en: "Hematology" }, desc: { ru: "Лечение заболеваний крови и лимфатической системы.", en: "Treatment of blood and lymphatic diseases." } },
];

// Старые статические списки врачей/заболеваний/отзывов/новостей удалены:
// всё это теперь приходит из CMS (Sanity). Они же тянули картинки со старого сайта.

export const deptNames = Object.fromEntries(departments.map((d) => [d.slug, d.title]));
