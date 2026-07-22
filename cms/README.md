# CMS (Sanity) — импорт контента с оригинала

Здесь: схемы контента (`schemaTypes.js`) и скрипт импорта (`import.mjs`),
который тянет всех **врачей, болезни, отзывы, новости** из WordPress-API
старого сайта и заливает в твой проект Sanity (`ogu6ewxe`).

## 0. Что нужно один раз
- Установить **Node.js LTS**: https://nodejs.org (кнопка LTS).
- Иметь **новый API-токен Sanity** (с правом Editor). В чат его не вставляем.

## 1. Создать Sanity Studio (редактор для клиента)
В отдельной папке (не в этом репозитории):
```bash
npm create sanity@latest -- --project ogu6ewxe --dataset production
```
Выбрать: **Clean project with no predefined schemas**, TypeScript — No.
Затем скопировать `schemaTypes.js` из этой папки в студию и подключить:
в `sanity.config.js` → `schema: { types: schemaTypes }` (импортом из файла).
Проверить локально: `npm run dev` (студия на http://localhost:3333).
Опубликовать редактор для клиента: `npx sanity deploy` → адрес вида `assuta.sanity.studio`.

## 2. Запустить импорт (заливает контент в Sanity)
В КОРНЕ этого репозитория:
```bash
npm install
# создать .env.local (он в .gitignore) и вписать токен:
#   SANITY_API_TOKEN=твой_новый_токен
node --env-file=.env.local cms/import.mjs
```
Скрипт напечатает, сколько врачей/болезней/отзывов/новостей залито.
Повторный запуск безопасен — документы обновляются (createOrReplace), дубликатов нет.

## 3. Проверить
Открой Sanity Studio (локально или задеплоенную) — там появятся все врачи,
болезни (с текстами и фото), отзывы, новости.

## Дальше (делаю я)
Подключу сайт к Sanity: серверные страницы будут брать данные из CMS,
клиент правит контент сам. Слаги/редиректы и двуязычие — по плану аудита.
