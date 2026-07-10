"use client";
import { useState } from "react";

export default function RequestForm({ compact = false }) {
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: "", phone: "", comment: "" });

  function submit(e) {
    e.preventDefault();
    // В превью заявка не уходит на сервер. На боевом сайте — отправка на почту/Telegram/CRM.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl2 bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-3xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-brand-blue">Заявка отправлена</h3>
        <p className="text-brand-ink/70">Спасибо, {data.name || "здравствуйте"}! Наш координатор свяжется с вами в ближайшее время.</p>
        <p className="mt-3 text-xs text-brand-ink/40">Демо-режим: на рабочем сайте заявка уходит на почту и в Telegram.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        required
        placeholder="Ваше имя"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="h-14 w-full rounded-lg border-0 bg-white px-4 text-brand-ink shadow-sm outline-none ring-1 ring-brand-blue/10 focus:ring-2 focus:ring-brand-green"
      />
      <input
        required
        type="tel"
        placeholder="Телефон"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        className="h-14 w-full rounded-lg border-0 bg-white px-4 text-brand-ink shadow-sm outline-none ring-1 ring-brand-blue/10 focus:ring-2 focus:ring-brand-green"
      />
      {!compact && (
        <textarea
          placeholder="Кратко опишите ситуацию (необязательно)"
          value={data.comment}
          onChange={(e) => setData({ ...data, comment: e.target.value })}
          className="h-28 w-full rounded-lg border-0 bg-white px-4 py-3 text-brand-ink shadow-sm outline-none ring-1 ring-brand-blue/10 focus:ring-2 focus:ring-brand-green"
        />
      )}
      <button type="submit" className="btn-blue w-full !py-4">Получить консультацию</button>
      <p className="text-center text-xs text-brand-ink/40">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}
