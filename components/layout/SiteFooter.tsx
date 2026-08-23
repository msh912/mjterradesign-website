import Link from 'next/link'
import { nav, site, socials } from '@/content/site'

export default function SiteFooter() {
  return (
    <footer
      className="relative border-t border-line/60 bg-ground/70"
      style={{ zIndex: 'var(--z-content)' }}
    >
      <div className="shell grid gap-12 py-16 sm:py-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[0.95]">
            {site.tagline}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>

        <nav className="flex flex-col gap-2.5">
          <span className="label">Pages</span>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-2.5">
          <span className="label">Elsewhere</span>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-ink-muted transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-line/40 py-6">
        <span className="label">
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="label">Built in Next.js</span>
      </div>
    </footer>
  )
}
