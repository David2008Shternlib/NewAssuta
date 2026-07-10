"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { diseasesByCategory } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DiseasesPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "disTitle")} crumb={t(lang, "disTitle")} subtitle={t(lang, "pgDiseasesSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {diseasesByCategory.map((cat, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} className="h-full">
              <div className="card h-full p-6">
                <h2 className="mb-4 text-lg font-bold text-title">{pick(cat.category, lang)}</h2>
                <ul className="space-y-3">
                  {cat.items.map((it) => (
                    <li key={it.slug}><Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{pick(it.title, lang)}</Link></li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
