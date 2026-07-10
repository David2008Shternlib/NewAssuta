import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata = { title: "Контакты — клиника Ассута, Тель-Авив" };

export default function ContactsPage() {
  return (
    <>
      <PageHero title="Контакты" crumb="Контакты" />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="mb-4 text-xl font-bold text-brand-blue">Свяжитесь с нами</h2>
              <p className="mb-6 text-brand-ink/70">{site.address}</p>
              <div className="space-y-3">
                {site.phones.map((p) => (
                  <a key={p.value} href={p.href} className="flex items-center gap-3 text-lg font-semibold text-brand-ink hover:text-brand-blue">
                    <span className="text-2xl">{p.flag}</span>{p.value}
                    <span className="text-sm font-normal text-brand-ink/50">{p.label}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                {site.messengers.map((m) => (
                  <a key={m.label} href={m.href} className="block font-semibold text-brand-green hover:underline">{m.label}: {m.value}</a>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-xl2 border border-brand-blue/10">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.5674506636406!2d34.836557615261135!3d32.10797418117922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d49949c3b5e57%3A0xf03186640d68f965!2z0JDRgdGB0YPRgtCw!5e0!3m2!1sru!2sua!4v1517240765860"
                  className="h-72 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl2 bg-brand-bg p-7">
              <h2 className="mb-1 text-xl font-bold text-brand-blue">Оставить заявку</h2>
              <p className="mb-5 text-sm text-brand-ink/60">Ответим и составим программу лечения.</p>
              <RequestForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
