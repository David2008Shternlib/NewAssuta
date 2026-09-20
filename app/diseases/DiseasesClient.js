"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DiseasesClient({ diseases = [] }) {
  const { lang } = useLang();
  const groups = [];
  const map = new Map();
  for (const d of diseases) {
    const cat = d.category || "Другое";
    if (!map.has(cat)) { const arr = []; map.set(cat, arr); groups.push({ category: cat, items: arr }); }
    map.get(cat).push(d);
  }
  return (
    <>
      <PageHero title={t(lang, "disTitle")} crumb={t(lang, "disTitle")} subtitle={t(lang, "pgDiseasesSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((cat, i) => (
            <Reveal key={cat.category} delay={(i % 3) * 0.05} className="h-full">
              <div className="card h-full p-6">
                <h2 className="mb-4 break-words text-lg font-bold text-title">{cat.category}</h2>
                <ul className="space-y-3">
                  {cat.items.map((it) => (
                    <li key={it.slug}><Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{it.title}</Link></li>
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
