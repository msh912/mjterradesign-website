import Link from 'next/link'

export default function Statement() {
  return (
    <section className="section border-t border-line">
      <div className="shell grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div data-anim="stagger" className="prose text-ink-muted">
            <p>
              I hold an M.Arch in Landscape Architecture from Politecnico di
              Milano and have spent roughly seven years working as a graphic
              designer alongside architecture practice: brand books, catalogues
              and interfaces in the same weeks as masterplans and site analysis.
            </p>
            <p>
              The work below runs from territorial strategy across the Po plain
              to a playground under construction in Tehran.
            </p>
            <p>
              <Link href="/about" className="link-underline text-[0.95rem] text-accent">
                More about how I work
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
