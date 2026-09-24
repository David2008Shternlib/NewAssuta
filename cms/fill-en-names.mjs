/**
 * Заполняет поле «Имя (EN)» у врачей, у которых оно пустое.
 *
 * Главное правило: уже заполненные вручную значения НИКОГДА не трогаются.
 * Клиника может править имена в Studio, повторный запуск их не перезапишет.
 *
 * Запуск (из корня проекта):
 *   node cms/fill-en-names.mjs --dry     показать, что будет записано, ничего не менять
 *   node cms/fill-en-names.mjs           записать
 *
 * Токен берётся только из окружения, в коде его нет:
 *   SANITY_API_TOKEN=... node cms/fill-en-names.mjs
 */
import fs from "fs";
import { createClient } from "@sanity/client";
import { translitName } from "./translit.mjs";

const DRY = process.argv.includes("--dry");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token && !DRY) {
  console.error("Нет SANITY_API_TOKEN. Запусти с токеном или добавь --dry для примерки без записи.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const run = async () => {
  const doctors = await client.fetch(
    `*[_type=="doctor" && defined(slug.current)]|order(name asc){ _id, "slug": slug.current, name, nameEn }`
  );

  console.log(`Врачей в CMS: ${doctors.length}`);

  const toFill = doctors.filter((d) => d.name && !(d.nameEn || "").trim());
  const already = doctors.length - toFill.length;
  console.log(`Уже заполнено вручную: ${already} (их не трогаем)`);
  console.log(`Будет заполнено: ${toFill.length}\n`);

  const rows = [];
  let exactCount = 0;

  for (const d of toFill) {
    const { value, exact } = translitName(d.name);
    if (exact) exactCount++;
    rows.push({ slug: d.slug, ru: d.name, en: value, exact });
  }

  // отчёт для проверки человеком
  const csv =
    "slug;имя (RU);имя (EN);по словарю\n" +
    rows.map((r) => `${r.slug};${r.ru};${r.en};${r.exact ? "да" : "нет"}`).join("\n");
  fs.writeFileSync("cms/en-names-review.csv", "﻿" + csv, "utf8");

  console.log("Примеры:");
  rows.slice(0, 12).forEach((r) => console.log(`  ${r.ru}  ->  ${r.en}${r.exact ? "" : "   (транслитерация, проверить)"}`));
  console.log(`\nПолностью по словарю: ${exactCount} из ${rows.length}`);
  console.log("Полный список для проверки: cms/en-names-review.csv");

  if (DRY) {
    console.log("\nРежим примерки: ничего не записано.");
    return;
  }

  let done = 0;
  for (const d of toFill) {
    const { value } = translitName(d.name);
    if (!value) continue;
    // patch, а не createOrReplace: меняем одно поле, остальное не трогаем
    await client.patch(d._id).set({ nameEn: value }).commit();
    done++;
    if (done % 25 === 0) console.log(`  записано ${done}/${toFill.length}`);
  }

  console.log(`\nГотово. Заполнено: ${done}.`);
  console.log("Имена можно править в Studio — повторный запуск их не перезапишет.");
};

run().catch((e) => {
  console.error("Ошибка:", e.message);
  process.exit(1);
});
