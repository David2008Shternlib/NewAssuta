"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function ReviewsClient({ reviews = [] }) {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "reviewsEyebrow")} crumb={t(lang, "reviewsEyebrow")} subtitle={t(lang, "pgReviewsSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.id || i} delay={(i % 2) * 0.05} className="h-full">
              <div className="card h-full p-7">
                <div className="mb-3 text-sm font-bold text-brand-green">{r.rating || 5} из 5</div>
                <p className="mb-5 whitespace-pre-line italic text-body/80">«{r.text}»</p>
                <div className="text-sm font-bold text-body">{r.author}</div>
                {r.country && <div className="text-xs text-muted">{r.country}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
