// Схемы контента для Sanity Studio (проект Ассута).
// Положить в scaffolded Studio: экспортировать в schema.types.

const localeText = (name, title) => ({ name, title, type: "object", fields: [
  { name: "ru", title: "RU", type: "text", rows: 3 },
  { name: "en", title: "EN", type: "text", rows: 3 },
]});

export const doctor = {
  name: "doctor", title: "Врач", type: "document",
  fields: [
    { name: "name", title: "Имя", type: "string" },
    { name: "nameEn", title: "Имя (EN)", type: "string" },
    { name: "slug", title: "Слаг", type: "slug", options: { source: "name" } },
    { name: "specialization", title: "Специализация", type: "string" },
    { name: "specializationEn", title: "Специализация (EN)", type: "string" },
    // Направление не дублируется на английском: по нему сайт собирает врачей
    // в разделы, поэтому значение должно оставаться одним и тем же.
    { name: "department", title: "Направление", type: "string" },
    { name: "photo", title: "Фото", type: "image", options: { hotspot: true } },
    { name: "bodyHtml", title: "Описание (HTML с оригинала)", type: "text", rows: 12 },
    { name: "bodyHtmlEn", title: "Описание, EN (HTML)", type: "text", rows: 12 },
    { name: "sourceUrl", title: "Источник (старый URL)", type: "url" },
  ],
  preview: { select: { title: "name", subtitle: "specialization", media: "photo" } },
};

export const disease = {
  name: "disease", title: "Заболевание", type: "document",
  fields: [
    { name: "title", title: "Название", type: "string" },
    { name: "titleEn", title: "Название (EN)", type: "string" },
    { name: "slug", title: "Слаг", type: "slug", options: { source: "title" } },
    // Направление не дублируется на английском: по нему сайт собирает статьи
    // в разделы, поэтому значение должно оставаться одним и тем же.
    { name: "category", title: "Направление", type: "string" },
    { name: "excerpt", title: "Краткое описание", type: "text", rows: 3 },
    { name: "excerptEn", title: "Краткое описание (EN)", type: "text", rows: 3 },
    { name: "bodyHtml", title: "Текст статьи (HTML с оригинала)", type: "text", rows: 20 },
    { name: "bodyHtmlEn", title: "Текст статьи, EN (HTML)", type: "text", rows: 20 },
    { name: "image", title: "Изображение", type: "image", options: { hotspot: true } },
    { name: "sourceUrl", title: "Источник (старый URL)", type: "url" },
  ],
  preview: { select: { title: "title", subtitle: "category" } },
};

export const review = {
  name: "review", title: "Отзыв", type: "document",
  fields: [
    { name: "author", title: "Автор", type: "string" },
    // Возраст, диагноз и фото — то, что просит макет: «Мария, 42 года,
    // рак молочной железы» с портретом. Поля необязательные: пока они
    // пустые, карточка показывает отзыв без портрета и возраста,
    // как показывала раньше. Фото пациента публикуется только с его
    // письменного согласия — это персональные данные о здоровье.
    { name: "age", title: "Возраст", type: "number",
      description: "Только число. Пусто — возраст не показывается." },
    { name: "diagnosis", title: "Диагноз", type: "string",
      description: "Короткой строкой: «Рак молочной железы». Показывается под именем." },
    { name: "diagnosisEn", title: "Диагноз (EN)", type: "string" },
    { name: "photo", title: "Фото пациента", type: "image", options: { hotspot: true },
      description: "Публикуется только при письменном согласии пациента." },
    { name: "country", title: "Страна", type: "string" },
    { name: "rating", title: "Оценка", type: "number" },
    { name: "text", title: "Текст", type: "text", rows: 5 },
    { name: "date", title: "Дата", type: "datetime" },
  ],
  preview: { select: { title: "author", subtitle: "diagnosis", media: "photo" } },
};

export const news = {
  name: "news", title: "Новость", type: "document",
  fields: [
    { name: "title", title: "Заголовок", type: "string" },
    { name: "titleEn", title: "Заголовок (EN)", type: "string" },
    { name: "slug", title: "Слаг", type: "slug", options: { source: "title" } },
    { name: "excerpt", title: "Анонс", type: "text", rows: 3 },
    { name: "excerptEn", title: "Анонс (EN)", type: "text", rows: 3 },
    { name: "bodyHtml", title: "Текст (HTML с оригинала)", type: "text", rows: 20 },
    { name: "bodyHtmlEn", title: "Текст, EN (HTML)", type: "text", rows: 20 },
    { name: "image", title: "Изображение", type: "image", options: { hotspot: true } },
    { name: "date", title: "Дата", type: "datetime" },
    { name: "sourceUrl", title: "Источник (старый URL)", type: "url" },
  ],
  preview: { select: { title: "title", media: "image" } },
};

export const page = {
  name: "page", title: "Страница", type: "document",
  fields: [
    { name: "title", title: "Заголовок", type: "string" },
    { name: "slug", title: "Слаг", type: "slug", options: { source: "title" } },
    { name: "bodyHtml", title: "Содержимое (HTML)", type: "text", rows: 20 },
    { name: "sourceUrl", title: "Источник", type: "url" },
  ],
  preview: { select: { title: "title" } },
};

// Заявка с формы сайта. Пишется сервером, руками её не создают — поэтому
// поля только для чтения: координатор ведёт статус и комментарий, а данные
// посетителя остаются такими, какими он их оставил.
//
// Здесь персональные данные. Доступ к разделу есть у всех, кого пригласили
// в Studio, — приглашайте только тех, кому заявки положены по работе.
export const lead = {
  name: "lead", title: "Заявка с сайта", type: "document",
  fields: [
    { name: "name", title: "Имя", type: "string", readOnly: true },
    { name: "phone", title: "Телефон", type: "string", readOnly: true },
    { name: "country", title: "Страна", type: "string", readOnly: true },
    { name: "comment", title: "Комментарий", type: "text", rows: 3, readOnly: true },
    { name: "source", title: "Страница, с которой отправлена", type: "string", readOnly: true },

    // ───────── Откуда пришёл человек ─────────
    // Заполняется автоматически из меток в ссылке. Клиника платит блогерам
    // за приведённых пациентов, поэтому источник должен быть виден прямо
    // в карточке заявки, а не вычисляться задним числом по аналитике.
    { name: "utmSource", title: "Источник (кто привёл)", type: "string", readOnly: true,
      description: "Имя блогера или площадки из метки utm_source" },
    { name: "utmMedium", title: "Канал", type: "string", readOnly: true,
      description: "blogger, stories, reels и т.п." },
    { name: "utmCampaign", title: "Кампания", type: "string", readOnly: true },
    { name: "utmContent", title: "Объявление / пост", type: "string", readOnly: true },
    { name: "utmTerm", title: "Ключевое слово", type: "string", readOnly: true },
    { name: "referrer", title: "Переход с сайта", type: "string", readOnly: true },
    { name: "landing", title: "Первая открытая страница", type: "string", readOnly: true },
    { name: "firstSeenAt", title: "Первый заход на сайт", type: "datetime", readOnly: true },
    { name: "lastSource", title: "Последний источник", type: "string", readOnly: true,
      description: "Заполняется, только если человек вернулся из другого источника" },
    { name: "heardFrom", title: "Откуда узнали (со слов пациента)", type: "string", readOnly: true,
      description: "Ответ в форме. Страховка на случай, когда метка потерялась" },

    { name: "consentAt", title: "Согласие на обработку данных", type: "datetime", readOnly: true },
    { name: "createdAt", title: "Получена", type: "datetime", readOnly: true },
    {
      // Цепочка статусов нужна, чтобы считать оплату блогерам за результат,
      // а не за заявку: видно, сколько обращений от каждого источника
      // дошло до консультации и до приезда.
      name: "status", title: "Статус", type: "string",
      options: { list: [
        { title: "Новая", value: "new" },
        { title: "Связались", value: "contacted" },
        { title: "Консультация назначена", value: "consultation" },
        { title: "Приехал на лечение", value: "arrived" },
        { title: "Отказ", value: "rejected" },
        { title: "Обработана", value: "done" },
      ] },
      initialValue: "new",
    },
    { name: "note", title: "Заметка координатора", type: "text", rows: 3 },
  ],
  orderings: [
    { name: "newest", title: "Сначала новые", by: [{ field: "createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", phone: "phone", createdAt: "createdAt", status: "status", utmSource: "utmSource" },
    prepare({ title, phone, createdAt, status, utmSource }) {
      const marks = { arrived: "★", done: "✓", rejected: "×", consultation: "•", contacted: "•" };
      const mark = marks[status] || "!";
      const when = createdAt ? new Date(createdAt).toLocaleString("ru-RU") : "";
      return {
        title: `${mark} ${title || "Без имени"}`,
        subtitle: [phone, utmSource && `от ${utmSource}`, when].filter(Boolean).join(" · "),
      };
    },
  },
};

export const partner = {
  name: "partner", title: "Партнёр / блогер", type: "document",
  description: "Короткие ссылки вида assuta.org/go/<адрес> с метками источника",
  fields: [
    { name: "title", title: "Имя", type: "string",
      description: "Как зовут блогера или называется площадка. Видно только здесь." },
    { name: "slug", title: "Адрес ссылки", type: "slug", options: { source: "title" },
      description: "Латиницей, без пробелов. Ссылка получится assuta.org/go/<адрес>" },
    { name: "utmSource", title: "Код источника", type: "string",
      description: "Попадёт в заявку. Если пусто — берётся адрес ссылки" },
    { name: "utmMedium", title: "Канал", type: "string",
      description: "blogger, stories, reels. Если пусто — blogger" },
    { name: "utmCampaign", title: "Кампания", type: "string",
      description: "Например october_oncology. Можно менять — ссылка у блогера не меняется" },
    { name: "utmContent", title: "Конкретный пост", type: "string" },
    { name: "target", title: "Куда вести", type: "string",
      description: "Путь на сайте, например /departments/oncology. Пусто — на главную" },
    { name: "active", title: "Ссылка работает", type: "boolean", initialValue: true,
      description: "Выключенная ссылка просто уводит на главную без метки" },
  ],
  preview: {
    select: { title: "title", slug: "slug.current", campaign: "utmCampaign", active: "active" },
    prepare({ title, slug, campaign, active }) {
      return {
        title: `${active === false ? "× " : ""}${title || slug || "Без имени"}`,
        subtitle: [slug && `/go/${slug}`, campaign].filter(Boolean).join(" · "),
      };
    },
  },
};

export const schemaTypes = [doctor, disease, review, news, page, lead, partner];
