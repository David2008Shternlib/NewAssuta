"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import { doctors, deptNames } from "@/data/site";
import { doctorBio, expertiseList } from "@/data/diseases";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DoctorPage() {
  const { lang } = useLang();
  const { slug } = useParams();
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) return notFound();
  const name = pick(doc.name, lang);

  return (
    <>
      <PageHero title={name} crumb={name} />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                <div className="flex h-48 w-48 flex-none items-center justify-center overflow-hidden rounded-full border border-line bg-surface2">
                  {doc.photo ? (
                    <img src={doc.photo} alt={name} className="h-full w-full scale-110 object-cover" />
                  ) : (
                    <span className="text-6xl font-bold text-brand-blue/25">{name.split(" ").slice(-1)[0]?.[0]}</span>
                  )}
                </div>
                <div>
                  <span className="eyebrow">{pick(deptNames[doc.dept], lang)}</span>
                  <h2 className="mt-2 text-2xl font-bold text-body">{name}</h2>
                  <p className="mt-1 text-muted">{pick(doc.spec, lang)}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4 text-body/80">
                <p>{doctorBio(doc, lang)}</p>
                <h3 className="pt-2 text-lg font-bold text-title">{t(lang, "expertise")}</h3>
                <ul className="space-y-2">
                  {expertiseList[lang].map((x) => (
                    <li key={x} className="flex gap-2"><span className="text-brand-green">✓</span>{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <div className="mt-10">
              <Link href="/doctors" className="btn-ghost gap-1.5"><Arrow dir="left" />{t(lang, "backToDoctors")}</Link>
            </div>
          </div>
          <aside>
            <div className="sticky top-28 rounded-xl2 bg-surface2 p-6">
              <h3 className="mb-1 text-lg font-bold text-title">{t(lang, "bookDoctor")}</h3>
              <p className="mb-5 text-sm text-muted">{t(lang, "leaveRequestHint")}</p>
              <RequestForm compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
