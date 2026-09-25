/**
 * Заливает переводы из cms/i18n-translated.json обратно в Sanity.
 *
 * Главное правило то же, что и у скрипта имён: уже заполненные вручную
 * английские поля НИКОГДА не перезаписываются. Клиника может править переводы
 * в Studio — повторный запуск их не тронет. Флаг --force снимает эту защиту,
 * если нужно намеренно перезалить.
 *
 * Запуск из корня проекта:
 *   node cms/i18n-import.mjs --dry     показать, что будет записано
 *   node cms/i18n-import.mjs           записать
 *   node cms/i18n-import.mjs --force   перезаписать даже заполненные поля
 *
 * Токен берётся только из окружения, в коде его нет:
 *   SANITY_API_TOKEN=... node cms/i18n-import.mjs
 *
 * Файл можно заливать по частям: скрипт обрабатывает ровно то, что в нём есть.
 */
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token && !DRY) {
  console.error("Нет SANITY_API_TOKEN. Запусти с токеном или добавь --dry для примерки без записи.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// Русское поле → английское, по типу документа
const TARGET = {
  disease: { title: "titleEn", excerpt: "excerptEn", bodyHtml: "bodyHtmlEn" },
  doctor: { specialization: "specializationEn", bodyHtml: "bodyHtmlEn" },
  news: { title: "titleEn", excerpt: "excerptEn", bodyHtml: "bodyHtmlEn" },
};

const filled = (v) => typeof v === "string" && v.trim().length > 0;

const run = async () => {
  const file = path.join("cms", "i18n-translated.json");
  if (!fs.existsSync(file)) {
    console.error(`Нет файла ${file}. Сначала переводы должны попасть в него.`);
    process.exit(1);
  }

  const items = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(items)) {
    console.error("Ожидался массив записей.");
    process.exit(1);
  }
  console.log(`Записей в файле: ${items.length}`);

  // Текущее состояние английских полей — чтобы не затирать ручную правку
  const ids = items.map((i) => i._id);
  const existing = await client.fetch(
    `*[_id in $ids]{ _id, _type, titleEn, excerptEn, bodyHtmlEn, specializationEn }`,
    { ids }
  );
  const byId = Object.fromEntries(existing.map((d) => [d._id, d]));

  let patched = 0;
  let skipped = 0;
  let missing = 0;
  const problems = [];
  let tx = client.transaction();
  let inTx = 0;

  const commit = async () => {
    if (!inTx) return;
    if (!DRY) await tx.commit({ visibility: "async" });
    tx = client.transaction();
    inTx = 0;
  };

  for (const item of items) {
    const current = byId[item._id];
    if (!current) {
      missing++;
      problems.push(`не найден в CMS: ${item.slug || item._id}`);
      continue;
    }

    const map = TARGET[current._type];
    if (!map) continue;

    const set = {};
    for (const [ru, en] of Object.entries(map)) {
      const value = item.fields?.[ru];
      if (!filled(value)) continue;
      if (!FORCE && filled(current[en])) {
        skipped++;
        continue;
      }
      set[en] = value;
    }

    if (!Object.keys(set).length) continue;

    if (DRY) {
      const preview = Object.entries(set)
        .map(([k, v]) => `${k} (${v.length} зн.)`)
        .join(", ");
      console.log(`  ${item.slug || item._id}: ${preview}`);
    } else {
      tx = tx.patch(item._id, (p) => p.set(set));
      inTx++;
    }
    patched++;

    if (inTx >= 50) await commit();
  }
  await commit();

  console.log("");
  console.log(DRY ? "Примерка, ничего не записано." : "Записано.");
  console.log(`Документов обновлено: ${patched}`);
  console.log(`Полей пропущено (уже заполнены вручную): ${skipped}`);
  if (missing) {
    console.log(`Не найдено в CMS: ${missing}`);
    problems.slice(0, 10).forEach((p) => console.log(`  ${p}`));
  }
};

run().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
