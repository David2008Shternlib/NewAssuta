import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata = { title: "Диагностические программы — клиника Ассута" };

const packages = [
  { title: "Check-up для мужчин", price: "от $2 300", items: ["Консультация терапевта", "Анализы крови (расширенно)", "УЗИ органов брюшной полости", "ЭКГ и нагрузочный тест", "Консультация уролога"] },
  { title: "Check-up для женщин", price: "от $2 500", items: ["Консультация терапевта", "Анализы крови (расширенно)", "Маммография / УЗИ", "Консультация гинеколога", "УЗИ щитовидной железы"] },
  { title: "Онкологический скрининг", price: "от $3 400", items: ["Онкомаркеры", "ПЭТ-КТ всего тела", "Консультация онколога", "Расшифровка и план наблюдения"] },
  { title: "Кардио-диагностика", price: "от $2 800", items: ["Эхокардиография", "Холтер-мониторинг", "Нагрузочные пробы", "Консультация кардиолога"] },
];

export default function DiagnosticsPage() {
  return (
    <>
      <PageHero title="Диагностические программы" crumb="Диагностика" subtitle="Комплексное обследование организма за 1–3 дня на оборудовании экспертного класса." />
      <section className="py-16">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {packages.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <div className="card card-hover flex h-full flex-col p-7">
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="text-xl font-bold text-brand-ink">{p.title}</h2>
                  <span className="rounded-pill bg-brand-green/15 px-4 py-1 text-sm font-bold text-brand-greenDark">{p.price}</span>
                </div>
                <ul className="space-y-2 text-sm text-brand-ink/70">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2"><span className="text-brand-green">✓</span>{it}</li>
                  ))}
                </ul>
                <a href="#request" className="btn-blue mt-6 self-start">Записаться</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
