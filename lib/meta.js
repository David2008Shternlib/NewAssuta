import { headers } from "next/headers";

// Язык запроса. Проставляется в middleware для адресов /en/*.
export const currentLocale = () => (headers().get("x-locale") === "en" ? "en" : "ru");

/**
 * Заголовок и описание страницы на языке запроса.
 *
 * Раньше эти подписи были одной русской константой на файл, поэтому на
 * английской версии во вкладке браузера и в превью ссылки оставалось
 * «Меланома — лечение в Израиле», хотя сама страница была английской.
 *
 * Разметка schema.org намеренно остаётся русской: она адресована поисковикам,
 * а английская версия закрыта от индексации (X-Robots-Tag в middleware).
 */
export function pageMeta({ path, ru, en, extra = {} }) {
  const m = currentLocale() === "en" ? en : ru;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path },
    openGraph: { title: `${m.title} | Assuta`, description: m.description, url: path },
    ...extra,
  };
}
