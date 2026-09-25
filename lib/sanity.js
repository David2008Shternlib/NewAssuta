import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

/* ─────────── Очистка контента, приехавшего из WordPress ─────────── */

const NAMED = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  laquo: "«", raquo: "»", mdash: "—", ndash: "–", hellip: "…",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", bdquo: "„",
  deg: "°", plusmn: "±", times: "×", middot: "·", bull: "•", euro: "€",
};

// В текстовых полях (заголовки, отзывы) сущности вида &#171; выводились
// буква в букву. Раскрываем их, включая двойное экранирование &amp;#171;
function decodeEntities(value) {
  if (typeof value !== "string") return value;
  let out = value;
  for (let pass = 0; pass < 2; pass++) {
    out = out
      .replace(/&#(\d+);/g, (m, d) => {
        const code = Number(d);
        return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : m;
      })
      .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&([a-z]+);/gi, (m, n) => (NAMED[n.toLowerCase()] ?? m));
  }
  return out.replace(/\s{2,}/g, " ").trim();
}

// Заголовки в импорте идут как попало: после h1 страницы сразу h3 или h4.
// Аудит требует иерархию без пропусков, поэтому сдвигаем уровни так,
// чтобы самый крупный заголовок статьи стал h2 (h1 — это название страницы).
function normalizeHeadings(html) {
  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  if (!levels.length) return html;

  const top = Math.min(...levels);
  const shift = 2 - top; // приводим верхний уровень к h2
  if (shift === 0) return html;

  return html.replace(/<(\/?)h([1-6])([\s>])/gi, (m, slash, lvl, tail) => {
    const next = Math.min(6, Math.max(2, Number(lvl) + shift));
    return `<${slash}h${next}${tail}`;
  });
}

// Убираем мусор редактора WordPress: инлайновые стили, классы темы,
// пустые абзацы, обёртки span/font, цепочки переносов строк.
function cleanHtml(html) {
  if (typeof html !== "string") return html;
  return stripEmoji(normalizeHeadings(html))
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/\s(?:style|class|id|align|border|cellpadding|cellspacing|bgcolor)="[^"]*"/gi, "")
    .replace(/\s(?:width|height)="[^"]*"/gi, "")
    .replace(/<\/?(?:span|font)[^>]*>/gi, "")
    .replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/(?:&nbsp;)+/g, " ")
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br><br>")
    .trim();
}

// Эмодзи неуместны на медицинском сайте, а в текстах из WordPress они
// попадаются. Вырезаем их из всего, что приходит из CMS, чтобы не зависеть
// от того, что редактор вставит в карточку врача или новость.
// Знаки ® ™ © и типографику (° ± ×) не трогаем — это не эмодзи.
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu;

function stripEmoji(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(EMOJI, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([,.;:!?)»])/g, "$1") // не оставляем пробел перед знаком препинания
    .trim();
}

const t = (v) => stripEmoji(decodeEntities(v));

// bodyHtml приходит только в запросах для страниц-карточек. В списках его нет,
// и добавлять пустое поле не нужно — оно бы уехало на клиент вместе с данными.
const body = (v, key = "bodyHtml") => (v ? { [key]: cleanHtml(v) } : {});

const mapDoctor = (d) =>
  d ? { ...d, name: t(d.name), nameEn: t(d.nameEn), spec: t(d.spec), specEn: t(d.specEn), dept: t(d.dept), ...body(d.bodyHtml), ...body(d.bodyHtmlEn, "bodyHtmlEn") } : d;
const mapDisease = (d) =>
  d ? { ...d, title: t(d.title), titleEn: t(d.titleEn), category: t(d.category), excerpt: t(d.excerpt), excerptEn: t(d.excerptEn), ...body(d.bodyHtml), ...body(d.bodyHtmlEn, "bodyHtmlEn") } : d;
const mapNews = (n) =>
  n ? { ...n, title: t(n.title), titleEn: t(n.titleEn), excerpt: t(n.excerpt), excerptEn: t(n.excerptEn), ...body(n.bodyHtml), ...body(n.bodyHtmlEn, "bodyHtmlEn") } : n;
const mapReview = (r) => (r ? { ...r, author: t(r.author), country: t(r.country), text: t(r.text) } : r);
const many = (fn) => (list) => (Array.isArray(list) ? list.map(fn).filter(Boolean) : []);

/* ─────────── Запросы ─────────── */

const DOC = `{ "slug": slug.current, name, nameEn, "spec": coalesce(specialization, department), "specEn": specializationEn, "dept": department, "photo": photo.asset->url, bodyHtml, bodyHtmlEn }`;
const DIS = `{ "slug": slug.current, title, titleEn, category, excerpt, excerptEn, "image": image.asset->url, bodyHtml, bodyHtmlEn }`;
const NEWS = `{ "slug": slug.current, title, titleEn, excerpt, excerptEn, "image": image.asset->url, date, bodyHtml, bodyHtmlEn }`;

// Списки (каталог врачей, каталог болезней, лента новостей) показывают только
// карточки. Текст статьи там не выводится, но при обычной проекции он всё равно
// уезжал на клиент внутри данных страницы — это и давало основной вес.
const DOC_LIST = `{ "slug": slug.current, name, nameEn, "spec": coalesce(specialization, department), "specEn": specializationEn, "dept": department, "photo": photo.asset->url }`;
const DIS_LIST = `{ "slug": slug.current, title, titleEn, category, excerpt, excerptEn, "image": image.asset->url }`;
const NEWS_LIST = `{ "slug": slug.current, title, titleEn, excerpt, excerptEn, "image": image.asset->url, date }`;

export async function getAllDoctors() {
  return sanity.fetch(`*[_type=="doctor" && defined(slug.current)]|order(name asc)${DOC_LIST}`).then(many(mapDoctor));
}
export async function getDoctor(slug) {
  return sanity.fetch(`*[_type=="doctor" && slug.current==$slug][0]${DOC}`, { slug }).then(mapDoctor);
}
export async function getDoctorsByCategory(category) {
  return sanity.fetch(`*[_type=="doctor" && department==$c && defined(slug.current)][0...3]${DOC_LIST}`, { c: category || "" }).then(many(mapDoctor));
}

// Врачи направления: в CMS отделение названо по-русски во множественном числе
// («Онкологи», «Ортопеды»), поэтому передаём список подходящих названий.
export async function getDoctorsByDepartments(names = []) {
  if (!names.length) return [];
  return sanity
    .fetch(`*[_type=="doctor" && department in $names && defined(slug.current)]|order(name asc)${DOC_LIST}`, { names })
    .then(many(mapDoctor));
}

// Заболевания направления
export async function getDiseasesByCategories(cats = []) {
  if (!cats.length) return [];
  return sanity
    .fetch(`*[_type=="disease" && category in $cats && defined(slug.current)]|order(title asc)${DIS_LIST}`, { cats })
    .then(many(mapDisease));
}
export async function getAllDiseases() {
  return sanity.fetch(`*[_type=="disease" && defined(slug.current)]|order(category asc, title asc)${DIS_LIST}`).then(many(mapDisease));
}
export async function getDisease(slug) {
  return sanity.fetch(`*[_type=="disease" && slug.current==$slug][0]${DIS}`, { slug }).then(mapDisease);
}
export async function getReviews() {
  return sanity.fetch(`*[_type=="review"]|order(date desc){ "id": _id, author, country, rating, text }`).then(many(mapReview));
}
export async function getAllNews() {
  return sanity.fetch(`*[_type=="news" && defined(slug.current)]|order(date desc)${NEWS_LIST}`).then(many(mapNews));
}
// Поиск по сайту: врачи, заболевания, новости.
// GROQ ищет по началу слова, поэтому добавляем звёздочку: «рак» найдёт «рака».
export async function search(query) {
  const term = (query || "").trim().replace(/[*"'\\]/g, "");
  if (term.length < 2) return { doctors: [], diseases: [], news: [], total: 0 };

  const w = `${term}*`;
  const [doctors, diseases, news] = await Promise.all([
    sanity
      .fetch(
        `*[_type=="doctor" && defined(slug.current) && (name match $w || nameEn match $w || specialization match $w || department match $w)]|order(name asc)[0...40]${DOC_LIST}`,
        { w }
      )
      .then(many(mapDoctor)),
    sanity
      .fetch(
        `*[_type=="disease" && defined(slug.current) && (title match $w || category match $w || excerpt match $w)]|order(title asc)[0...60]${DIS_LIST}`,
        { w }
      )
      .then(many(mapDisease)),
    sanity
      .fetch(
        `*[_type=="news" && defined(slug.current) && (title match $w || excerpt match $w)]|order(date desc)[0...30]${NEWS_LIST}`,
        { w }
      )
      .then(many(mapNews)),
  ]);

  return { doctors, diseases, news, total: doctors.length + diseases.length + news.length };
}

export async function getNews(slug) {
  return sanity.fetch(`*[_type=="news" && slug.current==$slug][0]${NEWS}`, { slug }).then(mapNews);
}
