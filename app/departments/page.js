"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { departments } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DepartmentsPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "deptTitle")} crumb={t(lang, "deptTitle")} subtitle={t(lang, "pgDeptSub")} />
      <section className="py-16">
        <div className="wrap grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link href="/doctors" className="card card-hover group flex h-full flex-col p-7">
                <div className="mb-4 text-5xl">{d.icon}</div>
                <h2 className="mb-2 text-xl font-bold text-body">{pick(d.title, lang)}</h2>
                <p className="flex-1 text-sm text-muted">{pick(d.desc, lang)}</p>
                <span className="mt-5 text-sm font-semibold uppercase text-brand-green group-hover:text-brand-blue dark:group-hover:text-accent">{t(lang, "deptDoctors")} →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
