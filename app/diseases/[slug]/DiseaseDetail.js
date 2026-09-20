"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import { t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DiseaseDetail({ doc, doctors = [] }) {
  const { lang } = useLang();
  const title = doc.title || "";

  return (
    <>
      <PageHero title={title} crumb={title} subtitle={doc.category ? `${t(lang, "area")}: ${doc.category}` : undefined} />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            {doc.bodyHtml ? (
              <Reveal>
                <div className="cms-body leading-relaxed text-body/85" dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />
              </Reveal>
            ) : (
              doc.excerpt && <Reveal><p className="text-lg leading-relaxed text-body/80">{doc.excerpt}</p></Reveal>
            )}

            {doctors.length > 0 && (
              <Reveal>
                <div className="mt-10">
                  <h2 className="mb-5 text-xl font-bold text-title">{t(lang, "deptDoctors")}</h2>
                  <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3">
                    {doctors.slice(0, 3).map((d) => (<DoctorCard key={d.slug} doc={d} />))}
                  </div>
                </div>
              </Reveal>
            )}

            <div className="mt-10"><Link href="/diseases" className="btn-ghost gap-1.5"><Arrow dir="left" />{t(lang, "backToDiseases")}</Link></div>
          </article>
          <aside>
            <div className="sticky top-28 rounded-xl2 bg-surface2 p-6">
              <h3 className="mb-1 text-lg font-bold text-title">{t(lang, "getCost")}</h3>
              <p className="mb-5 text-sm text-muted">{t(lang, "costHint")}</p>
              <RequestForm compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
