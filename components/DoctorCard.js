"use client";
import Link from "@/components/LocaleLink";
import { docName, pick, t, cms } from "@/data/i18n";
import { cmsLabel } from "@/data/site";
import { useLang } from "./LangProvider";

export default function DoctorCard({ doc, caption }) {
  const { lang } = useLang();
  const name = docName(doc, lang);
  const subtitle = caption || cmsLabel(cms(doc, "spec", lang), lang);
  return (
    <Link href={`/doctors/${doc.slug}`} className="card card-hover group flex h-full flex-col items-center p-6 text-center">
      <div className="mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-line bg-surface2">
        {doc.photo ? (
          <img src={doc.photo} alt={name} className="h-full w-full scale-110 object-cover" />
        ) : (
          <span className="text-4xl font-bold text-brand-blue/30">{name.split(" ").slice(-1)[0]?.[0] || "A"}</span>
        )}
      </div>
      {/* Фиксированная высота под две строки: имена и специальности разной
          длины, и без неё подписи в соседних карточках стоят на разной высоте. */}
      <h3 className="mb-1 flex min-h-[3.25rem] items-center break-words text-lg font-bold leading-snug text-body">{name}</h3>
      <p className="mb-4 min-h-[2.5rem] break-words text-sm leading-snug text-muted">{subtitle}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue dark:group-hover:text-accent">
        {t(lang, "more")}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
