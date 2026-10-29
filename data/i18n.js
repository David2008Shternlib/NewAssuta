// Выбор значения по языку: строка или объект {ru,en}
export function pick(v, lang) {
  if (v && typeof v === "object" && ("ru" in v || "en" in v)) return v[lang] ?? v.ru;
  return v;
}


// Имя врача по языку: на английской версии берём «Имя (EN)», если оно
// заполнено в CMS, иначе показываем русское — пустого места не будет.
export function docName(doc, lang) {
  if (!doc) return "";
  if (lang === "en" && (doc.nameEn || "").trim()) return doc.nameEn.trim();
  return doc.name || "";
}

// Поле из CMS по языку. На английской версии берём соседнее поле «…En»
// («titleEn», «bodyHtmlEn» и так далее), если оно заполнено; иначе показываем
// русское — пустого места на странице не будет, даже пока перевод не готов.
export function cms(doc, field, lang) {
  if (!doc) return "";
  if (lang === "en") {
    const en = doc[`${field}En`];
    if (typeof en === "string" && en.trim()) return en.trim();
  }
  return doc[field] || "";
}

// Словарь интерфейсных строк
export const ui = {
  freeConsult: { ru: "Бесплатная консультация", en: "Free consultation" },
  getConsult: { ru: "Получить консультацию", en: "Get a consultation" },
  ourDoctors: { ru: "Наши врачи", en: "Our doctors" },
  allDoctors: { ru: "Все врачи", en: "All doctors" },
  allDiseases: { ru: "Все заболевания", en: "All conditions" },
  learnMore: { ru: "Узнать больше", en: "Learn more" },
  // Длинные списки заболеваний свёрнуты: в онкологии их 47, карточка иначе
  // растягивала всю строку сетки. Число подставляется в подпись кнопки.
  menu: { ru: "Меню", en: "Menu" },
  cookieTitle: { ru: "О файлах cookie", en: "About cookies" },
  cookieText: {
    ru: "Мы используем файлы cookie, чтобы сайт работал, и — с вашего согласия — чтобы считать посещаемость. Без согласия статистика не собирается совсем.",
    en: "We use cookies to keep the site working and — with your consent — to measure traffic. Without consent no statistics are collected at all.",
  },
  cookieLink: { ru: "Подробнее в политике конфиденциальности", en: "More in our privacy policy" },
  cookieAccept: { ru: "Принять все", en: "Accept all" },
  cookieNecessary: { ru: "Только необходимые", en: "Necessary only" },
  formHeardFrom: { ru: "Откуда вы о нас узнали? (необязательно)", en: "How did you hear about us? (optional)" },
  showMore: { ru: "Показать ещё", en: "Show more" },
  showLess: { ru: "Свернуть", en: "Show less" },
  // Подпись на карточке новости: без неё было не видно, что карточка кликается.
  read: { ru: "Читать", en: "Read" },
  more: { ru: "Подробнее", en: "More" },
  home: { ru: "Главная", en: "Home" },
  headerTagline: { ru: "Ведущая частная клиника Израиля", en: "Israel's leading private clinic" },
  clinicIn: { ru: "Клиника\nв Израиле", en: "Clinic\nin Israel" },
  support247: { ru: "Круглосуточная поддержка", en: "24/7 support" },

  heroSub: { ru: "Современный частный медицинский центр в Израиле", en: "A modern private medical center in Israel" },

  offersEyebrow: { ru: "Что мы предлагаем", en: "What we offer" },
  offersTitle: { ru: "Преимущества клиники Ассута", en: "Advantages of Assuta clinic" },

  deptEyebrow: { ru: "Более 20 специальностей", en: "More than 20 specialties" },
  deptTitle: { ru: "Направления лечения", en: "Treatment areas" },
  deptSub: { ru: "От пластической хирургии до нейрохирургии — комплексная помощь по всем ключевым направлениям.", en: "From plastic surgery to neurosurgery — comprehensive care across all key areas." },
  deptDoctors: { ru: "Врачи направления", en: "Doctors of the area" },

  docEyebrow: { ru: "Более 3000 врачей", en: "More than 3000 doctors" },
  docTitle: { ru: "Наши ведущие специалисты", en: "Our leading specialists" },
  docSub: { ru: "Профессора и врачи высшей категории с мировым именем.", en: "Professors and top-tier doctors with a global reputation." },
  expertise: { ru: "Области экспертизы", en: "Areas of expertise" },
  bookDoctor: { ru: "Записаться к врачу", en: "Book an appointment" },
  leaveRequestHint: { ru: "Оставьте заявку — координатор свяжется с вами.", en: "Leave a request — our coordinator will contact you." },
  backToDoctors: { ru: "Ко всем врачам", en: "Back to all doctors" },
  backToDiseases: { ru: "Ко всем заболеваниям", en: "Back to all conditions" },

  disEyebrow: { ru: "Клиника Ассута", en: "Assuta clinic" },
  disTitle: { ru: "Что мы лечим", en: "What we treat" },
  disSub: { ru: "Схема комплексного ведения пациента и техническое оснащение отвечают высочайшим медицинским стандартам.", en: "Comprehensive patient management and technical equipment meet the highest medical standards." },
  area: { ru: "Направление", en: "Area" },
  getCost: { ru: "Узнать стоимость лечения", en: "Get treatment cost" },
  costHint: { ru: "Оставьте заявку — рассчитаем программу и цену.", en: "Leave a request — we'll calculate the program and price." },

  videoTitle: { ru: "Клиника Ассута", en: "Assuta clinic" },
  videoCaption: { ru: "Видео о клинике Ассута", en: "Video about Assuta clinic" },
  newsEyebrow: { ru: "Медицинские новости", en: "Medical news" },
  newsTitle: { ru: "Статьи и технологии", en: "Articles & technologies" },

  reviewsEyebrow: { ru: "Отзывы пациентов", en: "Patient reviews" },
  reviewsTitle: { ru: "Нам доверяют", en: "They trust us" },

  ctaEyebrow: { ru: "Бесплатная консультация", en: "Free consultation" },
  ctaTitle: { ru: "Оставьте заявку на лечение в Ассута", en: "Request treatment at Assuta" },
  ctaSub: { ru: "Мы возьмём на себя весь процесс организации поездки: подбор врача, программу диагностики, перевод, трансфер и проживание.", en: "We handle the whole trip: choosing a doctor, the diagnostic program, translation, transfer and accommodation." },

  formName: { ru: "Ваше имя", en: "Your name" },
  formPhone: { ru: "Телефон", en: "Phone" },
  formComment: { ru: "Кратко опишите ситуацию (необязательно)", en: "Briefly describe your situation (optional)" },
  formPrivacy: { ru: "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности", en: "By clicking the button you agree to the privacy policy" },
  sentTitle: { ru: "Заявка отправлена", en: "Request sent" },
  sentMsg: { ru: "Спасибо! Наш координатор свяжется с вами в ближайшее время.", en: "Thank you! Our coordinator will contact you shortly." },
  phoneError: { ru: "Введите корректный номер телефона", en: "Please enter a valid phone number" },
  nameError: { ru: "Введите имя", en: "Please enter your name" },
  consentLabel: {
    ru: "Я согласен на обработку моих персональных данных",
    en: "I consent to the processing of my personal data",
  },
  consentLink: { ru: "политикой конфиденциальности", en: "privacy policy" },
  consentError: {
    ru: "Без согласия на обработку данных мы не можем принять заявку",
    en: "We cannot accept the request without your consent to data processing",
  },
  privacyTitle: { ru: "Политика конфиденциальности", en: "Privacy policy" },
  medDisclaimerTitle: { ru: "Важно", en: "Important" },
  medDisclaimer: {
    ru: "Материал носит информационный характер и не заменяет очную консультацию врача. Диагноз и тактику лечения определяет лечащий врач после осмотра и обследования. Мы организуем лечение и сопровождение пациентов и не являемся медицинским учреждением.",
    en: "This material is for information only and does not replace an in-person medical consultation. Diagnosis and treatment are determined by the treating physician after examination. We organise treatment and patient support and are not a medical institution.",
  },
  sendError: {
    ru: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.",
    en: "Could not send the request. Please try again or call us.",
  },
  tooManyError: {
    ru: "Слишком много заявок подряд. Попробуйте через несколько минут или позвоните нам.",
    en: "Too many requests in a row. Please try again in a few minutes or call us.",
  },
  aboutClinic: { ru: "О клинике", en: "About clinic" },
  diagnosticsBtn: { ru: "Диагностика", en: "Diagnostics" },
  aboutTitle: { ru: "О клинике", en: "About the clinic" },

  // подписи страниц
  pgDoctorsSub: { ru: "Более 3000 узкопрофильных специалистов: профессора и врачи высшей категории с мировым именем.", en: "More than 3000 specialists: professors and top-tier doctors with a global reputation." },
  pgDiseasesSub: { ru: "Диагностика и лечение по всем ключевым направлениям современной медицины.", en: "Diagnostics and treatment across all key areas of modern medicine." },
  pgDeptSub: { ru: "Более 20 медицинских специальностей под одной крышей.", en: "More than 20 medical specialties under one roof." },
  pgDiagTitle: { ru: "Диагностические программы", en: "Diagnostic programs" },
  pgDiagSub: { ru: "Комплексное обследование организма за 1–3 дня на оборудовании экспертного класса.", en: "A full body check-up in 1–3 days on expert-class equipment." },
  pgPricesSub: { ru: "Ориентировочная стоимость. Точную цену программы рассчитывает координатор после изучения ситуации.", en: "Indicative prices. The exact program cost is calculated by a coordinator after reviewing your case." },
  pgReviewsSub: { ru: "Истории людей, которые прошли лечение в клинике Ассута.", en: "Stories of people who were treated at Assuta clinic." },
  pgNewsSub: { ru: "Новые технологии, методы лечения и полезные материалы.", en: "New technologies, treatment methods and useful materials." },
  book: { ru: "Записаться", en: "Book now" },
  contactUs: { ru: "Свяжитесь с нами", en: "Contact us" },
  leaveRequest: { ru: "Оставить заявку", en: "Leave a request" },
  contactsSub: { ru: "Ответим и составим программу лечения.", en: "We'll reply and prepare a treatment program." },
  priceDisclaimer: {
    ru: "* Цены ориентировочные, действительны на 2026 год и не являются публичной офертой. Точную стоимость программы координатор рассчитывает после изучения медицинских документов.",
    en: "* Prices are indicative, valid for 2026 and do not constitute a public offer. The exact programme cost is calculated by a coordinator after reviewing your medical records.",
  },

  /* ─── Главная страница: тексты с макета клиента ───
     Русские формулировки перенесены с макета дословно, английские — перевод.
     Менять их можно прямо здесь, вёрстку трогать не нужно. */
  hpEyebrow: { ru: "Лечение и диагностика в Израиле", en: "Treatment and diagnostics in Israel" },
  hpTitle: { ru: "Ведущий частный медицинский центр Израиля", en: "Israel's leading private medical centre" },
  hpLead: {
    ru: "Более 1 000 000 пациентов в год. Один из крупнейших хирургических центров страны. Ведущие израильские специалисты, современная диагностика и лечение сложных случаев.",
    en: "More than 1,000,000 patients a year. One of the country's largest surgical centres. Leading Israeli specialists, modern diagnostics and treatment of complex cases.",
  },
  hpCta1: { ru: "Получить программу лечения", en: "Get a treatment programme" },
  hpCta1Sub: { ru: "Предварительная оценка и план", en: "Preliminary assessment and plan" },
  hpCta2: { ru: "Написать координатору в WhatsApp", en: "Message a coordinator on WhatsApp" },
  hpCta2Sub: { ru: "Живой человек. Ответим на русском", en: "A real person. We answer in Russian" },

  hpHelpTitle: { ru: "С чем вам помочь?", en: "How can we help?" },
  hpHelpSub: {
    ru: "Выберите направление, чтобы получить соответствующую информацию",
    en: "Choose an area to see the relevant information",
  },

  hpPromise1: { ru: "Живой координатор", en: "A real coordinator" },
  hpPromise1Sub: { ru: "На связи 24/7", en: "Available 24/7" },
  hpPromise2: { ru: "Подбор врача по вашему диагнозу", en: "A doctor matched to your diagnosis" },
  hpPromise2Sub: { ru: "Индивидуальный подход", en: "An individual approach" },
  hpPromise3: { ru: "Программа и стоимость до приезда", en: "Programme and cost before you arrive" },
  hpPromise3Sub: { ru: "Расчет стоимости в течение 24 часов", en: "Costing within 24 hours" },
  hpPromise4: { ru: "Сопровождение на всех этапах", en: "Support at every stage" },
  hpPromise4Sub: { ru: "Диагностика, лечение, логистика", en: "Diagnostics, treatment, logistics" },

  hpStat1: { ru: "пациентов в год", en: "patients a year" },
  hpStat2: { ru: "операций в год", en: "operations a year" },
  hpStat3: { ru: "хирургов и врачей", en: "surgeons and doctors" },
  hpStat4: { ru: "Международные стандарты качества", en: "International quality standards" },

  hpSecondTitle: { ru: "Второе мнение от ведущего специалиста", en: "A second opinion from a leading specialist" },
  hpSecondSub: {
    ru: "Получите независимую оценку вашего диагноза и вариантов лечения.",
    en: "Get an independent assessment of your diagnosis and treatment options.",
  },
  hpSecondLink: { ru: "Узнать больше", en: "Learn more" },

  hpDoctorsTitle: { ru: "Ведущие специалисты", en: "Leading specialists" },
  hpStoriesTitle: { ru: "Истории пациентов", en: "Patient stories" },
  hpStoriesAll: { ru: "Все истории", en: "All stories" },
  hpPricesTitle: { ru: "Популярные услуги и цены", en: "Popular services and prices" },
  hpPricesAll: { ru: "Все цены", en: "All prices" },
  byRequest: { ru: "по запросу", en: "on request" },

  hpStepsTitle: { ru: "Как начать лечение?", en: "How to start treatment" },
  hpStep1: { ru: "Отправляете заявку", en: "You send a request" },
  hpStep2: { ru: "Мы подберем специалистов", en: "We select the specialists" },
  hpStep3: { ru: "Получаете план лечения и стоимость", en: "You receive a treatment plan and costing" },
  hpStep4: { ru: "Организуем поездку и лечение", en: "We arrange the trip and the treatment" },
};

export function t(lang, key) {
  const e = ui[key];
  return e ? e[lang] ?? e.ru : key;
}
