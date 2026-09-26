"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { docName, t, cms } from "@/data/i18n";
import { cmsLabel } from "@/data/site";
import { useLang } from "@/components/LangProvider";

export default function DoctorDetail({ doc }) {
  const { lang } = useLang();
  const name = docName(doc, lang);
  const dept = cmsLabel(doc.dept, lang);
  const spec = cmsLabel(cms(doc, "spec", lang), lang);
  const bodyHtml = cms(doc, "bodyHtml", lang);

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
                    <img src={doc.photo} alt={name} className="h-full w-full scale-105 object-cover" />
                  ) : (
                    <span className="text-6xl font-bold text-brand-blue/25">{name.split(" ").slice(-1)[0]?.[0]}</span>
                  )}
                </div>
                <div>
                  {dept && <span className="eyebrow">{dept}</span>}
                  <h2 className="mt-2 text-2xl font-bold text-body">{name}</h2>
                  {spec && spec !== dept && <p className="mt-1 text-muted">{spec}</p>}
                </div>
              </div>
            </Reveal>
            {bodyHtml && (
              <Reveal delay={0.1}>
                <div className="cms-body mt-8 space-y-4 leading-relaxed text-body/85" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </Reveal>
            )}
            <Reveal><MedicalDisclaimer className="mt-10" /></Reveal>

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
