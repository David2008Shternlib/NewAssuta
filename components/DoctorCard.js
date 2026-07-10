"use client";
import Link from "next/link";
import { pick, t } from "@/data/i18n";
import { useLang } from "./LangProvider";

export default function DoctorCard({ doc }) {
  const { lang } = useLang();
  const name = pick(doc.name, lang);
  return (
    <Link href={`/doctors/${doc.slug}`} className="card card-hover group flex h-full flex-col items-center p-6 text-center">
      <div className="mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-line bg-surface2">
        {doc.photo ? (
          <img src={doc.photo} alt={name} className="h-full w-full scale-110 object-cover" />
        ) : (
          <span className="text-4xl font-bold text-brand-blue/30">{name.split(" ").slice(-1)[0]?.[0] || "A"}</span>
        )}
      </div>
      <h3 className="mb-1 break-words text-lg font-bold text-body">{name}</h3>
      <p className="mb-4 break-words text-sm text-muted">{pick(doc.spec, lang)}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue dark:group-hover:text-accent">
        {t(lang, "more")}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
