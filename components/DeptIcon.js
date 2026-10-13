// Иконки направлений для плиток на главной и в разделе «Направления».
//
// Фотографий к направлениям нет, поэтому роль картинки берут на себя иконка
// и цветная подложка — по одному оттенку на направление. Оттенки заданы
// утилитами Tailwind строками целиком: собранные на лету
// (`bg-${color}-50`) сборщик не видит и вырезает из финального CSS.
//
// Иконки намеренно простые и однотипные по толщине линии: это навигация,
// а не иллюстрация, и дюжина разношёрстных картинок рядом выглядит мусором.

const PATHS = {
  oncology: "M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21z",
  cardiology: "M3 12h3l2-5 4 10 2-5h7",
  gastroenterology: "M8 3v6a4 4 0 0 0 8 0M6 21c0-5 4-5 4-9m8 9c0-4-3-4-3-7",
  gynecologists: "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 10v8m-3-3h6",
  urology: "M12 3c-3 4-6 6.5-6 10a6 6 0 0 0 12 0c0-3.5-3-6-6-10z",
  "general-surgery": "M4 4l9 9m-3 3l-6 6m16-18l-9 9m3 3l6 6",
  neurosurgery: "M9 20a4 4 0 0 1-4-4 3 3 0 0 1-1-5 3 3 0 0 1 2-4 4 4 0 0 1 8 0 3 3 0 0 1 2 4 3 3 0 0 1-1 5 4 4 0 0 1-4 4zm3 0v-8",
  "plastic-surgery": "M12 21a8 8 0 0 0 8-8c0-5-4-9-8-10-4 1-8 5-8 10a8 8 0 0 0 8 8zm-3-9h6",
  "vascular-surgery": "M6 3v7a6 6 0 0 0 12 0V3M9 21c0-4 3-5 3-8",
  hematology: "M12 3c-3.5 4.5-6 7.3-6 10a6 6 0 0 0 12 0c0-2.7-2.5-5.5-6-10z",
  neurology: "M12 4a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4zm0 4h4m-4 4H8m4 4h4",
  orthopedic: "M7 4c0 2 2 2 2 4s-2 2-2 4 2 2 2 4m8-12c0 2-2 2-2 4s2 2 2 4-2 2-2 4",
  endocrinologists: "M12 4c4 0 6 2 6 5 0 4-6 11-6 11S6 13 6 9c0-3 2-5 6-5zm0 3v6",
  dermatology: "M4 8c3-3 6 3 9 0s4 1 7-1M4 14c3-3 6 3 9 0s4 1 7-1",
  ophthalmolog: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  rheumatology: "M7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 8l8 8m-9 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  ivf: "M9 9a3 3 0 1 0 6 0 3 3 0 0 0-6 0zm3 3v6m-8-6a8 8 0 0 1 16 0",
};

// Подложка и цвет линии. Пары подобраны так, чтобы соседние плитки в сетке
// не сливались и ни одна не кричала громче остальных.
const TONES = {
  oncology: "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-300",
  cardiology: "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-300",
  gastroenterology: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
  gynecologists: "bg-fuchsia-50 text-fuchsia-500 dark:bg-fuchsia-500/10 dark:text-fuchsia-300",
  urology: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300",
  "general-surgery": "bg-slate-100 text-slate-600 dark:bg-slate-400/10 dark:text-slate-300",
  neurosurgery: "bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-300",
  "plastic-surgery": "bg-pink-50 text-pink-500 dark:bg-pink-500/10 dark:text-pink-300",
  "vascular-surgery": "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-300",
  hematology: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300",
  neurology: "bg-violet-50 text-violet-500 dark:bg-violet-500/10 dark:text-violet-300",
  orthopedic: "bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300",
  endocrinologists: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300",
  dermatology: "bg-lime-50 text-lime-600 dark:bg-lime-500/10 dark:text-lime-300",
  ophthalmolog: "bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-300",
  rheumatology: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
  ivf: "bg-purple-50 text-purple-500 dark:bg-purple-500/10 dark:text-purple-300",
};

const FALLBACK = "bg-surface2 text-brand-blue dark:text-accent";

export default function DeptIcon({ slug, size = "md", className = "" }) {
  const box = size === "sm" ? "h-11 w-11" : "h-14 w-14";
  const glyph = size === "sm" ? 20 : 26;
  const d = PATHS[slug];

  return (
    <span
      aria-hidden="true"
      className={`flex flex-none items-center justify-center rounded-btn ${box} ${TONES[slug] || FALLBACK} ${className}`}
    >
      <svg
        width={glyph}
        height={glyph}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {d ? <path d={d} /> : <circle cx="12" cy="12" r="7" />}
      </svg>
    </span>
  );
}
