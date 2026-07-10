"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import { findDisease, diseaseContent, doctorsForCategory } from "@/data/diseases";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function DiseasePage() {
  const { lang } = useLang();
  const { slug } = useParams();
  const d = findDisease(slug);
  if (!d) return notFound();
  const c = diseaseContent(d, lang);
  const docs = doctorsForCategory(d.category);
  const title = pick(d.title, lang);

  return (
    <>
      <PageHero title={title} crumb={title} subtitle={`${t(lang, "area")}: ${pick(d.category, lang)}`} />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <Reveal><p className="text-lg leading-relaxed text-body/80">{c.intro}</p></Reveal>
            {c.blocks.map((b, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <div className="mt-8">
                  <h2 className="mb-3 text-xl font-bold text-title">{b.h}</h2>
                  <p className="leading-relaxed text-body/75">{b.p}</p>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="mt-10">
                <h2 className="mb-5 text-xl font-bold text-title">{t(lang, "deptDoctors")}</h2>
                <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3">
                  {docs.slice(0, 3).map((doc) => (<DoctorCard key={doc.slug} doc={doc} />))}
                </div>
              </div>
            </Reveal>
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
