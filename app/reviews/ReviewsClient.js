"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import ReviewCard from "@/components/ReviewCard";
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
              <ReviewCard review={r} lines={10} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
