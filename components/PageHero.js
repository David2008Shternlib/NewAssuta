"use client";
import Link from "next/link";
import Reveal from "./Reveal";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";

export default function PageHero({ title, subtitle, crumb }) {
  const { lang } = useLang();
  return (
    <section className="border-b border-line bg-surface2 py-14">
      <div className="wrap">
        <Reveal>
          <nav className="mb-4 text-sm text-muted/70">
            <Link href="/" className="hover:text-brand-blue dark:hover:text-accent">{t(lang, "home")}</Link>
            {crumb && <> / <span className="text-brand-green">{crumb}</span></>}
          </nav>
          <h1 className="section-title text-3xl md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
