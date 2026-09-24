"use client";
import RequestForm from "./RequestForm";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";

export default function CTASection() {
  const { lang } = useLang();
  return (
    <section id="request" className="scroll-mt-24 bg-surface2 py-20">
      <div className="wrap grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="eyebrow mb-3">{t(lang, "ctaEyebrow")}</div>
          <h2 className="section-title text-3xl md:text-4xl">{t(lang, "ctaTitle")}</h2>
          <p className="mt-5 text-lg text-muted">{t(lang, "ctaSub")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {site.phones.map((p) => (
              <a key={p.value} href={p.href} className="flex items-center gap-2 rounded-pill bg-surface px-4 py-2 text-sm font-semibold text-body shadow-sm">
                <span className="rounded bg-line/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">{p.code}</span>{p.value}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-xl2 bg-surface p-7 shadow-soft">
            <RequestForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
