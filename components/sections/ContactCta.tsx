import { site } from '@/content/site'

export default function ContactCta() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <h2
          data-anim="lines"
          className="max-w-[18ch] font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.95] tracking-[-0.04em]"
        >
          Have a site, a brief, or a problem with a landscape in it?
        </h2>

        <div data-anim="stagger" className="mt-10 flex flex-col gap-3">
          <a
            href={`mailto:${site.email}`}
            className="link-underline w-fit font-display text-[clamp(1.3rem,3vw,2rem)] tracking-[-0.03em] text-accent"
          >
            {site.email}
          </a>
          <a
            href={`tel:${site.phoneHref}`}
            className="link-underline tnum w-fit text-ink-muted hover:text-ink"
          >
            {site.phone}
          </a>
        </div>

        <p data-anim="meta" className="meta mt-8">
          {site.location} — {site.availability}
        </p>
      </div>
    </section>
  )
}
