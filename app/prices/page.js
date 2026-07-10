import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata = { title: "Цены на лечение и диагностику — клиника Ассута" };

const groups = [
  { group: "Консультации", rows: [["Консультация профессора", "$550"], ["Консультация врача-специалиста", "$450"], ["Второе врачебное мнение", "$700"]] },
  { group: "Диагностика", rows: [["МРТ (одна область)", "$1 100"], ["КТ (одна область)", "$650"], ["ПЭТ-КТ всего тела", "$1 900"], ["УЗИ", "$300"]] },
  { group: "Онкология", rows: [["Биопсия с гистологией", "от $1 400"], ["Курс химиотерапии (сессия)", "от $1 200"], ["Таргетная терапия", "по запросу"]] },
  { group: "Хирургия", rows: [["Эндопротезирование сустава", "от $22 000"], ["Лапароскопическая операция", "от $12 000"], ["Нейрохирургическая операция", "по запросу"]] },
];

export default function PricesPage() {
  return (
    <>
      <PageHero title="Цены" crumb="Цены" subtitle="Ориентировочная стоимость. Точную цену программы рассчитывает координатор после изучения ситуации." />
      <section className="py-16">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.group} delay={(i % 2) * 0.08}>
              <div className="card p-7">
                <h2 className="mb-4 text-lg font-bold text-brand-blue">{g.group}</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {g.rows.map(([name, price]) => (
                      <tr key={name} className="border-b border-brand-ink/10 last:border-0">
                        <td className="py-3 pr-4 text-brand-ink/80">{name}</td>
                        <td className="py-3 text-right font-semibold text-brand-ink">{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="wrap mt-6 text-sm text-brand-ink/40">* Цены указаны для демонстрации и не являются публичной офертой.</p>
      </section>
      <CTASection />
    </>
  );
}
