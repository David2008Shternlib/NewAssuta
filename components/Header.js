"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { nav, site } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "./LangProvider";
import ThemeToggle from "./ThemeToggle";

const PhoneIcon = ({ className = "" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Header() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((prev) => (prev ? window.scrollY > 15 : window.scrollY > 70));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // переключение языка = навигация между / и /en/*
  const switchLang = (l) => {
    const bare = (pathname || "/").replace(/^\/en(?=\/|$)/, "") || "/";
    const target = l === "en" ? (bare === "/" ? "/en" : `/en${bare}`) : bare;
    setLang(l);
    router.push(target);
  };

  const LangSwitch = ({ className = "" }) => (
    <div className={`flex flex-none items-center rounded-pill border border-line p-0.5 text-xs font-bold ${className}`}>
      {["ru", "en"].map((l) => (
        <button key={l} onClick={() => switchLang(l)}
          className={`rounded-pill px-2.5 py-1 uppercase transition-colors ${lang === l ? "bg-brand-blue text-white" : "text-muted hover:text-brand-blue"}`}>
          {l}
        </button>
      ))}
    </div>
  );

  const homeHref = lang === "en" ? "/en" : "/";

  return (
    <header className="sticky top-0 z-50 bg-page/95 backdrop-blur">
      {/* Верхняя полоса — сворачивается при скролле */}
      <div className={`overflow-hidden border-line bg-surface2 transition-all duration-300 hidden md:block ${scrolled ? "max-h-0 border-b-0 opacity-0" : "max-h-16 border-b opacity-100"}`}>
        <div className="wrap flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-5">
            <span className="text-muted">{t(lang, "headerTagline")}</span>
            <Link href={lang === "en" ? "/en/about" : "/about"} className="font-semibold text-body hover:text-brand-blue dark:hover:text-accent">{t(lang, "aboutTitle")}</Link>
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
        <Link href={homeHref} className="flex-none">
          <img src={site.logo} alt="Assuta" className={`w-auto transition-all dark:brightness-0 dark:invert ${scrolled ? "h-7" : "h-9"}`} />
        </Link>

        <nav className="hidden min-w-0 items-center xl:flex xl:gap-3.5 2xl:gap-6">
          {nav.map((n) => (
            <Link key={n.href} href={lang === "en" ? `/en${n.href}` : n.href} className="whitespace-nowrap text-[13px] font-semibold text-body transition-colors hover:text-brand-green 2xl:text-sm">
              {pick(n.label, lang)}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-none items-center gap-2.5 xl:flex 2xl:gap-4">
          {/* до 2xl телефон показываем иконкой — номер целиком есть в верхней строке */}
          <a
            href={site.phones[0].href}
            aria-label={site.phones[0].value}
            title={site.phones[0].value}
            className="flex h-10 w-10 items-center justify-center gap-2 rounded-full text-brand-blue ring-1 ring-line transition-opacity hover:opacity-80 dark:text-accent 2xl:h-auto 2xl:w-auto 2xl:rounded-none 2xl:text-base 2xl:font-bold 2xl:ring-0"
          >
            <PhoneIcon />
            <span className="hidden whitespace-nowrap 2xl:inline">{site.phones[0].value}</span>
          </a>
          <a href="#request" className="btn-green whitespace-nowrap !px-4 !py-3 !text-xs 2xl:!px-7 2xl:!text-sm">{t(lang, "freeConsult")}</a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a href={site.phones[0].href} aria-label="Call" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white shadow-sm">
            <PhoneIcon />
          </a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center">
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-7 bg-brand-blue transition-all duration-300 dark:bg-accent ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-7 bg-brand-blue transition-all duration-300 dark:bg-accent ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-7 bg-brand-blue transition-all duration-300 dark:bg-accent ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`overflow-hidden bg-page transition-all duration-300 ease-out xl:hidden ${open ? "max-h-[560px] border-t border-line opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="wrap flex flex-col py-4">
          {nav.map((n) => (
            <Link key={n.href} href={lang === "en" ? `/en${n.href}` : n.href} onClick={() => setOpen(false)} className="border-b border-line/60 py-3 font-semibold text-body">
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
