"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";

// Ссылка, которая сама держится выбранного языка.
// На английской версии внутренние адреса получают префикс /en,
// иначе клик по карточке уводил посетителя обратно на русские страницы.
export default function LocaleLink({ href, ...props }) {
  const { lang } = useLang();

  let target = href;
  if (lang === "en" && typeof href === "string" && href.startsWith("/") && !/^\/en(\/|$)/.test(href)) {
    target = href === "/" ? "/en" : `/en${href}`;
  }

  return <Link href={target} {...props} />;
}
