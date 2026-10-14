"use client";
import ReviewText from "./ReviewText";
import { cms } from "@/data/i18n";
import { useLang } from "./LangProvider";
import { cdnImage2x } from "@/lib/img";

/**
 * Карточка отзыва: портрет слева, цитата справа, под ней имя, возраст
 * и диагноз — так в макете клиента.
 *
 * Все три поля человека необязательные. Пока в CMS их не заполнили,
 * карточка показывает отзыв ровно как раньше: без портрета и возраста,
 * с одним только именем. Выдумывать лица и возраста к настоящим отзывам
 * нельзя — это выдача несуществующих людей за реальных пациентов,
 * поэтому заглушка — кружок с буквой, а не чужая фотография.
 */
function Avatar({ name, photo }) {
  const letter = (name || "").trim()[0] || "?";
  if (photo) {
    return (
      <img
        src={cdnImage2x(photo, 80, 80)}
        alt={name || ""}
        loading="lazy"
        className="h-16 w-16 flex-none rounded-full border border-line object-cover sm:h-20 sm:w-20"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-brand-blue/10 text-xl font-bold text-brand-blue dark:bg-white/10 dark:text-accent sm:h-20 sm:w-20 sm:text-2xl"
    >
      {letter}
    </span>
  );
}

export default function ReviewCard({ review, lines = 8, className = "" }) {
  const { lang } = useLang();
  const r = review || {};
  const diagnosis = cms(r, "diagnosis", lang);

  // «Мария, 42 года» — возраст приклеен к имени, как в макете.
  const years = (n) => {
    if (lang === "en") return `${n}`;
    const d = n % 10, h = n % 100;
    if (d === 1 && h !== 11) return `${n} год`;
    if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return `${n} года`;
    return `${n} лет`;
  };
  const who = [r.author, r.age ? years(r.age) : null].filter(Boolean).join(", ");

  return (
    <div className={`card flex flex-col gap-4 p-5 sm:flex-row sm:gap-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-4 sm:block">
        <Avatar name={r.author} photo={r.photo} />
        <div className="min-w-0 sm:hidden">
          {who && <div className="text-sm font-bold text-body">{who}</div>}
          {diagnosis && <div className="text-xs text-muted">{diagnosis}</div>}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <ReviewText text={r.text} lines={lines} className="whitespace-pre-line italic leading-relaxed text-body/85" />
        {/* На широком экране подпись стоит под цитатой, на телефоне — рядом
            с портретом сверху, иначе имя уезжает под кнопку «Показать ещё». */}
        <div className="mt-4 hidden sm:block">
          {who && <div className="text-sm font-bold text-body">{who}</div>}
          {diagnosis && <div className="text-xs text-muted">{diagnosis}</div>}
          {!diagnosis && r.country && <div className="text-xs text-muted">{r.country}</div>}
        </div>
      </div>
    </div>
  );
}
