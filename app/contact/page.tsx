import type { Metadata } from 'next'
import PageHeading from '@/components/sections/PageHeading'
import Reveal from '@/components/Reveal'
import { site, socials } from '@/content/site'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <>
      <PageHeading
        title="Get in touch"
        lede="Commissions, collaborations, or a question about a project below."
      />

      <section className="section">
        <div className="shell grid gap-12 md:grid-cols-2">
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-[1] text-accent underline-offset-8 hover:underline"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal stagger className="flex flex-col gap-3">
            <span className="label">Elsewhere</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-fit text-ink-muted transition-colors hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
