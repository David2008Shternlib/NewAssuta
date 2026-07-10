import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { reviews } from "@/data/site";

export const metadata = { title: "Отзывы пациентов — клиника Ассута" };

export default function ReviewsPage() {
  const all = [...reviews, ...reviews];
  return (
    <>
      <PageHero title="Отзывы пациентов" crumb="Отзывы" subtitle="Истории людей, которые прошли лечение в клинике Ассута." />
      <section className="py-16">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {all.map((r, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <div className="card h-full p-7">
                <div className="mb-3 text-brand-green">★★★★★</div>
                <p className="mb-5 italic text-brand-ink/80">«{r.text}»</p>
                <div className="text-sm font-bold text-brand-ink">{r.author}</div>
                <div className="text-xs text-brand-ink/50">{r.country}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
