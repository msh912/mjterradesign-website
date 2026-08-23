import Link from 'next/link'

export default function Statement() {
  return (
    <section className="section border-t border-line">
      <div className="shell grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p
            data-anim="lines"
            className="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] leading-[1.12] tracking-[-0.035em]"
          >
            Most landscape practices send their drawings out to be made
            presentable. Most people who can make a drawing presentable cannot
            read a site plan. I do both, which is why the argument and the
            image in my projects say the same thing.
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div data-anim="stagger" className="prose text-ink-muted">
            <p>
              I hold an M.Arch in Landscape Architecture from Politecnico di
              Milano and have spent roughly seven years working as a graphic
              designer alongside architecture practice — brand books, catalogues
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
