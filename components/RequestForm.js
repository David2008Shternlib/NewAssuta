"use client";
import { useState } from "react";
import Link from "@/components/LocaleLink";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";

const NAME_MAX = 100;
const COMMENT_MAX = 500;

const COUNTRIES = [
  { code: "IL", dial: "+972", min: 8, max: 9 },
  { code: "RU", dial: "+7", min: 10, max: 10 },
  { code: "UA", dial: "+380", min: 9, max: 9 },
  { code: "KZ", dial: "+7", min: 10, max: 10 },
  { code: "US", dial: "+1", min: 10, max: 10 },
  { code: "DE", dial: "+49", min: 10, max: 11 },
  { code: "GB", dial: "+44", min: 10, max: 10 },
  { code: "FR", dial: "+33", min: 9, max: 9 },
];

export default function RequestForm({ compact = false }) {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [company, setCompany] = useState(""); // honeypot против ботов
  const [consent, setConsent] = useState(false); // согласие на обработку данных
  const [busy, setBusy] = useState(false);

  function onPhoneChange(e) {
    setPhone(e.target.value.replace(/\D/g, "").slice(0, country.max));
    setErrors((x) => ({ ...x, phone: null }));
  }
  function onCountryChange(e) {
    const c = COUNTRIES.find((x) => x.code === e.target.value);
    setCountry(c);
    setPhone((prev) => prev.slice(0, c.max));
    setErrors((x) => ({ ...x, phone: null }));
  }

  async function submit(e) {
    e.preventDefault();
    const err = {};
    if (!name.trim()) err.name = t(lang, "nameError");
    if (phone.length < country.min || phone.length > country.max) err.phone = t(lang, "phoneError");
    if (!consent) err.consent = t(lang, "consentError");
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: `${country.dial} ${phone}`,
          country: country.code,
          comment,
          company,
          consent: true,
          source: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) {
        // не показываем «Спасибо», если заявка на самом деле не ушла
        setErrors({ form: t(lang, res.status === 429 ? "tooManyError" : "sendError") });
        setBusy(false);
        return;
      }
    } catch (_) {
      setErrors({ form: t(lang, "sendError") });
      setBusy(false);
      return;
    }
    setBusy(false);
    setSent(true);
  }

  const inputCls =
    "h-14 w-full rounded-lg border-0 bg-page px-4 text-body shadow-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brand-green";
  const errCls = "mt-1 text-xs font-semibold text-red-500";
  const counterCls = "mt-1 text-right text-xs text-muted/70";

  if (sent) {
    return (
      <div className="rounded-xl2 bg-surface p-8 text-center shadow-card">
        <h3 className="mb-2 text-xl font-bold text-title">{t(lang, "sentTitle")}</h3>
        <p className="text-muted">{name ? `${name}, ` : ""}{t(lang, "sentMsg")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate>
      {/* honeypot — скрыто от людей, ловит ботов */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" />
      {/* Имя */}
      <div>
        <input
          placeholder={t(lang, "formName")}
          value={name}
          maxLength={NAME_MAX}
          onChange={(e) => { setName(e.target.value.slice(0, NAME_MAX)); setErrors((x) => ({ ...x, name: null })); }}
          className={inputCls}
        />
        <div className="flex justify-between">
          <span className={errCls}>{errors.name || ""}</span>
          <span className={counterCls}>{name.length}/{NAME_MAX}</span>
        </div>
      </div>

      {/* Телефон */}
      <div>
        <div className="flex gap-2">
          <div className="relative flex items-center rounded-lg bg-page shadow-sm ring-1 ring-line focus-within:ring-2 focus-within:ring-brand-green">
            <span className="pl-3 text-xs font-bold uppercase tracking-wide text-muted">{country.code}</span>
            <select value={country.code} onChange={onCountryChange} aria-label="Country"
              className="h-14 appearance-none bg-transparent pl-1.5 pr-6 text-sm font-semibold text-body outline-none">
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} style={{ backgroundColor: "rgb(var(--surface))", color: "rgb(var(--text))" }}>{c.dial}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2 text-muted" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </div>
          <input required type="tel" inputMode="numeric" placeholder={t(lang, "formPhone")} value={phone} onChange={onPhoneChange} className={`${inputCls} flex-1`} />
        </div>
        {errors.phone && <p className={errCls}>{errors.phone}</p>}
      </div>

      {/* Комментарий */}
      {!compact && (
        <div>
          <textarea
            placeholder={t(lang, "formComment")}
            value={comment}
            maxLength={COMMENT_MAX}
            onChange={(e) => setComment(e.target.value.slice(0, COMMENT_MAX))}
            className="h-28 w-full rounded-lg border-0 bg-page px-4 py-3 text-body shadow-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brand-green"
          />
          <div className={counterCls}>{comment.length}/{COMMENT_MAX}</div>
        </div>
      )}

      {/* Согласие на обработку данных — требование закона и аудита */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); setErrors((x) => ({ ...x, consent: null })); }}
            className="mt-0.5 h-5 w-5 flex-none cursor-pointer accent-brand-green"
          />
          <span>
            {t(lang, "consentLabel")}{" "}
            <Link href="/privacy" target="_blank" className="underline hover:text-brand-blue dark:hover:text-accent">
              {t(lang, "consentLink")}
            </Link>
          </span>
        </label>
        {errors.consent && <p className={errCls}>{errors.consent}</p>}
      </div>

      {errors.form && (
        <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">{errors.form}</p>
      )}

      <button type="submit" disabled={busy} className="btn-blue w-full !py-4 disabled:opacity-60">{t(lang, "getConsult")}</button>
    </form>
  );
}
