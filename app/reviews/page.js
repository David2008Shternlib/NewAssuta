"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { reviews } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function ReviewsPage() {
  const { lang } = useLang();
  const all = [...reviews, ...reviews];
  return (
    <>
      <PageHero title={t(lang, "reviewsEyebrow")} crumb={t(lang, "reviewsEyebrow")} subtitle={t(lang, "pgReviewsSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-2">
          {all.map((r, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06} className="h-full">
              <div className="card h-full p-7">
                <div className="mb-3 text-brand-green">★★★★★</div>
                <p className="mb-5 italic text-body/80">«{pick(r.text, lang)}»</p>
                <div className="text-sm font-bold text-body">{r.author}</div>
                <div className="text-xs text-muted">{pick(r.country, lang)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
