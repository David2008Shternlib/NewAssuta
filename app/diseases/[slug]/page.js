import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import { allDiseases, findDisease, diseaseContent, doctorsForCategory } from "@/data/diseases";

export function generateStaticParams() {
  return allDiseases.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const d = findDisease(params.slug);
  return { title: d ? `${d.title} — лечение в Израиле | Ассута` : "Лечение" };
}

export default function DiseasePage({ params }) {
  const d = findDisease(params.slug);
  if (!d) return notFound();
  const c = diseaseContent(d);
  const docs = doctorsForCategory(d.category);

  return (
    <>
      <PageHero title={d.title} crumb={d.title} subtitle={`Направление: ${d.category}`} />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-brand-ink/80">{c.intro}</p>
            </Reveal>
            {c.blocks.map((b, i) => (
              <Reveal key={b.h} delay={0.06 * (i + 1)}>
                <div className="mt-8">
                  <h2 className="mb-3 text-xl font-bold text-brand-blue">{b.h}</h2>
                  <p className="leading-relaxed text-brand-ink/75">{b.p}</p>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-10">
                <h2 className="mb-5 text-xl font-bold text-brand-blue">Врачи направления</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {docs.slice(0, 3).map((doc) => (
                    <DoctorCard key={doc.slug} doc={doc} />
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
              <Link href="/diseases" className="btn-ghost">← Ко всем заболеваниям</Link>
            </div>
          </article>

          <aside>
            <div className="sticky top-28 rounded-xl2 bg-brand-bg p-6">
              <h3 className="mb-1 text-lg font-bold text-brand-blue">Узнать стоимость лечения</h3>
              <p className="mb-5 text-sm text-brand-ink/60">Оставьте заявку — рассчитаем программу и цену.</p>
              <RequestForm compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
