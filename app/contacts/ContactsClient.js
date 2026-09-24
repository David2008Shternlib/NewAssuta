"use client";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function ContactsPage() {
  const { lang } = useLang();
  const crumb = lang === "en" ? "Contacts" : "Контакты";
  return (
    <>
      <PageHero title={crumb} crumb={crumb} />
      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="mb-4 text-xl font-bold text-title">{t(lang, "contactUs")}</h2>
              <a href={site.mapUrl} target="_blank" rel="noreferrer" className="mb-6 block text-muted hover:text-brand-blue dark:hover:text-accent">{pick(site.address, lang)}</a>
              <div className="space-y-3">
                {site.phones.map((p) => (
                  <a key={p.value} href={p.href} className="flex items-center gap-3 text-lg font-semibold text-body hover:text-brand-blue dark:hover:text-accent">
                    <span className="text-2xl"><span className="rounded bg-line/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">{p.code}</span></span>{p.value}
                    <span className="text-sm font-normal text-muted">{pick(p.label, lang)}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                {site.messengers.map((m) => (<a key={m.label} href={m.href} className="block font-semibold text-brand-green hover:underline">{m.label}: {m.value}</a>))}
              </div>
              <div className="mt-8 overflow-hidden rounded-xl2 border border-line">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.5674506636406!2d34.836557615261135!3d32.10797418117922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d49949c3b5e57%3A0xf03186640d68f965!2z0JDRgdGB0YPRgtCw!5e0!3m2!1sru!2sua!4v1517240765860" className="h-72 w-full border-0" loading="lazy" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl2 bg-surface2 p-7">
              <h2 className="mb-1 text-xl font-bold text-title">{t(lang, "leaveRequest")}</h2>
              <p className="mb-5 text-sm text-muted">{t(lang, "contactsSub")}</p>
              <RequestForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
