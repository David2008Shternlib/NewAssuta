"use client";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";

// Медицинский дисклеймер. Требование аудита для страниц болезней и врачей:
// материал информационный, оператор — не больница.
export default function MedicalDisclaimer({ className = "" }) {
  const { lang } = useLang();
  return (
    <aside
      className={`rounded-xl2 border border-line bg-surface2 p-5 text-sm leading-relaxed text-muted ${className}`}
      role="note"
    >
      <p className="mb-1 font-bold uppercase tracking-wide text-title">{t(lang, "medDisclaimerTitle")}</p>
      <p>{t(lang, "medDisclaimer")}</p>
    </aside>
  );
}
