import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <div className={`mb-10 ${center ? "mx-auto max-w-2xl" : ""}`}>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h2 className="section-title text-3xl md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-5 text-lg text-brand-ink/60">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
