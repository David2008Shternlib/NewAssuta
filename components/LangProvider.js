"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LangCtx = createContext({ lang: "ru", setLang: () => {} });

// Единственный признак языка — адрес страницы. Английская версия живёт
// на /en/*, всё остальное русское.
const langFromPath = (pathname) =>
  pathname === "/en" || (typeof pathname === "string" && pathname.startsWith("/en/")) ? "en" : "ru";

export function LangProvider({ children, initialLang = "ru" }) {
  const pathname = usePathname();

  // Стартуем с того, что отдал сервер (он читает заголовок x-locale),
  // иначе первая отрисовка на клиенте разойдётся с разметкой с сервера.
  const [lang, setLang] = useState(initialLang);

  // Дальше язык ведём по адресу, а не по заголовку запроса. Причина:
  // корневой layout при переходах внутри сайта не перерисовывается — Next
  // переиспользует его, — поэтому initialLang остаётся тем, каким был при
  // самой первой загрузке, и язык «залипал». Плюс страницы отдаются из кэша,
  // собранного без заголовка, и там язык тоже был бы неверным.
  useEffect(() => {
    if (!pathname) return;
    setLang(langFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
