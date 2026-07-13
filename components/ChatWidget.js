"use client";
import { useState } from "react";
import { useLang } from "./LangProvider";

const txt = {
  title: { ru: "Онлайн-консультант", en: "Online consultant" },
  online: { ru: "Операторы онлайн", en: "Operators online" },
  greeting: {
    ru: "Здравствуйте! 👋 Чем можем помочь? Задайте вопрос — ответим в течение пары минут.",
    en: "Hello! 👋 How can we help? Ask a question — we'll reply within a couple of minutes.",
  },
  reply: {
    ru: "Спасибо за сообщение! Наш координатор скоро ответит. Вы также можете оставить заявку — и мы перезвоним.",
    en: "Thanks for your message! Our coordinator will reply shortly. You can also leave a request and we'll call you back.",
  },
  placeholder: { ru: "Введите сообщение", en: "Type a message" },
  quick: {
    ru: ["Здравствуйте!", "Мне нужна помощь", "Узнать цены", "Записаться на приём"],
    en: ["Hello!", "I need help", "Ask about prices", "Book an appointment"],
  },
};

export default function ChatWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: txt.greeting.en }]);
  const [input, setInput] = useState("");

  function send(text) {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { from: "bot", text: txt.reply[lang] }]), 700);
  }

  return (
    <>
      {/* Панель чата */}
      <div className={`fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm origin-bottom-right transition-all duration-300 sm:right-6 ${open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
        <div className="flex h-[28rem] max-h-[70vh] flex-col overflow-hidden rounded-xl2 border border-line bg-surface shadow-soft">
          <div className="flex items-center justify-between bg-brand-blue px-5 py-4 text-white">
            <div>
              <div className="font-bold">{txt.title[lang]}</div>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-green" />{txt.online[lang]}
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-xl leading-none text-white/80 hover:text-white">✕</button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface2 p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${m.from === "user" ? "bg-brand-blue text-white" : "border border-line bg-surface text-body"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-line bg-surface px-4 pt-3">
            {txt.quick[lang].map((q) => (
              <button key={q} onClick={() => send(q)} className="rounded-pill border border-brand-green/40 px-3 py-1 text-xs font-semibold text-brand-greenDark transition-colors hover:bg-brand-green hover:text-white dark:text-accent">
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 bg-surface p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={txt.placeholder[lang]}
              className="h-11 flex-1 rounded-pill bg-surface2 px-4 text-sm text-body outline-none ring-1 ring-line focus:ring-2 focus:ring-brand-green" />
            <button type="submit" aria-label="Send" className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-blue text-white transition-colors hover:bg-brand-green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      </div>

      {/* Кнопка */}
      <button onClick={() => setOpen((v) => !v)} aria-label="Chat"
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-soft transition-transform hover:scale-105 sm:right-6">
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-brand-green" />}
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        )}
      </button>
    </>
  );
}
