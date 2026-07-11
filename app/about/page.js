"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { stats } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

const about = {
  lead: {
    ru: "«Ассута» — международно признанный центр медицинского совершенства. Безупречное качество услуг сочетается с высоким профессионализмом мультидисциплинарной команды, новейшим оборудованием и комфортными условиями пребывания.",
    en: "Assuta is an internationally recognised centre of medical excellence. Impeccable quality of care is combined with a highly professional multidisciplinary team, state-of-the-art equipment and comfortable hospitalisation.",
  },
  paras: {
    ru: [
      "Статус частной клиники позволяет поднять многие аспекты сервиса до уровня, который в других медицинских центрах считается привилегией: сверхбыстрая диагностика и лечение, гибкий график процедур, отсутствие очередей.",
      "Как показывает практика, скорость диагностики и лечения повышает шансы на выздоровление и сокращает сроки госпитализации, снижая связанные с этим расходы. Весь персонал — от профессоров до технических специалистов — нацелен на максимально быструю и качественную помощь пациенту.",
      "Схема комплексного ведения каждого пациента и техническое оснащение отвечают высочайшим медицинским стандартам. При необходимости врач составит оптимальный план лечения, сочетая хирургию, лекарственную и лучевую терапию.",
    ],
    en: [
      "Its private-clinic status raises many aspects of service to a level considered a privilege elsewhere: extremely fast diagnostics and treatment, a flexible procedure schedule and no queues.",
      "In practice, the speed of the diagnostic and treatment process improves the chances of recovery and shortens hospital stays, reducing associated costs. The entire staff — from professors to technicians — is focused on the fastest, highest-quality care for the patient.",
      "The comprehensive management plan for each patient and the technical equipment meet the highest medical standards. When needed, the doctor prepares an optimal treatment plan combining surgery, drug therapy and radiation therapy.",
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "aboutTitle")} crumb={t(lang, "aboutTitle")} subtitle={pick(about.lead, lang)} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.06} className="h-full">
              <div className="card h-full p-6 text-center">
                <div className="text-4xl font-bold text-brand-green">{s.num}{s.unit ? ` ${pick(s.unit, lang)}` : ""}</div>
                <div className="mt-2 text-sm font-medium text-muted">{pick(s.label, lang)}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="wrap mt-12 max-w-4xl space-y-5">
          {pick(about.paras, lang).map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-body/80">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
