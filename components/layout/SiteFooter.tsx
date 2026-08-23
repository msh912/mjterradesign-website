import Link from 'next/link'
import { nav, site, socials } from '@/content/site'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-semibold tracking-[-0.035em]">{site.name}</p>
          <p className="mt-3 max-w-sm text-ink-muted">
            {site.person} — {site.role.toLowerCase()} in {site.location}. {site.availability}.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-6 inline-block text-accent"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="meta">Pages</h2>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline w-fit text-ink-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="meta">Elsewhere</h2>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit text-ink-muted hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-line py-6">
        <p className="meta">
          © {new Date().getFullYear()} {site.person}
        </p>
        <p className="meta">{site.location}</p>
      </div>
    </footer>
  )
}
