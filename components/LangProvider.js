"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangCtx = createContext({ lang: "ru", setLang: () => {} });

export function LangProvider({ children, initialLang = "ru" }) {
  const [lang, setLang] = useState(initialLang);

  // при переходе / <-> /en layout отдаёт новый initialLang — синхронизируем
  useEffect(() => { setLang(initialLang); }, [initialLang]);
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
