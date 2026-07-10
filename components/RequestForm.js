"use client";
import { useState } from "react";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";

const COUNTRIES = [
  { code: "IL", flag: "🇮🇱", dial: "+972", min: 8, max: 9 },
  { code: "RU", flag: "🇷🇺", dial: "+7", min: 10, max: 10 },
  { code: "UA", flag: "🇺🇦", dial: "+380", min: 9, max: 9 },
  { code: "KZ", flag: "🇰🇿", dial: "+7", min: 10, max: 10 },
  { code: "US", flag: "🇺🇸", dial: "+1", min: 10, max: 10 },
  { code: "DE", flag: "🇩🇪", dial: "+49", min: 10, max: 11 },
  { code: "GB", flag: "🇬🇧", dial: "+44", min: 10, max: 10 },
  { code: "FR", flag: "🇫🇷", dial: "+33", min: 9, max: 9 },
];

export default function RequestForm({ compact = false }) {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function onPhoneChange(e) {
    // только цифры
    setPhone(e.target.value.replace(/\D/g, "").slice(0, country.max));
    setError("");
  }
  function onCountryChange(e) {
    const c = COUNTRIES.find((x) => x.code === e.target.value);
    setCountry(c);
    setPhone((p) => p.slice(0, c.max));
    setError("");
  }

  function submit(e) {
    e.preventDefault();
    if (phone.length < country.min || phone.length > country.max) {
      setError(t(lang, "phoneError"));
      return;
    }
    // В превью заявка не уходит на сервер. На боевом — на почту/Telegram/CRM.
    setSent(true);
  }

  const inputCls =
    "h-14 w-full rounded-lg border-0 bg-page px-4 text-body shadow-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brand-green";

  if (sent) {
    return (
      <div className="rounded-xl2 bg-surface p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-3xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-title">{t(lang, "sentTitle")}</h3>
        <p className="text-muted">{name ? `${name}, ` : ""}{t(lang, "sentMsg")}</p>
        <p className="mt-3 text-xs text-muted/70">{t(lang, "demoNote")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      <input required placeholder={t(lang, "formName")} value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />

      <div>
        <div className="flex gap-2">
          <div className="relative flex items-center rounded-lg bg-page shadow-sm ring-1 ring-line focus-within:ring-2 focus-within:ring-brand-green">
            <span className="pl-3 text-lg">{country.flag}</span>
            <select
              value={country.code}
              onChange={onCountryChange}
              aria-label="Country"
              className="h-14 appearance-none bg-transparent pl-1.5 pr-6 text-sm font-semibold text-body outline-none"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} style={{ backgroundColor: "rgb(var(--surface))", color: "rgb(var(--text))" }}>{c.dial}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 text-muted">▾</span>
          </div>
          <input
            required
            type="tel"
            inputMode="numeric"
            placeholder={t(lang, "formPhone")}
            value={phone}
            onChange={onPhoneChange}
            className={`${inputCls} flex-1`}
          />
        </div>
        {error && <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>}
      </div>

      {!compact && (
        <textarea placeholder={t(lang, "formComment")} value={comment} onChange={(e) => setComment(e.target.value)}
          className="h-28 w-full rounded-lg border-0 bg-page px-4 py-3 text-body shadow-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brand-green" />
      )}

      <button type="submit" className="btn-blue w-full !py-4">{t(lang, "getConsult")}</button>
      <p className="text-center text-xs text-muted/70">{t(lang, "formPrivacy")}</p>
    </form>
  );
}
