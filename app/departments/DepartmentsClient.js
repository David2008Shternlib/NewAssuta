"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
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
              <Link href="/doctors" className="card card-hover group flex h-full items-center gap-4 p-5 sm:flex-col sm:items-start sm:gap-0 sm:p-7">
                <div className="flex-none text-5xl sm:mb-4">{d.icon}</div>
                <div className="min-w-0 flex-1">
                  <h2 className="mb-1 text-xl font-bold text-body sm:mb-2">{pick(d.title, lang)}</h2>
                  <p className="text-sm text-muted">{pick(d.desc, lang)}</p>
                  <span className="mt-4 hidden items-center gap-1.5 text-sm font-semibold uppercase text-brand-green group-hover:text-brand-blue dark:group-hover:text-accent sm:inline-flex">
                    {t(lang, "deptDoctors")}<Arrow />
                  </span>
                </div>
                <Arrow dir="chevron" className="flex-none text-muted sm:hidden" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
