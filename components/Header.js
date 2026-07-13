"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { nav, site } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "./LangProvider";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Гистерезис: сворачиваем после 70px, разворачиваем только ниже 15px —
    // это убирает дрожание, когда скролл замирает у самого порога.
    const onScroll = () => setScrolled((prev) => (prev ? window.scrollY > 15 : window.scrollY > 70));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitch = ({ className = "" }) => (
    <div className={`flex flex-none items-center rounded-pill border border-line p-0.5 text-xs font-bold ${className}`}>
      {["ru", "en"].map((l) => (
        <button key={l} onClick={() => setLang(l)}
          className={`rounded-pill px-2.5 py-1 uppercase transition-colors ${lang === l ? "bg-brand-blue text-white" : "text-muted hover:text-brand-blue"}`}>
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-page/95 backdrop-blur">
      {/* Верхняя полоса — сворачивается при скролле */}
      <div className={`overflow-hidden border-line bg-surface2 transition-all duration-300 hidden md:block ${scrolled ? "max-h-0 border-b-0 opacity-0" : "max-h-16 border-b opacity-100"}`}>
        <div className="wrap flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-5">
            <span className="text-muted">{t(lang, "headerTagline")}</span>
            <Link href="/about" className="font-semibold text-body hover:text-brand-blue dark:hover:text-accent">{t(lang, "aboutTitle")}</Link>
          </div>
          <div className="flex items-center gap-5">
            {site.phones.map((p) => (
              <a key={p.value} href={p.href} className="flex items-center gap-1.5 font-semibold text-body hover:text-brand-blue">
                <span>{p.flag}</span>{p.value}
              </a>
            ))}
            <ThemeToggle />
            <LangSwitch />
          </div>
        </div>
      </div>

      {/* Основная строка */}
      <div className={`wrap flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
        <Link href="/" className="flex-none">
          <img src={site.logo} alt="Assuta" className={`w-auto transition-all dark:brightness-0 dark:invert ${scrolled ? "h-7" : "h-9"}`} />
        </Link>

        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap text-sm font-semibold text-body transition-colors hover:text-brand-green">
              {pick(n.label, lang)}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-none items-center gap-3 lg:flex">
          <a href="#request" className="btn-green whitespace-nowrap !px-5">{t(lang, "freeConsult")}</a>
        </div>

        <button className="lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-7 bg-brand-blue transition-all duration-300 dark:bg-accent ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-7 bg-brand-blue transition-all duration-300 dark:bg-accent ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-7 bg-brand-blue transition-all duration-300 dark:bg-accent ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Мобильное меню — всегда в DOM, плавно выезжает по высоте */}
      <div className={`overflow-hidden bg-page transition-all duration-300 ease-out lg:hidden ${open ? "max-h-[560px] border-t border-line opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="wrap flex flex-col py-4">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line/60 py-3 font-semibold text-body">
              {pick(n.label, lang)}
            </Link>
          ))}
          <a href="#request" onClick={() => setOpen(false)} className="btn-green mt-4">{t(lang, "freeConsult")}</a>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col gap-1 text-sm">
              {site.phones.map((p) => (
                <a key={p.value} href={p.href} className="font-semibold text-brand-blue dark:text-accent">{p.flag} {p.value}</a>
              ))}
            </div>
            <div className="flex items-center gap-2"><ThemeToggle /><LangSwitch /></div>
          </div>
        </div>
      </div>
    </header>
  );
}
