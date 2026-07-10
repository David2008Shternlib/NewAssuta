"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangCtx = createContext({ lang: "ru", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    const s = typeof window !== "undefined" && localStorage.getItem("lang");
    if (s === "en" || s === "ru") setLang(s);
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
