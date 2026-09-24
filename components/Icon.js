// Линейные SVG-иконки вместо эмодзи.
// Эмодзи выглядят по-разному в разных системах и неуместны на медицинском
// сайте; оригинал Ассуты использует именно контурные SVG.
// Все иконки 24×24, рисуются цветом текста (currentColor).

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

const paths = {
  // направления
  oncology: <><path d="M12 21s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.65 12 21 12 21z" /><path d="M12 8V3M9.5 5h5" /></>,
  cardiology: <><path d="M20.4 6.6a4.6 4.6 0 0 0-6.5 0L12 8.5l-1.9-1.9a4.6 4.6 0 1 0-6.5 6.5L12 21l8.4-7.9a4.6 4.6 0 0 0 0-6.5z" /><path d="M3 13h4l1.5-2.5L10 15l1.5-3 1 1.5H17" /></>,
  orthopedic: <><path d="M7 4a2.5 2.5 0 0 0-2 4 2.5 2.5 0 0 0 1 4l4 4a2.5 2.5 0 0 0 4 1 2.5 2.5 0 0 0 4-2" /><path d="M17 20a2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 0-1-4l-4-4a2.5 2.5 0 0 0-4-1 2.5 2.5 0 0 0-4 2" /></>,
  neurosurgery: <><path d="M9 3a4 4 0 0 0-4 4 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3.5 3.5 0 0 0 6 1V4a3 3 0 0 0-3-1z" /><path d="M15 3a4 4 0 0 1 4 4 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3.5 3.5 0 0 1-6 1" /></>,
  urology: <><path d="M12 3s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9z" /><path d="M9.5 13a2.5 2.5 0 0 0 2.5 2.5" /></>,
  gynecologists: <><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></>,
  gastroenterology: <><path d="M8 3v5a4 4 0 0 0 4 4 4 4 0 0 1 4 4v5" /><path d="M5 8h3M16 21h3" /><circle cx="12" cy="8" r="0.6" fill="currentColor" /></>,
  "plastic-surgery": <><path d="M12 3l2.1 4.6 5 .6-3.7 3.4 1 4.9L12 14l-4.4 2.5 1-4.9L4.9 8.2l5-.6L12 3z" /><path d="M6 20h12" /></>,
  ophthalmolog: <><path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="2.6" /></>,
  endocrinologists: <><path d="M9 4c0 3 6 3 6 6s-6 3-6 6 6 3 6 4" /><path d="M7 4h10M7 20h10" /></>,
  "ent-doctors": <><path d="M8 20c0-3-3-4-3-8a7 7 0 0 1 14 0c0 2-1 3-2 3s-2-1-2-2a3 3 0 1 0-3 3" /><path d="M11 16c0 2-1 3-3 4" /></>,
  hematology: <><path d="M12 3s5.5 6 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 9 12 3 12 3z" /><path d="M9.5 12.5a2.5 2.5 0 0 0 2.5 2.5" /></>,

  // преимущества и доверие
  shield: <><path d="M12 3l7.5 3v5.5c0 4.4-3.1 8.4-7.5 9.5-4.4-1.1-7.5-5.1-7.5-9.5V6L12 3z" /><path d="M9 12l2 2 4-4" /></>,
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.9 6.7 19.6l1.1-5.8L3.5 9.7l5.9-.8L12 3.5z" />,
  hospital: <><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /><path d="M12 7v4M10 9h4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18z" /></>,
  doctor: <><circle cx="12" cy="7" r="3.5" /><path d="M5 21v-1.5A5.5 5.5 0 0 1 10.5 14h3a5.5 5.5 0 0 1 5.5 5.5V21" /><path d="M12 14v4M10.5 16h3" /></>,
  microscope: <><path d="M9 4h4l1 6h-6l1-6z" /><path d="M7 16a5 5 0 0 0 10 0" /><path d="M4 21h16M11 16v5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>,
  building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M16 9h2a2 2 0 0 1 2 2v10" /><path d="M8 7h4M8 11h4M8 15h4" /></>,

  // интерфейс
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />,
};

export default function Icon({ name, size = 24, className = "", strokeWidth }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...P}
      strokeWidth={strokeWidth ?? P.strokeWidth}
    >
      {d}
    </svg>
  );
}

// Звёзды рейтинга: отдельный компонент, чтобы не плодить символы ★ в тексте
export function Stars({ value = 5, size = 18, className = "" }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
          fill={i < value ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.9 6.7 19.6l1.1-5.8L3.5 9.7l5.9-.8L12 3.5z" />
        </svg>
      ))}
    </div>
  );
}
