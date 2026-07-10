"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-card" : ""}`}>
      {/* Верхняя полоса с телефонами */}
      <div className="hidden border-b border-brand-blue/10 bg-brand-bg2 md:block">
        <div className="wrap flex items-center justify-between py-2 text-xs">
          <span className="text-brand-ink/60">{site.tagline}</span>
          <div className="flex items-center gap-5">
            {site.phones.map((p) => (
              <a key={p.value} href={p.href} className="flex items-center gap-1.5 font-semibold text-brand-ink hover:text-brand-blue">
                <span>{p.flag}</span>{p.value}
              </a>
            ))}
            <span className="ml-2 flex items-center gap-1 rounded-pill border border-brand-blue/15 px-2 py-0.5 font-semibold">
              <span className="text-brand-blue">RU</span>
              <span className="text-brand-ink/40">/ EN</span>
            </span>
          </div>
        </div>
      </div>

      {/* Основная строка */}
      <div className="wrap flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src={site.logo} alt="Assuta" className="h-9 w-auto" />
          <span className="hidden text-xs font-semibold text-brand-dark sm:block">
            Клиника<br />в Израиле
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-semibold text-brand-ink transition-colors hover:text-brand-green">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#request" className="btn-green">Бесплатная консультация</a>
        </div>

        <button className="lg:hidden" aria-label="Меню" onClick={() => setOpen((v) => !v)}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-7 bg-brand-blue transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-7 bg-brand-blue transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-7 bg-brand-blue transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div className="border-t border-brand-blue/10 bg-white lg:hidden">
          <div className="wrap flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-brand-blue/5 py-3 font-semibold text-brand-ink">
                {n.label}
              </Link>
            ))}
            <a href="#request" onClick={() => setOpen(false)} className="btn-green mt-4">Бесплатная консультация</a>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {site.phones.map((p) => (
                <a key={p.value} href={p.href} className="font-semibold text-brand-blue">{p.flag} {p.value}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
