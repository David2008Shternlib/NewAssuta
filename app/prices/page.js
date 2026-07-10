"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

const groups = [
  { group: { ru: "Консультации", en: "Consultations" }, rows: [
    [{ ru: "Консультация профессора", en: "Professor consultation" }, "$550"],
    [{ ru: "Консультация врача-специалиста", en: "Specialist consultation" }, "$450"],
    [{ ru: "Второе врачебное мнение", en: "Second medical opinion" }, "$700"] ] },
  { group: { ru: "Диагностика", en: "Diagnostics" }, rows: [
    [{ ru: "МРТ (одна область)", en: "MRI (one area)" }, "$1 100"],
    [{ ru: "КТ (одна область)", en: "CT (one area)" }, "$650"],
    [{ ru: "ПЭТ-КТ всего тела", en: "Whole-body PET-CT" }, "$1 900"],
    [{ ru: "УЗИ", en: "Ultrasound" }, "$300"] ] },
  { group: { ru: "Онкология", en: "Oncology" }, rows: [
    [{ ru: "Биопсия с гистологией", en: "Biopsy with histology" }, { ru: "от $1 400", en: "from $1 400" }],
    [{ ru: "Курс химиотерапии (сессия)", en: "Chemotherapy (session)" }, { ru: "от $1 200", en: "from $1 200" }],
    [{ ru: "Таргетная терапия", en: "Targeted therapy" }, { ru: "по запросу", en: "on request" }] ] },
  { group: { ru: "Хирургия", en: "Surgery" }, rows: [
    [{ ru: "Эндопротезирование сустава", en: "Joint replacement" }, { ru: "от $22 000", en: "from $22 000" }],
    [{ ru: "Лапароскопическая операция", en: "Laparoscopic surgery" }, { ru: "от $12 000", en: "from $12 000" }],
    [{ ru: "Нейрохирургическая операция", en: "Neurosurgery" }, { ru: "по запросу", en: "on request" }] ] },
];

export default function PricesPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={lang === "en" ? "Prices" : "Цены"} crumb={lang === "en" ? "Prices" : "Цены"} subtitle={t(lang, "pgPricesSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08} className="h-full">
              <div className="card h-full p-7">
                <h2 className="mb-4 text-lg font-bold text-title">{pick(g.group, lang)}</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {g.rows.map(([name, price], j) => (
                      <tr key={j} className="border-b border-line last:border-0">
                        <td className="py-3 pr-4 text-body/80">{pick(name, lang)}</td>
                        <td className="py-3 text-right font-semibold text-body">{pick(price, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="wrap mt-6 text-sm text-muted/70">{t(lang, "priceDisclaimer")}</p>
      </section>
      <CTASection />
    </>
  );
}
