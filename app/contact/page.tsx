import type { Metadata } from 'next'
import PageHeading from '@/components/sections/PageHeading'
import { site, socials } from '@/content/site'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <>
      <PageHeading
        title="Start a project"
        lede="Commissions, collaborations, competition teams, or a question about something in the archive. Email is the fastest way to reach me."
      />

      <section className="section pt-12">
        <div className="shell grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div data-anim="stagger">
              <a
                href={`mailto:${site.email}`}
                className="link-underline block w-fit font-display text-[clamp(1.5rem,4.4vw,3rem)] leading-[1.05] tracking-[-0.035em] text-accent"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="link-underline tnum mt-6 block w-fit text-[1.1rem] text-ink-muted hover:text-ink"
              >
                {site.phone}
              </a>
              <p className="prose mt-10 text-ink-muted">
                If you are writing about a site, tell me where it is and what is
                wrong with it now. If you are writing about a role, the CV is on
                the about page and I am happy to send a PDF portfolio.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
            <div data-anim="stagger">
              <h2 className="meta">Elsewhere</h2>
              <ul className="mt-4 border-t border-line">
                {socials.map((s) => (
                  <li key={s.label} className="border-b border-line">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-3.5 text-[0.98rem] text-ink-muted transition-colors duration-300 hover:text-ink"
                    >
                      {s.label}
                      <span
                        aria-hidden
                        className="text-ink-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        &#8599;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-anim="stagger">
              <h2 className="meta">Based</h2>
              <p className="mt-3 text-[0.98rem]">{site.location}</p>
              <p className="mt-1 text-[0.9rem] text-ink-muted">{site.availability}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
