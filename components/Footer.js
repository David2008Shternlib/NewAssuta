"use client";
import Link from "@/components/LocaleLink";
import { site, nav, departments, operator } from "@/data/site";
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
            {/* Кто мы: аудит требует, чтобы оператор назывался оператором */}
            <p className="text-sm font-semibold text-body">{pick(operator.role, lang)}</p>
            <a href={site.mapUrl} target="_blank" rel="noreferrer" className="mt-4 block text-sm text-muted hover:text-brand-blue dark:hover:text-accent">
              {lang === "en" ? "Clinic address: " : "Адрес клиники: "}{pick(site.address, lang)}
            </a>
            {pick(operator.office, lang) && (
              <p className="mt-2 text-sm text-muted">
                {lang === "en" ? "Our office: " : "Наш офис: "}{pick(operator.office, lang)}
              </p>
            )}
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

        {/* Реквизиты оператора — то, что аудит называет главным сигналом доверия */}
        <div className="mt-10 space-y-2 border-t border-line pt-6 text-center text-xs leading-relaxed text-muted/80">
          <p>
            <span className="font-semibold text-muted">{operator.legalName}</span>
            {operator.registryNumber && (
              <>
                {lang === "en" ? ", company no. " : ", регистрационный номер "}
                {operator.registryNumber}
              </>
            )}
            {operator.registeredSince && (
              <>
                {lang === "en" ? ", registered since " : ", в реестре с "}
                {new Date(operator.registeredSince).toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU")}
              </>
            )}
          </p>

          {operator.license.number && (
            <p>
              {lang === "en" ? "Medical tourism agent registry no. " : "Запись в реестре агентов медицинского туризма № "}
              {operator.license.url ? (
                <a href={operator.license.url} target="_blank" rel="noreferrer" className="underline hover:text-brand-blue">{operator.license.number}</a>
              ) : operator.license.number}
            </p>
          )}

          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="underline hover:text-brand-blue dark:hover:text-accent">
              {lang === "en" ? "Privacy policy" : "Политика конфиденциальности"}
            </Link>
            {operator.email && <a href={`mailto:${operator.email}`} className="underline hover:text-brand-blue">{operator.email}</a>}
          </p>

          <p>© {operator.legalName}, {new Date().getFullYear()}. {lang === "en" ? "All rights reserved." : "Все права защищены."}</p>
        </div>
      </div>
    </footer>
  );
}
