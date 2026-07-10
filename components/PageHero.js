import Link from "next/link";
import Reveal from "./Reveal";

export default function PageHero({ title, subtitle, crumb }) {
  return (
    <section className="border-b border-brand-blue/10 bg-brand-bg py-14">
      <div className="wrap">
        <Reveal>
          <nav className="mb-4 text-sm text-brand-ink/40">
            <Link href="/" className="hover:text-brand-blue">Главная</Link>
            {crumb && <> / <span className="text-brand-green">{crumb}</span></>}
          </nav>
          <h1 className="section-title text-3xl md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-brand-ink/60">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
