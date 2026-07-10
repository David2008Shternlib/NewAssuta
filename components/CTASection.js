import RequestForm from "./RequestForm";
import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function CTASection() {
  return (
    <section id="request" className="scroll-mt-24 bg-brand-bg py-20">
      <div className="wrap grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="eyebrow mb-3">Бесплатная консультация</div>
          <h2 className="section-title text-3xl md:text-4xl">Оставьте заявку на лечение в Ассута</h2>
          <p className="mt-5 text-lg text-brand-ink/60">
            Мы возьмём на себя весь процесс организации поездки: подбор врача, программу диагностики,
            перевод, трансфер и проживание.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {site.phones.map((p) => (
              <a key={p.value} href={p.href} className="flex items-center gap-2 rounded-pill bg-white px-4 py-2 text-sm font-semibold shadow-sm">
                <span>{p.flag}</span>{p.value}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-xl2 bg-white p-7 shadow-soft">
            <RequestForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
