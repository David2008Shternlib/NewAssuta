"use client";
import { useState } from "react";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import CTASection from "@/components/CTASection";
import { t, cms } from "@/data/i18n";
import { cmsLabel } from "@/data/site";
import { useLang } from "@/components/LangProvider";

// Сколько пунктов видно в свёрнутом виде. Пять — чтобы карточки в ряду были
// примерно одной высоты и при этом раздел не выглядел пустым.
const COLLAPSED = 5;
// Прятать один-два пункта смысла нет: кнопка занимает столько же места,
// сколько экономит. Сворачиваем, только если скрытых хотя бы три.
const MIN_HIDDEN = 3;

function CategoryCard({ category, items, lang }) {
  const [open, setOpen] = useState(false);
  const collapsible = items.length >= COLLAPSED + MIN_HIDDEN;
  const shown = open || !collapsible ? items : items.slice(0, COLLAPSED);
  const hidden = items.length - COLLAPSED;

  return (
    <div className="card flex h-full flex-col p-6">
      <h2 className="mb-4 break-words text-lg font-bold text-title">
        {cmsLabel(category, lang)}
        <span className="ml-2 text-sm font-semibold text-muted">{items.length}</span>
      </h2>
      <ul className="space-y-3">
        {shown.map((it) => (
          <li key={it.slug}>
            <Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{cms(it, "title", lang)}</Link>
          </li>
        ))}
      </ul>
      {collapsible && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold uppercase text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent"
        >
          {open ? t(lang, "showLess") : `${t(lang, "showMore")} ${hidden}`}
          <Arrow dir="chevron" className={`transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
        </button>
      )}
    </div>
  );
}

export default function DiseasesClient({ diseases = [] }) {
  const { lang } = useLang();
  const groups = [];
  const map = new Map();
  for (const d of diseases) {
    const cat = d.category || "Другое";
    if (!map.has(cat)) { const arr = []; map.set(cat, arr); groups.push({ category: cat, items: arr }); }
    map.get(cat).push(d);
  }
  return (
    <>
      <PageHero title={t(lang, "disTitle")} crumb={t(lang, "disTitle")} subtitle={t(lang, "pgDiseasesSub")} />
      <section className="py-16">
        <div className="wrap grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((cat, i) => (
            <Reveal key={cat.category} delay={(i % 3) * 0.05} className="h-full">
              <CategoryCard category={cat.category} items={cat.items} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
