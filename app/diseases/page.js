import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { diseasesByCategory } from "@/data/site";

export const metadata = { title: "Заболевания и лечение в клинике Ассута" };

export default function DiseasesPage() {
  return (
    <>
      <PageHero title="Заболевания" crumb="Заболевания" subtitle="Диагностика и лечение по всем ключевым направлениям современной медицины." />
      <section className="py-16">
        <div className="wrap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {diseasesByCategory.map((cat, i) => (
            <Reveal key={cat.category} delay={(i % 3) * 0.06}>
              <div className="card h-full p-6">
                <h2 className="mb-4 text-lg font-bold text-brand-blue">{cat.category}</h2>
                <ul className="space-y-3">
                  {cat.items.map((it) => (
                    <li key={it.slug}>
                      <Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{it.title}</Link>
                    </li>
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
