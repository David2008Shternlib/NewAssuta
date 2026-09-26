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

// Разделы повторяют /departments/ старого сайта: тот же состав, тот же порядок.
// Состав задан списками адресов, а не полем в базе, по двум причинам.
// Во-первых, на старом сайте врач и статья могли стоять сразу в нескольких
// разделах (Цви Рам — онкология, хирургия и нейрохирургия; меланома —
// онкология и дерматология), а в базе специальность и категория по одной.
// Во-вторых, поле «специальность» в базе взято из текста карточки врача и во
// многих местах не совпадает с тем, где врач стоял у них.
// Списки снимались прямо со старого сайта, менять их вручную не нужно.
export const departments = [
  {
    slug: "oncology",
    title: { ru: "Онкология", en: "Oncology" },
    desc: { ru: "Диагностика и лечение всех видов рака по современным протоколам.", en: "Diagnosis and treatment of all cancers by modern protocols." },
    docSlugs: [
      "dan-grisar", "irina-stefanski", "irina-zhivelyuk", "zoar-dotan", "avi-hefecz",
      "doktor-yuliya-grinberg", "ofer-merimskij", "professor-yakov-shehter", "professor-dan-aderka",
      "professor-haim-gutman", "czvi-ram", "nissan-aviram", "professor-shlomo-shnejbaum", "yakov-bikels",
      "svetlana-zalmanova", "ella-tepper", "doktor-ram-ejtan", "feliks-bokshtejn", "professor-dzhek-baniel",
      "professor-moshe-pappa", "doktor-sharon-peles", "doktor-david-sarid", "professor-mihael-shapira"
    ],
    disSlugs: [
      "rak-slyunnyh-zhelez-2", "bazilioma-2", "rak-guby-2", "rak-uretry-2", "rak-shhitovidnoj-zhelezy",
      "rak-yazyka-2", "detskaya-onkologiya", "nejroblastoma", "rak-grudi", "rak-dvenadczatiperstnoj-kishki",
      "rak-zheludka", "rak-zhelchnogo-puzyrya", "rak-legkih", "rak-matki", "rak-mochevogo-puzyrya",
      "rak-nadpochechnikov", "rak-pecheni", "rak-podzheludochnoj-zhelezy", "rak-pochki", "rak-prostaty",
      "rak-pryamoj-kishki", "rak-tolstogo-kishechnika", "rak-tonkogo-kishechnika", "rak-shejki-matki",
      "rak-yaichka", "rak-yaichnikov", "raka-kostej", "rak-pozvonochnika", "lejkoma", "lejkoz", "mieloma",
      "limfoma-hodzhkina", "nehodzhkinskaya-limfoma", "onko-ortopediya", "melanoma", "osteosarkoma",
      "mezotelioma-bryushiny-ili-peritonealnaya-mezotelioma", "ploskokletochnyj-rak", "rak-vlagalishha",
      "rak-kostej", "rak-mozga", "rak-polosti-rta", "rak-polovogo-chlena", "rak-timusa",
      "sinovialnaya-sarkoma", "nejroendokrinnyj-rak", "rak-pishhevoda", "rak-glazniczy",
      "glioma-hiazmy-diagnostika-i-lechenie-v-izraile", "melanoma-glaza", "rak-sleznoj-zhelezy",
      "retinoblastoma"
    ],
  },
  {
    slug: "cardiology",
    title: { ru: "Кардиология", en: "Cardiology" },
    desc: { ru: "Полный спектр кардиохирургии и интервенционного лечения сердца.", en: "Full range of cardiac surgery and interventional heart care." },
    docSlugs: [
      "professor-ehud-raanani", "leonid-sternik", "doktor-amir-kramer", "professor-shmuel-rat",
      "mihael-shehter", "doktor-german-gandelman", "gadi-keren", "shmuel-banaj", "david-lure",
      "professor-mihael-eldar", "sami-viskin", "lev-mendelevich"
    ],
    disSlugs: [
      "ablyacziya-serdcza", "aortokoronarnoe-shuntirovanie", "aritmiya", "ateroskleroz", "blokady-serdcza",
      "gipertenziya", "gipertoniya", "zamena-serdechnogo-klapana", "insult", "infarkt-miokarda",
      "ishemicheskaya-bolezn-serdcza", "kardiostimulyatory-i-koronarnaya-angiografiya", "poroki-serdcza",
      "senokardiya", "stentirovanie", "tromboz", "endokardit"
    ],
  },
  {
    slug: "gastroenterology",
    title: { ru: "Гастроэнтерология", en: "Gastroenterology" },
    desc: { ru: "Заболевания ЖКТ, эндоскопия, малоинвазивная хирургия.", en: "GI disorders, endoscopy, minimally invasive surgery." },
    docSlugs: [
      "doktor-maor-laav", "santo-ervin", "tamar-shalev"
    ],
    disSlugs: [
      "gastrit", "chernovik", "gastroezofagealnaya-reflyuksnaya-bolezn-gerb", "gemorroj",
      "gryzha-pishhevodnogo-otverstiya-diafragmy", "divertikul-pishhevoda",
      "nespeczificheskij-yazvennyj-kolit-nyak", "pankreatit", "pahovaya-gryzha", "barretts-esophagus",
      "pupochnaya-i-drugie-abdominalnye-gryzhi", "czeliakiya", "yazva-zheludka"
    ],
  },
  {
    slug: "gynecologists",
    title: { ru: "Гинекология", en: "Gynecology" },
    desc: { ru: "Женское здоровье, репродукция, онкогинекология.", en: "Women's health, reproduction, gynecologic oncology." },
    docSlugs: [
      "dan-grisar", "doktor-ram-ejtan", "doktor-anna-bleher", "dov-laksman", "ron-hauzer",
      "professor-yuval-yaron", "avi-ben-harush", "ronen-gold", "anna-padua"
    ],
    disSlugs: [
      "rak-matki", "rak-shejki-matki", "rak-yaichnikov", "endometrioz", "rak-vlagalishha", "adenomioz",
      "akusherstvo-rody", "zhenskoe-besplodie", "kisty-yaichnikov", "mioma-matki"
    ],
  },
  {
    slug: "urology",
    title: { ru: "Урология", en: "Urology" },
    desc: { ru: "Диагностика и лечение заболеваний мочеполовой системы.", en: "Diagnosis and treatment of the urogenital system." },
    docSlugs: [
      "zoar-dotan", "professor-dzhek-baniel", "professor-ofer-yusipovich", "uri-gur", "eli-tavdi",
      "professor-haim-maczkin", "professor-yuza-hen", "ilan-lejbovich", "doktor-gil-raviv",
      "professor-nikola-mabdzhish"
    ],
    disSlugs: [
      "adenoma-prostaty", "azoospermiya-2", "varikoczele-2", "gidronefroz", "gipospadiya", "impotencziya",
      "mochekamennaya-bolezn", "muzhskoe-besplodie-mkb", "prostatit", "rak-prostaty", "rak-yaichka",
      "rak-polovogo-chlena"
    ],
  },
  {
    slug: "general-surgery",
    title: { ru: "Общая хирургия", en: "General surgery" },
    desc: { ru: "Плановые и срочные операции, включая малоинвазивные и торакальные.", en: "Planned and urgent operations, including minimally invasive and thoracic surgery." },
    docSlugs: [
      "zoar-dotan", "avi-hefecz", "professor-haim-gutman", "czvi-ram", "nissan-aviram",
      "professor-shlomo-shnejbaum", "yakov-bikels", "doktor-ram-ejtan", "professor-moshe-pappa",
      "doktor-riad-hadad", "yurij-goldes", "doktor-marat-hajkin-2", "david-morgenshtern", "ron-arbel",
      "konstantin-galperin", "ilya-pekarskij", "ron-grinberg", "yair-gorchak", "professor-iosif-klauzner",
      "doktor-dov-zippel", "doktor-anna-bleher", "professor-davidovich-shlomo", "professor-hanoh-kashtan",
      "professor-ofer-yusipovich"
    ],
    disSlugs: [
      "lechenie-bolej-v-spine", "zamena-tazobedrennogo-sustava", "artrit", "zamena-golenostopnogo-sustava",
      "artroz", "valgusnaya-deformacziya-bolshogo-palcza-stopy", "lechenie-meniska",
      "lechenie-pozvonochnika", "zamena-loktevogo-sustava", "zamena-plechevogo-sustava", "pupochnaya-gryzha"
    ],
  },
  {
    slug: "neurosurgery",
    title: { ru: "Нейрохирургия", en: "Neurosurgery" },
    desc: { ru: "Операции на головном и спинном мозге любой сложности.", en: "Brain and spinal surgery of any complexity." },
    docSlugs: [
      "czvi-ram", "feliks-bokshtejn", "dvora-blyumental", "rahel-grosman", "shimon-rohkind",
      "doktor-eli-ashkenazi"
    ],
    disSlugs: [
      "adenoma-gipofiza", "astroczitoma", "glioblastoma", "glioma-zritelnogo-nerva", "medulloblastoma",
      "menengioma", "rak-mozga"
    ],
  },
  {
    slug: "plastic-surgery",
    title: { ru: "Пластическая хирургия", en: "Plastic surgery" },
    desc: { ru: "Эстетическая и реконструктивная хирургия.", en: "Aesthetic and reconstructive surgery." },
    docSlugs: [
      "ram-silfan", "eyal-vinkler", "din-adel", "david-raderman", "doktor-yakov-bar", "doktor-ran-talisman",
      "professor-eyal-gur", "doktor-amir-aaron", "doktor-meir-koen", "doktor-liron-eldor"
    ],
    disSlugs: [
      "blefaroplastika", "fejslifting-omolozhenie-licza"
    ],
  },
  {
    slug: "vascular-surgery",
    title: { ru: "Сосудистая хирургия", en: "Vascular surgery" },
    desc: { ru: "Лечение варикоза и других заболеваний вен и артерий.", en: "Treatment of varicose veins and other conditions of the veins and arteries." },
    docSlugs: [],
    disSlugs: [
      "varikoz-nizhnih-konechnostej"
    ],
  },
  {
    slug: "hematology",
    title: { ru: "Гематология", en: "Hematology" },
    desc: { ru: "Лечение заболеваний крови и лимфатической системы.", en: "Treatment of blood and lymphatic diseases." },
    docSlugs: [],
    disSlugs: [
      "lejkoma", "lejkoz", "mieloma", "limfoma-hodzhkina", "nehodzhkinskaya-limfoma"
    ],
  },
  {
    slug: "neurology",
    title: { ru: "Неврология", en: "Neurology" },
    desc: { ru: "Рассеянный склероз, болезнь Паркинсона, невралгии и другие заболевания нервной системы.", en: "Multiple sclerosis, Parkinson's disease, neuralgia and other conditions of the nervous system." },
    docSlugs: [
      "veronika-chernuha", "nir-giladi", "vivyan-drori", "tatyana-gurevich", "gabriel-zeilig",
      "boris-aranovich"
    ],
    disSlugs: [
      "bokovoj-amiotroficheskij-skleroz", "bolezn-parkinsona", "nevralgiya", "rasseyannyj-skleroz",
      "sindrom-deficzita-vnimaniya-i-giperaktivnosti-sdvg"
    ],
  },
  {
    slug: "orthopedic",
    title: { ru: "Ортопедия", en: "Orthopedics" },
    desc: { ru: "Эндопротезирование суставов и лечение позвоночника.", en: "Joint replacement and spine treatment." },
    docSlugs: [
      "yakov-bikels", "david-morgenshtern", "ron-arbel", "konstantin-galperin", "ilya-pekarskij",
      "yair-gorchak", "professor-davidovich-shlomo", "czvi-koen", "aaron-menahem", "aleks-kalganov",
      "gaj-morag", "gabriel-mozes", "igor-kazanskij", "shmuel-dekel-4", "yaron-ram",
      "professor-ieguda-kolander"
    ],
    disSlugs: [
      "lechenie-bolej-v-spine", "vakuumnoe-udalenie-diska", "vertebroplastika", "skolioz-i-kifoz",
      "endoprotezirovanie-kolennogo-sustava", "zamena-tazobedrennogo-sustava",
      "individualnoe-programmirovanie-sustava", "mezhpozvonochnaya-gryzha", "artrit",
      "zamena-golenostopnogo-sustava", "artroz", "valgusnaya-deformacziya-bolshogo-palcza-stopy",
      "lechenie-meniska", "lechenie-pozvonochnika", "onko-ortopediya", "zamena-loktevogo-sustava",
      "zamena-plechevogo-sustava"
    ],
  },
  {
    slug: "endocrinologists",
    title: { ru: "Эндокринология", en: "Endocrinology" },
    desc: { ru: "Диабет, щитовидная железа, гормональные нарушения.", en: "Diabetes, thyroid, hormonal disorders." },
    docSlugs: [
      "evgenij-moshkovich", "galina-shenkerman", "shmuel-levit", "doktor-elena-iczhakovendokrinolog",
      "professor-luis-shenkman", "doktor-asaf-oren", "professor-hohberg-zeev", "doktor-irena-zhitomirski",
      "doktor-karlos-ben-bassat", "doktor-naomi-vajntrub", "professor-ilana-iczhakov",
      "professor-naftali-shtern"
    ],
    disSlugs: [
      "autoimmunnyj-tireoidit", "zob", "nesaharnyj-diabet", "ozhirenie", "saharnyj-diabet-2-tipa",
      "saharnyj-diabet-1-tipa",
      "sistema-nepreryvnogo-monitoringa-glyukozy-continuous-glucose-monitoring-cgm"
    ],
  },
  {
    slug: "dermatology",
    title: { ru: "Дерматология", en: "Dermatology" },
    desc: { ru: "Диагностика и лечение заболеваний кожи, включая онкодерматологию.", en: "Diagnosis and treatment of skin conditions, including skin cancer." },
    docSlugs: [
      "ronen-alkalaj", "doktor-baruh-kaplan", "professor-eli-shpreher"
    ],
    disSlugs: [
      "bazilioma-2", "melanoma", "gemangioma"
    ],
  },
  {
    slug: "ophthalmolog",
    title: { ru: "Офтальмология", en: "Ophthalmology" },
    desc: { ru: "Микрохирургия глаза, катаракта, лечение сетчатки.", en: "Eye microsurgery, cataract, retinal care." },
    docSlugs: [
      "roni-rahmiel", "shpirer-avraam", "dov-vajnberger", "or-kajzerman-2", "professor-igal-lejbovich"
    ],
    disSlugs: [
      "atrofiya-zritelnogo-nerva", "glaukoma", "katarakta", "kosoglazie", "rak-glazniczy", "blefarospazm",
      "lagoftalm", "glioma-hiazmy-diagnostika-i-lechenie-v-izraile", "melanoma-glaza", "rak-sleznoj-zhelezy",
      "retinoblastoma"
    ],
  },
  {
    slug: "rheumatology",
    title: { ru: "Ревматология", en: "Rheumatology" },
    desc: { ru: "Аутоиммунные и воспалительные заболевания суставов и соединительной ткани.", en: "Autoimmune and inflammatory diseases of the joints and connective tissue." },
    docSlugs: [
      "professor-pnina-langevich", "marina-anuk", "professor-ilan-bank", "professor-dan-kaspi"
    ],
    disSlugs: [
      "revmatoidnyj-artrit", "sistemnaya-krasnaya-volchanka-skv", "bolezn-behtereva"
    ],
  },
  {
    slug: "ivf",
    title: { ru: "ЭКО", en: "IVF" },
    desc: { ru: "Программы ЭКО, ведение беременности и роды.", en: "IVF programmes, pregnancy care and childbirth." },
    docSlugs: [],
    disSlugs: [
      "akusherstvo-rody", "zhenskoe-besplodie"
    ],
  },
];

// Старые статические списки врачей/заболеваний/отзывов/новостей удалены:
// всё это теперь приходит из CMS (Sanity). Они же тянули картинки со старого сайта.

export const deptNames = Object.fromEntries(departments.map((d) => [d.slug, d.title]));

// Подписи специальностей и категорий для английской версии. Раньше они
// собирались из названий разделов, но разделы больше не привязаны к полям базы,
// поэтому словарь задан явно. Подпись описывает специальность самого врача:
// торакальный хирург так и подписан, хотя в разделах стоит в общей хирургии.
const cmsLabelsEn = {
  // специальности врачей
  "Онкологи": "Oncology",
  "Кардиологи": "Cardiology",
  "Ортопеды": "Orthopedics",
  "Нейрохирурги": "Neurosurgery",
  "Неврологи": "Neurology",
  "Урологи": "Urology",
  "Урогинекологи": "Urogynecology",
  "Гинекологи": "Gynecology",
  "Акушеры": "Obstetrics",
  "Специалисты ЭКО": "IVF",
  "Гастроэнтерологи": "Gastroenterology",
  "Пластические хирурги": "Plastic surgery",
  "Офтальмологи": "Ophthalmology",
  "Эндокринологи": "Endocrinology",
  "ЛОР-специалисты": "ENT",
  "Гематологи": "Hematology",
  "Хирурги": "Surgery",
  "Торакальные хирурги": "Thoracic surgery",
  "Дерматологи": "Dermatology",
  "Ревматологи": "Rheumatology",
  "Нефрологи": "Nephrology",
  "Радиологи": "Radiology",
  "Иммунологи": "Immunology",
  // категории заболеваний
  "Онкология": "Oncology",
  "Кардиология": "Cardiology",
  "Ортопедия": "Orthopedics",
  "Нейрохирургия": "Neurosurgery",
  "Неврология": "Neurology",
  "Урология": "Urology",
  "Гинекология": "Gynecology",
  "Гастроэнторология": "Gastroenterology",
  "Пластическая хирургия": "Plastic surgery",
  "Офтальмология": "Ophthalmology",
  "Эндокринология": "Endocrinology",
  "Дерматология": "Dermatology",
  "Ревматология": "Rheumatology",
  "Общая хирургия": "General surgery",
  "Сосудистая хирургия": "Vascular surgery",
  // Подпись для статей, у которых категория в базе не заполнена.
  "Другое": "Other",
};

export function cmsLabel(value, lang) {
  if (lang !== "en") return value || "";
  return cmsLabelsEn[value] || value || "";
}
