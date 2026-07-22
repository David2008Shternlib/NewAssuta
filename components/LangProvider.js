"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangCtx = createContext({ lang: "en", setLang: () => {} });

export function LangProvider({ children, initialLang }) {
  const locked = initialLang === "en" || initialLang === "ru"; // задан маршрутом (/en)
  const [lang, setLang] = useState(initialLang || "en");

  useEffect(() => {
    if (locked) return; // на /en язык фиксирован сервером
    const saved = typeof window !== "undefined" && localStorage.getItem("lang");
    if (saved === "en" || saved === "ru") { setLang(saved); return; }
    const nav = (navigator.language || (navigator.languages && navigator.languages[0]) || "en").toLowerCase();
    setLang(nav.startsWith("ru") ? "ru" : "en");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!locked) { try { localStorage.setItem("lang", lang); } catch (e) {} }
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
