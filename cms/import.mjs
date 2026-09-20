/**
 * Импорт контента с оригинала (WordPress REST API) в Sanity.
 * Тянет: врачей (doctor), болезни (bolezni), отзывы (reviews), новости (news).
 * Запуск: см. cms/README.md
 *   SANITY_API_TOKEN=... node cms/import.mjs
 */
import { createClient } from "@sanity/client";

const WP = "https://assuta.org/wp-json/wp/v2";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Нет SANITY_API_TOKEN. Впиши токен в .env.local и запусти через dotenv, либо задай в окружении.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

const strip = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function fetchAll(rest) {
  const out = [];
  for (let page = 1; page < 50; page++) {
    const url = `${WP}/${rest}?per_page=100&page=${page}&_embed=1`;
    const res = await fetch(url);
    if (res.status === 400 || res.status === 404) break; // страниц больше нет
    if (!res.ok) { console.warn(`  ${rest} page ${page}: HTTP ${res.status}`); break; }
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(...batch);
    const total = Number(res.headers.get("x-wp-totalpages") || 0);
    if (total && page >= total) break;
  }
  return out;
}

function term(item, taxonomy) {
  const groups = item._embedded?.["wp:term"] || [];
  for (const g of groups) for (const term of g) if (term.taxonomy === taxonomy) return term.name;
  return "";
}

async function uploadImage(item) {
  try {
    const src = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (!src) return null;
    const res = await fetch(src);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, { filename: src.split("/").pop() });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch { return null; }
}

async function run() {
  const summary = {};

  // ВРАЧИ
  const doctors = await fetchAll("doctor");
  console.log(`Врачи: ${doctors.length}`);
  for (const d of doctors) {
    const photo = await uploadImage(d);
    await client.createOrReplace({
      _id: `doctor-${d.slug}`,
      _type: "doctor",
      name: strip(d.title?.rendered),
      slug: { _type: "slug", current: d.slug },
      department: term(d, "direction"),
      bodyHtml: d.content?.rendered || "",
      sourceUrl: d.link,
      ...(photo ? { photo } : {}),
    });
  }
  summary.doctors = doctors.length;

  // БОЛЕЗНИ
  const diseases = await fetchAll("bolezni");
  console.log(`Болезни: ${diseases.length}`);
  for (const b of diseases) {
    const image = await uploadImage(b);
    await client.createOrReplace({
      _id: `disease-${b.slug}`,
      _type: "disease",
      title: strip(b.title?.rendered),
      slug: { _type: "slug", current: b.slug },
      category: term(b, "cat_bol"),
      excerpt: strip(b.excerpt?.rendered).slice(0, 300),
      bodyHtml: b.content?.rendered || "",
      sourceUrl: b.link,
      ...(image ? { image } : {}),
    });
  }
  summary.diseases = diseases.length;

  // ОТЗЫВЫ
  const reviews = await fetchAll("reviews");
  console.log(`Отзывы: ${reviews.length}`);
  for (const r of reviews) {
    await client.createOrReplace({
      _id: `review-${r.id}`,
      _type: "review",
      author: strip(r.title?.rendered) || "Пациент",
      text: strip(r.content?.rendered),
      date: r.date,
    });
  }
  summary.reviews = reviews.length;

  // НОВОСТИ
  const news = await fetchAll("news");
  console.log(`Новости: ${news.length}`);
  for (const n of news) {
    const image = await uploadImage(n);
    await client.createOrReplace({
      _id: `news-${n.slug}`,
      _type: "news",
      title: strip(n.title?.rendered),
      slug: { _type: "slug", current: n.slug },
      excerpt: strip(n.excerpt?.rendered).slice(0, 300),
      bodyHtml: n.content?.rendered || "",
      date: n.date,
      sourceUrl: n.link,
      ...(image ? { image } : {}),
    });
  }
  summary.news = news.length;

  console.log("\nГОТОВО. Импортировано:", summary);
}

run().catch((e) => { console.error(e); process.exit(1); });
