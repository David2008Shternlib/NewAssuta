/**
 * Собирает cms/i18n-translated.json из отдельных партий cms/i18n-batches/*.json.
 *
 * Переводы делаются порциями, каждая партия — отдельный файл. Так проще
 * дописывать и видеть, что уже готово, чем править один огромный файл.
 *
 * Запуск из корня проекта:
 *   node cms/i18n-merge.mjs
 *
 * Если один документ встретился в нескольких партиях, берётся последняя.
 */
import fs from "fs";
import path from "path";

const dir = path.join("cms", "i18n-batches");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();

const byId = new Map();
let batches = 0;

for (const f of files) {
  const items = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  if (!Array.isArray(items)) throw new Error(`${f}: ожидался массив`);
  for (const it of items) {
    if (!it._id || !it.fields) throw new Error(`${f}: запись без _id или fields`);
    byId.set(it._id, it);
  }
  batches++;
  console.log(`${f}: ${items.length}`);
}

const out = [...byId.values()];
fs.writeFileSync(path.join("cms", "i18n-translated.json"), JSON.stringify(out, null, 2), "utf8");

const chars = out.reduce((s, i) => s + Object.values(i.fields).reduce((a, v) => a + v.length, 0), 0);
const byType = {};
for (const i of out) byType[i._type] = (byType[i._type] || 0) + 1;

console.log("");
console.log(`Партий: ${batches}`);
console.log(`Документов: ${out.length}`, byType);
console.log(`Знаков перевода: ${chars.toLocaleString("ru-RU")}`);
