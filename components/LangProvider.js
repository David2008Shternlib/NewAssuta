"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangCtx = createContext({ lang: "en", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // 1) сохранённый ручной выбор имеет приоритет
    const saved = typeof window !== "undefined" && localStorage.getItem("lang");
    if (saved === "en" || saved === "ru") {
      setLang(saved);
      return;
    }
    // 2) иначе — по языку устройства: русский → ru, всё остальное → en
    const nav = (navigator.language || (navigator.languages && navigator.languages[0]) || "en").toLowerCase();
    setLang(nav.startsWith("ru") ? "ru" : "en");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
