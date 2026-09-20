"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import CTASection from "@/components/CTASection";
import { t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function NewsDetail({ item }) {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={item.title} crumb={item.title} />
      <section className="py-16">
        <div className="wrap max-w-3xl">
          {item.image && (
            <Reveal><img src={item.image} alt={item.title} className="mb-8 w-full rounded-xl2" /></Reveal>
          )}
          {item.bodyHtml ? (
            <Reveal><div className="cms-body leading-relaxed text-body/85" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} /></Reveal>
          ) : (
            item.excerpt && <p className="text-lg text-body/80">{item.excerpt}</p>
          )}
          <div className="mt-10"><Link href="/news" className="btn-ghost gap-1.5"><Arrow dir="left" />{t(lang, "newsEyebrow")}</Link></div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
