"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

const packages = [
  { title: { ru: "Check-up для мужчин", en: "Men's check-up" }, price: "$2 300",
    items: { ru: ["Консультация терапевта", "Анализы крови (расширенно)", "УЗИ органов брюшной полости", "ЭКГ и нагрузочный тест", "Консультация уролога"],
             en: ["Therapist consultation", "Extended blood tests", "Abdominal ultrasound", "ECG and stress test", "Urologist consultation"] } },
  { title: { ru: "Check-up для женщин", en: "Women's check-up" }, price: "$2 500",
    items: { ru: ["Консультация терапевта", "Анализы крови (расширенно)", "Маммография / УЗИ", "Консультация гинеколога", "УЗИ щитовидной железы"],
             en: ["Therapist consultation", "Extended blood tests", "Mammography / ultrasound", "Gynecologist consultation", "Thyroid ultrasound"] } },
  { title: { ru: "Онкологический скрининг", en: "Cancer screening" }, price: "$3 400",
    items: { ru: ["Онкомаркеры", "ПЭТ-КТ всего тела", "Консультация онколога", "Расшифровка и план наблюдения"],
             en: ["Tumor markers", "Whole-body PET-CT", "Oncologist consultation", "Report and follow-up plan"] } },
  { title: { ru: "Кардио-диагностика", en: "Cardiac diagnostics" }, price: "$2 800",
    items: { ru: ["Эхокардиография", "Холтер-мониторинг", "Нагрузочные пробы", "Консультация кардиолога"],
             en: ["Echocardiography", "Holter monitoring", "Stress testing", "Cardiologist consultation"] } },
];

export default function DiagnosticsPage() {
  const { lang } = useLang();
  const from = lang === "en" ? "from " : "от ";
  return (
    <>
      <PageHero title={t(lang, "pgDiagTitle")} crumb={t(lang, "pgDiagTitle")} subtitle={t(lang, "pgDiagSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-2">
          {packages.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08} className="h-full">
              <div className="card card-hover flex h-full flex-col p-7">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h2 className="text-xl font-bold text-body">{pick(p.title, lang)}</h2>
                  <span className="whitespace-nowrap rounded-pill bg-brand-green/15 px-4 py-1 text-sm font-bold text-brand-greenDark dark:text-accent">{from}{p.price}</span>
                </div>
                <ul className="flex-1 space-y-2 text-sm text-muted">
                  {pick(p.items, lang).map((it) => (<li key={it} className="flex gap-2"><span className="text-brand-green">✓</span>{it}</li>))}
                </ul>
                <a href="#request" className="btn-blue mt-6 self-start">{t(lang, "book")}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
