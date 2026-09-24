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

// Словарь интерфейсных строк
export const ui = {
  freeConsult: { ru: "Бесплатная консультация", en: "Free consultation" },
  getConsult: { ru: "Получить консультацию", en: "Get a consultation" },
  ourDoctors: { ru: "Наши врачи", en: "Our doctors" },
  allDoctors: { ru: "Все врачи", en: "All doctors" },
  allDiseases: { ru: "Все заболевания", en: "All conditions" },
  learnMore: { ru: "Узнать больше", en: "Learn more" },
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
};

export function t(lang, key) {
  const e = ui[key];
  return e ? e[lang] ?? e.ru : key;
}
