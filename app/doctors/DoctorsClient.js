"use client";
import PageHero from "@/components/PageHero";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { doctors } from "@/data/site";
import { t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DoctorsPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "ourDoctors")} crumb={t(lang, "ourDoctors")} subtitle={t(lang, "pgDoctorsSub")} />
      <section className="py-16">
        <div className="wrap grid grid-cols-2 items-stretch gap-5 md:grid-cols-3 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <Reveal key={doc.slug} delay={(i % 4) * 0.05} className="h-full">
              <DoctorCard doc={doc} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
