import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import Reveal from "@/components/Reveal";
import { doctors } from "@/data/site";
import { doctorBio } from "@/data/diseases";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const doc = doctors.find((d) => d.slug === params.slug);
  return { title: doc ? `${doc.name} — ${doc.spec} | Ассута` : "Врач" };
}

export default function DoctorPage({ params }) {
  const doc = doctors.find((d) => d.slug === params.slug);
  if (!doc) return notFound();

  return (
    <>
      <PageHero title={doc.name} crumb={doc.name} />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                <div className="flex h-48 w-48 flex-none items-center justify-center overflow-hidden rounded-full border border-brand-blue/10 bg-brand-bg">
                  {doc.photo ? (
                    <img src={doc.photo} alt={doc.name} className="h-full w-full scale-110 object-cover" />
                  ) : (
                    <span className="text-6xl font-bold text-brand-blue/25">{doc.name.split(" ")[1]?.[0]}</span>
                  )}
                </div>
                <div>
                  <span className="eyebrow">{doc.dept}</span>
                  <h2 className="mt-2 text-2xl font-bold text-brand-ink">{doc.name}</h2>
                  <p className="mt-1 text-brand-ink/60">{doc.spec}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4 text-brand-ink/80">
                <p>{doctorBio(doc)}</p>
                <h3 className="pt-2 text-lg font-bold text-brand-blue">Области экспертизы</h3>
                <ul className="space-y-2">
                  {["Консультация и постановка диагноза", "Малоинвазивные и роботизированные операции", "Ведение пациента на всех этапах лечения", "Второе врачебное мнение"].map((t) => (
                    <li key={t} className="flex gap-2"><span className="text-brand-green">✓</span>{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <div className="mt-10">
              <Link href="/doctors" className="btn-ghost">← Ко всем врачам</Link>
            </div>
          </div>
          <aside>
            <div className="sticky top-28 rounded-xl2 bg-brand-bg p-6">
              <h3 className="mb-1 text-lg font-bold text-brand-blue">Записаться к врачу</h3>
              <p className="mb-5 text-sm text-brand-ink/60">Оставьте заявку — координатор свяжется с вами.</p>
              <RequestForm compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
