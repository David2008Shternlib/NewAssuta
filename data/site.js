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
  logo: "https://assuta.org/wp-content/themes/assutaisrael/assets/images/assuta-logo.png",
  heroBg: "https://assuta.org/wp-content/uploads/2023/08/slider_bg.webp",
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
    img: "https://assuta.org/wp-content/uploads/2023/08/we_offer-1.webp",
    href: "/doctors",
  },
  {
    title: { ru: "Современные технологии", en: "Modern technologies" },
    desc: {
      ru: "Постоянное внедрение новейших разработок, доказавших высокую эффективность в международных клинических исследованиях.",
      en: "Continuous adoption of the latest developments proven effective in international clinical studies.",
    },
    img: "https://assuta.org/wp-content/uploads/2023/08/we_offer2-1.webp",
    href: "/diagnostics",
  },
  {
    title: { ru: "Выбор врача", en: "Choice of doctor" },
    desc: {
      ru: "Возможность самостоятельно выбрать лечащего специалиста среди лучших экспертов клиники.",
      en: "The option to choose your treating specialist among the clinic's best experts.",
    },
    img: "https://assuta.org/wp-content/uploads/2023/08/we_offer3.webp",
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

export const diseasesByCategory = [
  { category: { ru: "Онкология", en: "Oncology" }, items: [
    { slug: "rak-grudi", title: { ru: "Рак груди", en: "Breast cancer" } },
    { slug: "rak-legkih", title: { ru: "Рак лёгких", en: "Lung cancer" } },
    { slug: "rak-prostaty", title: { ru: "Рак простаты", en: "Prostate cancer" } },
    { slug: "rak-zheludka", title: { ru: "Рак желудка", en: "Stomach cancer" } },
    { slug: "rak-pecheni", title: { ru: "Рак печени", en: "Liver cancer" } },
    { slug: "rak-pochki", title: { ru: "Рак почки", en: "Kidney cancer" } },
    { slug: "melanoma", title: { ru: "Меланома", en: "Melanoma" } },
    { slug: "lejkoz", title: { ru: "Лейкоз", en: "Leukemia" } },
  ]},
  { category: { ru: "Кардиология", en: "Cardiology" }, items: [
    { slug: "ishemicheskaya-bolezn-serdcza", title: { ru: "Ишемическая болезнь сердца", en: "Ischemic heart disease" } },
    { slug: "aritmiya", title: { ru: "Аритмия", en: "Arrhythmia" } },
    { slug: "infarkt-miokarda", title: { ru: "Инфаркт миокарда", en: "Myocardial infarction" } },
    { slug: "aortokoronarnoe-shuntirovanie", title: { ru: "Аортокоронарное шунтирование", en: "Coronary bypass (CABG)" } },
    { slug: "zamena-serdechnogo-klapana", title: { ru: "Замена сердечного клапана", en: "Heart valve replacement" } },
    { slug: "stentirovanie", title: { ru: "Стентирование", en: "Stenting" } },
  ]},
  { category: { ru: "Ортопедия", en: "Orthopedics" }, items: [
    { slug: "endoprotezirovanie-kolennogo-sustava", title: { ru: "Замена коленного сустава", en: "Knee replacement" } },
    { slug: "zamena-tazobedrennogo-sustava", title: { ru: "Замена тазобедренного сустава", en: "Hip replacement" } },
    { slug: "lechenie-pozvonochnika", title: { ru: "Лечение позвоночника", en: "Spine treatment" } },
    { slug: "mezhpozvonochnaya-gryzha", title: { ru: "Межпозвоночная грыжа", en: "Herniated disc" } },
    { slug: "artroz", title: { ru: "Артроз", en: "Osteoarthritis" } },
  ]},
  { category: { ru: "Неврология и нейрохирургия", en: "Neurology & neurosurgery" }, items: [
    { slug: "rasseyannyj-skleroz", title: { ru: "Рассеянный склероз", en: "Multiple sclerosis" } },
    { slug: "bolezn-parkinsona", title: { ru: "Болезнь Паркинсона", en: "Parkinson's disease" } },
    { slug: "glioblastoma", title: { ru: "Глиобластома", en: "Glioblastoma" } },
    { slug: "adenoma-gipofiza", title: { ru: "Аденома гипофиза", en: "Pituitary adenoma" } },
  ]},
  { category: { ru: "Гастроэнтерология", en: "Gastroenterology" }, items: [
    { slug: "yazva-zheludka", title: { ru: "Язва желудка", en: "Stomach ulcer" } },
    { slug: "gastrit", title: { ru: "Гастрит", en: "Gastritis" } },
    { slug: "chernovik", title: { ru: "Болезнь Крона", en: "Crohn's disease" } },
    { slug: "pahovaya-gryzha", title: { ru: "Паховая грыжа", en: "Inguinal hernia" } },
  ]},
  { category: { ru: "Урология", en: "Urology" }, items: [
    { slug: "adenoma-prostaty", title: { ru: "Аденома простаты", en: "Prostate adenoma" } },
    { slug: "mochekamennaya-bolezn", title: { ru: "Мочекаменная болезнь", en: "Kidney stone disease" } },
    { slug: "prostatit", title: { ru: "Простатит", en: "Prostatitis" } },
  ]},
];

export const doctors = [
  { slug: "vladislav-grinberg-3", name: { ru: "Владислав Гринберг", en: "Vladislav Grinberg" }, spec: { ru: "Онколог, радиационная онкология", en: "Oncologist, radiation oncology" }, dept: "oncology", photo: "https://assuta.org/wp-content/cache/thumb/69/a99e690b985ba69_371x324_notcrop.png" },
  { slug: "doktor-orit-gotfeld", name: { ru: "Д-р Орит Готфрид", en: "Dr. Orit Gotfried" }, spec: { ru: "Онколог, ЛОР-онкология", en: "Oncologist, ENT oncology" }, dept: "oncology", photo: "https://assuta.org/wp-content/cache/thumb/2e/c8aeb3f63da2c2e_371x324_notcrop.webp" },
  { slug: "doktor-morsi-hashan", name: { ru: "Д-р Хассан Морси", en: "Dr. Hassan Morsi" }, spec: { ru: "Хирург-вертебролог", en: "Spinal surgeon" }, dept: "orthopedic", photo: "https://assuta.org/wp-content/cache/thumb/45/9f121ff8be06645_371x324_notcrop.webp" },
  { slug: "doktor-roj-taldermatolog", name: { ru: "Д-р Рой Таль", en: "Dr. Roy Tal" }, spec: { ru: "Дерматолог", en: "Dermatologist" }, dept: "hematology", photo: "https://assuta.org/wp-content/cache/thumb/c1/63f249cb6bd08c1_371x324_notcrop.webp" },
  { slug: "professor-uri-elbaz", name: { ru: "Проф. Ури Эльбаз", en: "Prof. Uri Elbaz" }, spec: { ru: "Офтальмология, катаракта", en: "Ophthalmology, cataract" }, dept: "ophthalmolog", photo: "https://assuta.org/wp-content/cache/thumb/eb/6b47e37b350e1eb_371x324_notcrop.webp" },
  { slug: "doktor-eran-emanuel-alon-2", name: { ru: "Д-р Эран Эмануэль Алон", en: "Dr. Eran Emanuel Alon" }, spec: { ru: "Хирург головы и шеи", en: "Head & neck surgeon" }, dept: "ent-doctors", photo: "https://assuta.org/wp-content/cache/thumb/ce/1f1a39a146f46ce_371x324_notcrop.webp" },
  { slug: "professor-yair-moran", name: { ru: "Проф. Яир Морад", en: "Prof. Yair Morad" }, spec: { ru: "Офтальмолог, детский хирург", en: "Ophthalmologist, pediatric surgeon" }, dept: "ophthalmolog", photo: "https://assuta.org/wp-content/cache/thumb/ea/bc1aa3464afa5ea_371x324_notcrop.webp" },
  { slug: "doktor-ronit-elhasid", name: { ru: "Д-р Ронит Эльхасид", en: "Dr. Ronit Elhasid" }, spec: { ru: "Детский онкогематолог", en: "Pediatric hemato-oncologist" }, dept: "hematology", photo: "https://assuta.org/wp-content/cache/thumb/a0/f69a73f536e3ba0_371x324_notcrop.webp" },
  { slug: "professor-shlomo-konstantini", name: { ru: "Проф. Шломо Константини", en: "Prof. Shlomo Constantini" }, spec: { ru: "Детский нейрохирург", en: "Pediatric neurosurgeon" }, dept: "neurosurgery", photo: "https://assuta.org/wp-content/cache/thumb/74/1afcbff16334874_371x324_notcrop.webp" },
  { slug: "professor-ido-volf", name: { ru: "Проф. Идо Вольф", en: "Prof. Ido Wolf" }, spec: { ru: "Медицинский онколог", en: "Medical oncologist" }, dept: "oncology", photo: "" },
  { slug: "professor-ehud-raanani", name: { ru: "Проф. Эхуд Раанани", en: "Prof. Ehud Raanani" }, spec: { ru: "Кардиохирург", en: "Cardiac surgeon" }, dept: "cardiology", photo: "" },
  { slug: "professor-dan-aderka", name: { ru: "Проф. Дан Адерка", en: "Prof. Dan Aderka" }, spec: { ru: "Онколог", en: "Oncologist" }, dept: "oncology", photo: "" },
];

export const reviews = [
  { author: "Марина", country: { ru: "Россия", en: "Russia" }, text: { ru: "Прошла лечение в онкологическом отделении. Врачи внимательные, диагностику сделали за три дня. Огромная благодарность всей команде за поддержку и профессионализм.", en: "I was treated in the oncology department. The doctors were attentive and the diagnosis took three days. Huge thanks to the whole team for their support and professionalism." } },
  { author: "Дмитрий", country: { ru: "Казахстан", en: "Kazakhstan" }, text: { ru: "Оперировали позвоночник. Всё организовали от и до: встреча, переводчик, гостиница. Результатом очень доволен, боли ушли.", en: "I had spine surgery. Everything was arranged end to end: pick-up, an interpreter, a hotel. Very happy with the result, the pain is gone." } },
  { author: "Елена", country: { ru: "Украина", en: "Ukraine" }, text: { ru: "Приезжали с мамой на кардиологическое обследование. Отношение человеческое, оборудование современное. Рекомендую.", en: "We came with my mother for a cardiac check-up. Caring attitude and modern equipment. Highly recommend." } },
  { author: "Игорь", country: { ru: "Россия", en: "Russia" }, text: { ru: "Быстро согласовали программу, честные цены без скрытых доплат. Спасибо координатору за сопровождение на каждом этапе.", en: "The program was agreed quickly, fair prices with no hidden fees. Thanks to the coordinator for support at every step." } },
];

export const news = [
  { slug: "metod-tem", img: "https://assuta.org/wp-content/cache/thumb/66/a1dd44c164bac66_371x259.jpg", title: { ru: "Метод ТЭМ — новая технология лечения рака прямой кишки", en: "TEM method — a new technology for rectal cancer treatment" }, excerpt: { ru: "Трансанальная эндоскопическая микрохирургия — революционный малоинвазивный метод лечения рака прямой кишки.", en: "Transanal endoscopic microsurgery — a revolutionary minimally invasive method for treating rectal cancer." } },
  { slug: "predrakovoe-sostoyanie", img: "https://assuta.org/wp-content/cache/thumb/14/0ef35c07ca43414_371x259.jpg", title: { ru: "Предраковое состояние: как лечить", en: "Precancerous conditions: how they are treated" }, excerpt: { ru: "Предрак — процесс патологического изменения тканей с высокой вероятностью перерождения. Разбираем современные подходы.", en: "A precancerous state is tissue change with a high risk of turning malignant. We review modern approaches." } },
  { slug: "immunoterapiya", img: "https://assuta.org/wp-content/uploads/2023/08/we_offer2-1.webp", title: { ru: "Иммунотерапия в онкологии: кому и когда", en: "Immunotherapy in oncology: who and when" }, excerpt: { ru: "Современная иммунотерапия дополняет классические методы лечения и повышает шансы на ремиссию.", en: "Modern immunotherapy complements classic treatments and improves the chances of remission." } },
];

export const deptNames = Object.fromEntries(departments.map((d) => [d.slug, d.title]));
