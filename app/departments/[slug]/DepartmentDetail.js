"use client";
import { useState } from "react";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { pick, t, cms } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

// В онкологии 52 заболевания — списком в два столбца это 26 строк, из-за
// которых форма заявки и врачи уезжают далеко вниз. Показываем первую дюжину.
const COLLAPSED = 12;
// Ради одного-двух скрытых пунктов кнопку не показываем.
const MIN_HIDDEN = 3;

export default function DepartmentDetail({ dept, doctors = [], diseases = [] }) {
  const { lang } = useLang();
  const title = pick(dept.title, lang);
  const [openDis, setOpenDis] = useState(false);
  const disCollapsible = diseases.length >= COLLAPSED + MIN_HIDDEN;
  const shownDiseases = openDis || !disCollapsible ? diseases : diseases.slice(0, COLLAPSED);

  return (
    <>
      <PageHero title={title} crumb={title} subtitle={pick(dept.desc, lang)} />

      <section className="py-14">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="mb-8 flex items-start gap-4 rounded-xl2 bg-surface2 p-6">
                <p className="leading-relaxed text-body/85">{pick(dept.desc, lang)}</p>
              </div>
            </Reveal>

            {doctors.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h2 className="mb-5 text-xl font-bold text-title">
                    {lang === "en" ? "Doctors of this area" : "Врачи направления"}
                    <span className="ml-2 text-base font-normal text-muted">{doctors.length}</span>
                  </h2>
                  <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3">
                    {doctors.map((d) => (<DoctorCard key={d.slug} doc={d} />))}
                  </div>
                </div>
              </Reveal>
            )}

            {diseases.length > 0 && (
              <Reveal>
                <div className="mb-12">
                  <h2 className="mb-5 text-xl font-bold text-title">
                    {lang === "en" ? "What we treat" : "Что лечим в этом направлении"}
                    <span className="ml-2 text-base font-normal text-muted">{diseases.length}</span>
                  </h2>
                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {shownDiseases.map((d) => (
                      <li key={d.slug}>
                        <Link href={`/diseases/${d.slug}`} className="link-underline text-sm">{cms(d, "title", lang)}</Link>
                      </li>
                    ))}
                  </ul>
                  {disCollapsible && (
                    <button
                      type="button"
                      onClick={() => setOpenDis((v) => !v)}
                      aria-expanded={openDis}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent"
                    >
                      {openDis ? t(lang, "showLess") : `${t(lang, "showMore")} ${diseases.length - COLLAPSED}`}
                      <Arrow dir="chevron" className={`transition-transform ${openDis ? "-rotate-90" : "rotate-90"}`} />
                    </button>
                  )}
                </div>
              </Reveal>
            )}

            {doctors.length === 0 && diseases.length === 0 && (
              <Reveal>
                <p className="text-muted">
                  {lang === "en"
                    ? "Materials for this area are being prepared. Leave a request — a coordinator will select a doctor for you."
                    : "Материалы по этому направлению готовятся. Оставьте заявку — координатор подберёт врача."}
                </p>
              </Reveal>
            )}

            <Reveal><MedicalDisclaimer /></Reveal>

            <div className="mt-10">
              <Link href="/departments" className="btn-ghost gap-1.5">
                <Arrow dir="left" />{lang === "en" ? "All areas" : "Ко всем направлениям"}
              </Link>
            </div>
          </div>

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
