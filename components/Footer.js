import Link from "next/link";
import { site, nav, departments } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-wrap rounded-t-xl2 bg-brand-bg px-5 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src={site.logo} alt="Assuta" className="mb-4 h-10 w-auto" />
            <p className="text-sm text-brand-ink/70">{site.tagline}. Основана в {site.founded} году.</p>
            <p className="mt-4 text-sm text-brand-ink/70">{site.address}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-brand-blue">Клиника</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-brand-ink/70 hover:text-brand-blue">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-brand-blue">Направления</h4>
            <ul className="space-y-2 text-sm">
              {departments.slice(0, 7).map((d) => (
                <li key={d.slug}>
                  <Link href="/departments" className="text-brand-ink/70 hover:text-brand-blue">{d.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase text-brand-blue">Связаться</h4>
            <ul className="space-y-2 text-sm">
              {site.phones.map((p) => (
                <li key={p.value}>
                  <a href={p.href} className="font-semibold text-brand-ink hover:text-brand-blue">{p.flag} {p.value}</a>
                </li>
              ))}
              {site.messengers.map((m) => (
                <li key={m.label}>
                  <a href={m.href} className="text-brand-green hover:underline">{m.label}: {m.value}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-ink/10 pt-6 text-center text-xs text-brand-ink/50">
          © Assuta, {new Date().getFullYear()}. Демо-версия сайта. Использование материалов допускается только при наличии активной ссылки на источник.
        </div>
      </div>
    </footer>
  );
}
