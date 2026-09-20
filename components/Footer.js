"use client";
import Link from "next/link";
import { site, nav, departments } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "./LangProvider";

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-wrap rounded-t-xl2 bg-surface2 px-5 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src={site.logo} alt="Assuta" className="mb-4 h-10 w-auto dark:brightness-0 dark:invert" />
            <p className="text-sm text-muted">{t(lang, "headerTagline")}. {lang === "en" ? `Founded in ${site.founded}.` : `Основана в ${site.founded} году.`}</p>
            <a href={site.mapUrl} target="_blank" rel="noreferrer" className="mt-4 block text-sm text-muted hover:text-brand-blue dark:hover:text-accent">
              {pick(site.address, lang)}
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-title">{lang === "en" ? "Clinic" : "Клиника"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted hover:text-brand-blue dark:hover:text-accent">{t(lang, "aboutTitle")}</Link></li>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="text-muted hover:text-brand-blue dark:hover:text-accent">{pick(n.label, lang)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-title">{lang === "en" ? "Areas" : "Направления"}</h4>
            <ul className="space-y-2 text-sm">
              {departments.slice(0, 7).map((d) => (
                <li key={d.slug}><Link href="/departments" className="text-muted hover:text-brand-blue dark:hover:text-accent">{pick(d.title, lang)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-title">{lang === "en" ? "Contact us" : "Связаться"}</h4>
            <ul className="space-y-2 text-sm">
              {site.phones.map((p) => (
                <li key={p.value}><a href={p.href} className="font-semibold text-body hover:text-brand-blue dark:hover:text-accent">{p.flag} {p.value}</a></li>
              ))}
              {site.messengers.map((m) => (
                <li key={m.label}><a href={m.href} className="text-brand-green hover:underline">{m.label}: {m.value}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-xs text-muted/70">
          © Assuta, {new Date().getFullYear()}. {lang === "en" ? "Demo version of the website." : "Демо-версия сайта."}
        </div>
      </div>
    </footer>
  );
}
