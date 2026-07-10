// Реальные данные, собранные с assuta.org, для превью.
export const site = {
  name: "Assuta",
  brand: "Ассута",
  tagline: "Ведущая частная клиника Израиля",
  founded: 1935,
  address: "Израиль, Тель-Авив, Рамат-ха-Хаяль, ул. ха-Барзель, 11",
  logo: "https://assuta.org/wp-content/themes/assutaisrael/assets/images/assuta-logo.png",
  heroBg: "https://assuta.org/wp-content/uploads/2023/08/slider_bg.webp",
  phones: [
    { label: "Израиль", value: "+972 74-702-0202", href: "tel:+972747020202", flag: "🇮🇱" },
    { label: "Россия (бесплатно)", value: "8 800-302-49-06", href: "tel:88003024906", flag: "🇷🇺" },
    { label: "Украина", value: "0 800-357-14", href: "tel:080035714", flag: "🇺🇦" },
  ],
  messengers: [
    { label: "WhatsApp", value: "+972 53-425-3652", href: "https://api.whatsapp.com/send/?phone=972534253652" },
    { label: "Telegram", value: "@belenkaya_yana", href: "https://t.me/belenkaya_yana" },
    { label: "Viber", value: "+972 53-425-3652", href: "viber://chat?number=972534253652" },
  ],
};

export const stats = [
  { num: "100%", label: "всех операций в Израиле проводятся в Ассута" },
  { num: "20+", label: "медицинских специальностей" },
  { num: "1935", label: "год основания клиники" },
  { num: "3000+", label: "узкопрофильных врачей" },
];

export const offers = [
  {
    title: "Врачи клиники Ассута",
    desc: "Высококвалифицированные специалисты с внушительным опытом клинической практики. Надёжность и качество услуг гарантированы.",
    img: "https://assuta.org/wp-content/uploads/2023/08/we_offer-1.webp",
    href: "/doctors",
  },
  {
    title: "Современные технологии",
    desc: "Постоянное внедрение новейших разработок, доказавших высокую эффективность в международных клинических исследованиях.",
    img: "https://assuta.org/wp-content/uploads/2023/08/we_offer2-1.webp",
    href: "/diagnostics",
  },
  {
    title: "Выбор врача",
    desc: "Возможность самостоятельно выбрать лечащего специалиста среди лучших экспертов клиники.",
    img: "https://assuta.org/wp-content/uploads/2023/08/we_offer3.webp",
    href: "/doctors",
  },
];

export const nav = [
  { label: "Врачи", href: "/doctors" },
  { label: "Направления", href: "/departments" },
  { label: "Диагностика", href: "/diagnostics" },
  { label: "Заболевания", href: "/diseases" },
  { label: "Цены", href: "/prices" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Новости", href: "/news" },
  { label: "Контакты", href: "/contacts" },
];

export const departments = [
  { icon: "🎗️", title: "Онкология", slug: "oncology", desc: "Диагностика и лечение всех видов рака по современным протоколам." },
  { icon: "🫀", title: "Кардиология", slug: "cardiology", desc: "Полный спектр кардиохирургии и интервенционного лечения сердца." },
  { icon: "🦴", title: "Ортопедия", slug: "orthopedic", desc: "Эндопротезирование суставов и лечение позвоночника." },
  { icon: "🧠", title: "Нейрохирургия", slug: "neurosurgery", desc: "Операции на головном и спинном мозге любой сложности." },
  { icon: "🔬", title: "Урология", slug: "urology", desc: "Диагностика и лечение заболеваний мочеполовой системы." },
  { icon: "👶", title: "Гинекология", slug: "gynecologists", desc: "Женское здоровье, репродукция, онкогинекология." },
  { icon: "🩺", title: "Гастроэнтерология", slug: "gastroenterology", desc: "Заболевания ЖКТ, эндоскопия, малоинвазивная хирургия." },
  { icon: "✨", title: "Пластическая хирургия", slug: "plastic-surgery", desc: "Эстетическая и реконструктивная хирургия." },
  { icon: "👁️", title: "Офтальмология", slug: "ophthalmolog", desc: "Микрохирургия глаза, катаракта, лечение сетчатки." },
  { icon: "🧬", title: "Эндокринология", slug: "endocrinologists", desc: "Диабет, щитовидная железа, гормональные нарушения." },
  { icon: "👂", title: "ЛОР", slug: "ent-doctors", desc: "Диагностика и хирургия уха, горла и носа." },
  { icon: "🩸", title: "Гематология", slug: "hematology", desc: "Лечение заболеваний крови и лимфатической системы." },
];

export const diseasesByCategory = [
  { category: "Онкология", items: [
    { title: "Рак груди", slug: "rak-grudi" },
    { title: "Рак лёгких", slug: "rak-legkih" },
    { title: "Рак простаты", slug: "rak-prostaty" },
    { title: "Рак желудка", slug: "rak-zheludka" },
    { title: "Рак печени", slug: "rak-pecheni" },
    { title: "Рак почки", slug: "rak-pochki" },
    { title: "Меланома", slug: "melanoma" },
    { title: "Лейкоз", slug: "lejkoz" },
  ]},
  { category: "Кардиология", items: [
    { title: "Ишемическая болезнь сердца", slug: "ishemicheskaya-bolezn-serdcza" },
    { title: "Аритмия", slug: "aritmiya" },
    { title: "Инфаркт миокарда", slug: "infarkt-miokarda" },
    { title: "Аортокоронарное шунтирование", slug: "aortokoronarnoe-shuntirovanie" },
    { title: "Замена сердечного клапана", slug: "zamena-serdechnogo-klapana" },
    { title: "Стентирование", slug: "stentirovanie" },
  ]},
  { category: "Ортопедия", items: [
    { title: "Замена коленного сустава", slug: "endoprotezirovanie-kolennogo-sustava" },
    { title: "Замена тазобедренного сустава", slug: "zamena-tazobedrennogo-sustava" },
    { title: "Лечение позвоночника", slug: "lechenie-pozvonochnika" },
    { title: "Межпозвоночная грыжа", slug: "mezhpozvonochnaya-gryzha" },
    { title: "Артроз", slug: "artroz" },
  ]},
  { category: "Неврология и нейрохирургия", items: [
    { title: "Рассеянный склероз", slug: "rasseyannyj-skleroz" },
    { title: "Болезнь Паркинсона", slug: "bolezn-parkinsona" },
    { title: "Глиобластома", slug: "glioblastoma" },
    { title: "Аденома гипофиза", slug: "adenoma-gipofiza" },
  ]},
  { category: "Гастроэнтерология", items: [
    { title: "Язва желудка", slug: "yazva-zheludka" },
    { title: "Гастрит", slug: "gastrit" },
    { title: "Болезнь Крона", slug: "chernovik" },
    { title: "Паховая грыжа", slug: "pahovaya-gryzha" },
  ]},
  { category: "Урология", items: [
    { title: "Аденома простаты", slug: "adenoma-prostaty" },
    { title: "Мочекаменная болезнь", slug: "mochekamennaya-bolezn" },
    { title: "Простатит", slug: "prostatit" },
  ]},
];

export const doctors = [
  { slug: "vladislav-grinberg-3", name: "Владислав Гринберг", spec: "Онколог, радиационная онкология", dept: "Онкология", photo: "https://assuta.org/wp-content/cache/thumb/69/a99e690b985ba69_371x324_notcrop.png" },
  { slug: "doktor-orit-gotfeld", name: "Д-р Орит Готфрид", spec: "Онколог, ЛОР-онкология", dept: "Онкология", photo: "https://assuta.org/wp-content/cache/thumb/2e/c8aeb3f63da2c2e_371x324_notcrop.webp" },
  { slug: "doktor-morsi-hashan", name: "Д-р Хассан Морси", spec: "Хирург-вертебролог", dept: "Ортопедия", photo: "https://assuta.org/wp-content/cache/thumb/45/9f121ff8be06645_371x324_notcrop.webp" },
  { slug: "doktor-roj-taldermatolog", name: "Д-р Рой Таль", spec: "Дерматолог", dept: "Дерматология", photo: "https://assuta.org/wp-content/cache/thumb/c1/63f249cb6bd08c1_371x324_notcrop.webp" },
  { slug: "professor-uri-elbaz", name: "Проф. Ури Эльбаз", spec: "Офтальмология, катаракта", dept: "Офтальмология", photo: "https://assuta.org/wp-content/cache/thumb/eb/6b47e37b350e1eb_371x324_notcrop.webp" },
  { slug: "doktor-eran-emanuel-alon-2", name: "Д-р Эран Эмануэль Алон", spec: "Хирург головы и шеи", dept: "ЛОР", photo: "https://assuta.org/wp-content/cache/thumb/ce/1f1a39a146f46ce_371x324_notcrop.webp" },
  { slug: "professor-yair-moran", name: "Проф. Яир Морад", spec: "Офтальмолог, детский хирург", dept: "Офтальмология", photo: "https://assuta.org/wp-content/cache/thumb/ea/bc1aa3464afa5ea_371x324_notcrop.webp" },
  { slug: "doktor-ronit-elhasid", name: "Д-р Ронит Эльхасид", spec: "Детский онкогематолог", dept: "Гематология", photo: "https://assuta.org/wp-content/cache/thumb/a0/f69a73f536e3ba0_371x324_notcrop.webp" },
  { slug: "professor-shlomo-konstantini", name: "Проф. Шломо Константини", spec: "Детский нейрохирург", dept: "Нейрохирургия", photo: "https://assuta.org/wp-content/cache/thumb/74/1afcbff16334874_371x324_notcrop.webp" },
  { slug: "professor-ido-volf", name: "Проф. Идо Вольф", spec: "Медицинский онколог", dept: "Онкология", photo: "" },
  { slug: "professor-ehud-raanani", name: "Проф. Эхуд Раанани", spec: "Кардиохирург", dept: "Кардиология", photo: "" },
  { slug: "professor-dan-aderka", name: "Проф. Дан Адерка", spec: "Онколог", dept: "Онкология", photo: "" },
];

export const reviews = [
  { author: "Марина", country: "Россия", text: "Прошла лечение в онкологическом отделении. Врачи внимательные, диагностику сделали за три дня. Огромная благодарность всей команде за поддержку и профессионализм." },
  { author: "Дмитрий", country: "Казахстан", text: "Оперировали позвоночник. Всё организовали от и до: встреча, переводчик, гостиница. Результатом очень доволен, боли ушли." },
  { author: "Елена", country: "Украина", text: "Приезжали с мамой на кардиологическое обследование. Отношение человеческое, оборудование современное. Рекомендую." },
  { author: "Игорь", country: "Россия", text: "Быстро согласовали программу, честные цены без скрытых доплат. Спасибо координатору за сопровождение на каждом этапе." },
];

export const news = [
  { title: "Метод ТЭМ — новая технология лечения рака прямой кишки в Израиле", excerpt: "Трансанальная эндоскопическая микрохирургия — революционный малоинвазивный метод лечения рака прямой кишки.", img: "https://assuta.org/wp-content/cache/thumb/66/a1dd44c164bac66_371x259.jpg", slug: "metod-tem" },
  { title: "Предраковое состояние: как лечить", excerpt: "Предрак — процесс патологического изменения тканей с высокой вероятностью перерождения. Разбираем современные подходы.", img: "https://assuta.org/wp-content/cache/thumb/14/0ef35c07ca43414_371x259.jpg", slug: "predrakovoe-sostoyanie" },
  { title: "Иммунотерапия в онкологии: кому и когда", excerpt: "Современная иммунотерапия дополняет классические методы лечения и повышает шансы на ремиссию.", img: "https://assuta.org/wp-content/uploads/2023/08/we_offer2-1.webp", slug: "immunoterapiya" },
];
