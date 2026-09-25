/**
 * Выгружает русские тексты из Sanity в файл для перевода.
 *
 * Ничего не меняет в CMS — только читает. Токен не нужен, если датасет
 * открыт на чтение; если закрыт, добавь SANITY_API_TOKEN с правами на чтение.
 *
 * Запуск из корня проекта:
 *   node cms/i18n-export.mjs
 *
 * Результат: cms/i18n-source.json — по одной записи на документ, с полями,
 * которым нужен перевод. Уже переведённые поля помечаются, чтобы повторная
 * выгрузка не заставляла переводить одно и то же дважды.
 */
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_API_TOKEN || undefined,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Какие поля переводим у каждого типа: русское поле → английское
const FIELDS = {
  disease: { title: "titleEn", excerpt: "excerptEn", bodyHtml: "bodyHtmlEn" },
  doctor: { specialization: "specializationEn", bodyHtml: "bodyHtmlEn" },
  news: { title: "titleEn", excerpt: "excerptEn", bodyHtml: "bodyHtmlEn" },
};

const QUERIES = {
  disease: `*[_type=="disease" && defined(slug.current)]|order(title asc){ _id, _type, "slug": slug.current, title, titleEn, excerpt, excerptEn, bodyHtml, bodyHtmlEn }`,
  doctor: `*[_type=="doctor" && defined(slug.current)]|order(name asc){ _id, _type, "slug": slug.current, name, specialization, specializationEn, bodyHtml, bodyHtmlEn }`,
  news: `*[_type=="news" && defined(slug.current)]|order(date desc){ _id, _type, "slug": slug.current, title, titleEn, excerpt, excerptEn, bodyHtml, bodyHtmlEn }`,
};

const filled = (v) => typeof v === "string" && v.trim().length > 0;

const run = async () => {
  const out = [];
  let charsTotal = 0;
  let charsDone = 0;

  for (const [type, query] of Object.entries(QUERIES)) {
    const docs = await client.fetch(query);
    console.log(`${type}: ${docs.length}`);

    for (const doc of docs) {
      const fields = {};
      for (const [ru, en] of Object.entries(FIELDS[type])) {
        if (!filled(doc[ru])) continue;
        charsTotal += doc[ru].length;
        if (filled(doc[en])) {
          charsDone += doc[ru].length; // перевод уже есть — второй раз не трогаем
          continue;
        }
        fields[ru] = doc[ru];
      }
      if (Object.keys(fields).length) {
        out.push({ _id: doc._id, _type: doc._type, slug: doc.slug, fields });
      }
    }
  }

  const file = path.join("cms", "i18n-source.json");
  fs.writeFileSync(file, JSON.stringify(out, null, 2), "utf8");

  const left = charsTotal - charsDone;
  console.log("");
  console.log(`Документов к переводу: ${out.length}`);
  console.log(`Знаков всего: ${charsTotal.toLocaleString("ru-RU")}`);
  console.log(`Уже переведено: ${charsDone.toLocaleString("ru-RU")}`);
  console.log(`Осталось: ${left.toLocaleString("ru-RU")}`);
  console.log(`Файл: ${file}`);
};

run().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
