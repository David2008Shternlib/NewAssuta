"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

const about = {
  lead: {
    ru: "Ведущий центр медицинского туризма в Израиле — полное сопровождение иностранных пациентов на всех этапах.",
    en: "A leading medical tourism centre in Israel — full support for international patients at every stage.",
  },
  img: "/images/about.png",
  paras: {
    ru: [
      "«Monada Medical Center» — ведущий современный центр, предоставляющий полный спектр медицинских услуг для иностранных пациентов. Люди со всего мира обращаются к нам с организационными вопросами ещё до приезда в Израиль на консультации, обследования или лечение. Мы помогаем наладить контакт с медицинским персоналом клиники и берём на себя множество процессов, связанных с пребыванием в незнакомой стране.",
      "Деятельность компании начиналась с поставок сертифицированных препаратов и медицинского оборудования в клиники. Со временем компания стремительно развивалась и открыла отдельное направление по сопровождению иностранных пациентов, которое быстро завоевало популярность.",
      "Команда высококвалифицированных врачей работает под руководством директора Бориса Шифрина, доктора наук. Сотрудников отличают преданность делу, высочайший профессионализм и доброжелательное отношение к каждому пациенту. Наши специалисты владеют несколькими языками, что обеспечивает эффективное общение с гражданами практически любой страны.",
      "Одно из ключевых направлений нашей работы — помощь в подборе пакетов услуг под ваши финансовые возможности. Пациент может самостоятельно выбрать лечащего врача, а при желании мы дадим рекомендации. Сотрудничество с ведущими израильскими экспертами гарантирует эффективность услуг и безопасность пациентов из самых отдалённых уголков мира.",
    ],
    en: [
      "Monada Medical Center is a leading modern centre providing a full range of medical services for foreign patients. People from all over the world turn to us with organisational questions even before arriving in Israel for consultations, examinations or treatment. We help establish contact with the clinic's medical staff and take on many of the processes involved in staying in an unfamiliar country.",
      "The company's activity began with the supply of certified pharmaceuticals and medical equipment to clinics. Over time it developed rapidly and opened a dedicated department to assist foreign patients, which quickly gained wide popularity.",
      "A team of highly qualified doctors works under the guidance of Director Boris Shifrin, who holds a doctorate. The staff are marked by dedication, outstanding professionalism and a friendly approach to every patient. Our specialists speak several languages, enabling effective communication with citizens of almost any country.",
      "One of our key areas is helping to select service packages that match your budget. The patient can independently choose their attending physician, and we are happy to advise. Collaboration with top Israeli experts guarantees the effectiveness of our services and the safety of patients arriving from the most distant parts of the world.",
    ],
  },
  advTitle: { ru: "Преимущества", en: "Advantages" },
  advantages: [
    { icon: "👨‍⚕️", ru: "Компетентные и опытные специалисты, прошедшие подготовку в престижных медицинских учреждениях мира.", en: "Competent and experienced specialists trained in the world's most prestigious medical institutions." },
    { icon: "🔬", ru: "Инновационное и лучшее в мире оборудование.", en: "Innovative, best-in-class equipment." },
    { icon: "🧭", ru: "Индивидуальный подход к каждому пациенту и подбор оптимальной программы лечения.", en: "An individual approach to each patient and the most suitable treatment programme." },
    { icon: "🏨", ru: "Отличные условия пребывания — чтобы пациент чувствовал себя как дома.", en: "Excellent conditions so patients feel at home during their stay." },
  ],
};

export default function AboutPage() {
  const { lang } = useLang();
  const paras = pick(about.paras, lang);
  return (
    <>
      <PageHero title={t(lang, "aboutTitle")} crumb={t(lang, "aboutTitle")} subtitle={pick(about.lead, lang)} />

      <section className="py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5">
              {paras.slice(0, 2).map((pp, i) => (
                <p key={i} className="text-lg leading-relaxed text-body/80">{pp}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={about.img} alt="Assuta" className="w-full rounded-xl2 shadow-soft" />
          </Reveal>
        </div>
        <div className="wrap mt-10 max-w-4xl space-y-5">
          {paras.slice(2).map((pp, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-body/80">{pp}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface2 py-16">
        <div className="wrap">
          <Reveal>
            <h2 className="section-title mb-10 text-3xl md:text-4xl">{pick(about.advTitle, lang)}</h2>
          </Reveal>
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.advantages.map((a, i) => (
              <Reveal key={i} delay={(i % 4) * 0.06} className="h-full">
                <div className="card h-full p-6">
                  <div className="mb-4 text-4xl">{a.icon}</div>
                  <p className="text-sm leading-relaxed text-muted">{pick(a, lang)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
