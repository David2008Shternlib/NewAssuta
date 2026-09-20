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
    { name: "department", title: "Направление", type: "string" },
    { name: "photo", title: "Фото", type: "image", options: { hotspot: true } },
    { name: "bodyHtml", title: "Описание (HTML с оригинала)", type: "text", rows: 12 },
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
    { name: "category", title: "Направление", type: "string" },
    { name: "excerpt", title: "Краткое описание", type: "text", rows: 3 },
    { name: "bodyHtml", title: "Текст статьи (HTML с оригинала)", type: "text", rows: 20 },
    { name: "image", title: "Изображение", type: "image", options: { hotspot: true } },
    { name: "sourceUrl", title: "Источник (старый URL)", type: "url" },
  ],
  preview: { select: { title: "title", subtitle: "category" } },
};

export const review = {
  name: "review", title: "Отзыв", type: "document",
  fields: [
    { name: "author", title: "Автор", type: "string" },
    { name: "country", title: "Страна", type: "string" },
    { name: "rating", title: "Оценка", type: "number" },
    { name: "text", title: "Текст", type: "text", rows: 5 },
    { name: "date", title: "Дата", type: "datetime" },
  ],
  preview: { select: { title: "author", subtitle: "country" } },
};

export const news = {
  name: "news", title: "Новость", type: "document",
  fields: [
    { name: "title", title: "Заголовок", type: "string" },
    { name: "slug", title: "Слаг", type: "slug", options: { source: "title" } },
    { name: "excerpt", title: "Анонс", type: "text", rows: 3 },
    { name: "bodyHtml", title: "Текст (HTML с оригинала)", type: "text", rows: 20 },
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

export const schemaTypes = [doctor, disease, review, news, page];
