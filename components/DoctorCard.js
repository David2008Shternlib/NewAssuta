"use client";
import Link from "@/components/LocaleLink";
import { docName, pick, t, cms } from "@/data/i18n";
import { cmsLabel } from "@/data/site";
import { useLang } from "./LangProvider";

/**
 * Карточка врача.
 *
 * Две раскладки на одном наборе данных:
 *  — на телефоне карточка лежит горизонтально, фото слева, текст справа,
 *    по одной в ряд (так в макете клиента). Вертикальная карточка в две
 *    колонки давала узкие столбцы, в которых длинные фамилии переносились
 *    по три-четыре строки;
 *  — от sm и шире остаётся прежняя вертикальная карточка: в сетке на три
 *    или четыре колонки горизонтальная выглядела бы растянутой.
 *
 * Запас высоты под имя и специальность нужен только в вертикальной
 * раскладке — там карточки стоят рядом и подписи должны держать общую
 * линию. В горизонтальной соседей по ряду нет, поэтому запас с sm:.
 */
export default function DoctorCard({ doc, caption }) {
  const { lang } = useLang();
  const name = docName(doc, lang);
  const subtitle = caption || cmsLabel(cms(doc, "spec", lang), lang);
  const initial = name.split(" ").slice(-1)[0]?.[0] || "A";

  return (
    <Link
      href={`/doctors/${doc.slug}`}
      className="card card-hover group flex h-full items-center gap-4 p-4 text-left sm:flex-col sm:items-center sm:p-6 sm:text-center"
    >
      <div className="flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-full border border-line bg-surface2 sm:mb-5 sm:h-32 sm:w-32">
        {doc.photo ? (
          <img src={doc.photo} alt={name} className="h-full w-full scale-110 object-cover" />
        ) : (
          <span className="text-2xl font-bold text-brand-blue/30 sm:text-4xl">{initial}</span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col sm:w-full sm:flex-1">
        <h3 className="mb-1 flex break-words text-base font-bold leading-snug text-body sm:min-h-[3.25rem] sm:items-center sm:justify-center sm:text-lg">
          {name}
        </h3>
        <p className="mb-2 break-words text-sm leading-snug text-muted sm:mb-4 sm:min-h-[2.5rem]">{subtitle}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue dark:group-hover:text-accent sm:mt-auto sm:justify-center sm:text-sm">
          {t(lang, "more")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
