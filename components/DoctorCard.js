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
      <h3 className="mb-1 text-lg font-bold text-body">{name}</h3>
      <p className="mb-4 text-sm text-muted">{pick(doc.spec, lang)}</p>
      <span className="mt-auto text-sm font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue dark:group-hover:text-accent">
        {t(lang, "more")} →
      </span>
    </Link>
  );
}
