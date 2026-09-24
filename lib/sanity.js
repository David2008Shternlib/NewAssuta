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
  return normalizeHeadings(html)
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

const t = (v) => decodeEntities(v);

const mapDoctor = (d) => (d ? { ...d, name: t(d.name), spec: t(d.spec), dept: t(d.dept), bodyHtml: cleanHtml(d.bodyHtml) } : d);
const mapDisease = (d) => (d ? { ...d, title: t(d.title), category: t(d.category), excerpt: t(d.excerpt), bodyHtml: cleanHtml(d.bodyHtml) } : d);
const mapNews = (n) => (n ? { ...n, title: t(n.title), excerpt: t(n.excerpt), bodyHtml: cleanHtml(n.bodyHtml) } : n);
const mapReview = (r) => (r ? { ...r, author: t(r.author), country: t(r.country), text: t(r.text) } : r);
const many = (fn) => (list) => (Array.isArray(list) ? list.map(fn).filter(Boolean) : []);

/* ─────────── Запросы ─────────── */

const DOC = `{ "slug": slug.current, name, "spec": coalesce(specialization, department), "dept": department, "photo": photo.asset->url, bodyHtml }`;
const DIS = `{ "slug": slug.current, title, category, excerpt, "image": image.asset->url, bodyHtml }`;
const NEWS = `{ "slug": slug.current, title, excerpt, "image": image.asset->url, date, bodyHtml }`;

export async function getAllDoctors() {
  return sanity.fetch(`*[_type=="doctor" && defined(slug.current)]|order(name asc)${DOC}`).then(many(mapDoctor));
}
export async function getDoctor(slug) {
  return sanity.fetch(`*[_type=="doctor" && slug.current==$slug][0]${DOC}`, { slug }).then(mapDoctor);
}
export async function getDoctorsByCategory(category) {
  return sanity.fetch(`*[_type=="doctor" && department==$c && defined(slug.current)][0...3]${DOC}`, { c: category || "" }).then(many(mapDoctor));
}
export async function getAllDiseases() {
  return sanity.fetch(`*[_type=="disease" && defined(slug.current)]|order(category asc, title asc)${DIS}`).then(many(mapDisease));
}
export async function getDisease(slug) {
  return sanity.fetch(`*[_type=="disease" && slug.current==$slug][0]${DIS}`, { slug }).then(mapDisease);
}
export async function getReviews() {
  return sanity.fetch(`*[_type=="review"]|order(date desc){ "id": _id, author, country, rating, text }`).then(many(mapReview));
}
export async function getAllNews() {
  return sanity.fetch(`*[_type=="news" && defined(slug.current)]|order(date desc)${NEWS}`).then(many(mapNews));
}
export async function getNews(slug) {
  return sanity.fetch(`*[_type=="news" && slug.current==$slug][0]${NEWS}`, { slug }).then(mapNews);
}
