import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { departments } from "@/data/site";

export const metadata = { title: "Направления лечения — клиника Ассута" };

export default function DepartmentsPage() {
  return (
    <>
      <PageHero title="Направления лечения" crumb="Направления" subtitle="Более 20 медицинских специальностей под одной крышей." />
      <section className="py-16">
        <div className="wrap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.06}>
              <Link href="/doctors" className="card card-hover group flex h-full flex-col p-7">
                <div className="mb-4 text-5xl">{d.icon}</div>
                <h2 className="mb-2 text-xl font-bold text-brand-ink">{d.title}</h2>
                <p className="text-sm text-brand-ink/60">{d.desc}</p>
                <span className="mt-5 text-sm font-semibold uppercase text-brand-green group-hover:text-brand-blue">Врачи направления →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
