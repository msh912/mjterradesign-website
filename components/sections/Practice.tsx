import Link from 'next/link'

/**
 * The third text. Where `Statement` makes the claim, this one backs it: the
 * degree, the years, and the range the work actually covers. Set in body size
 * against the display-size statement above it, so the two do not compete.
 */
export default function Practice() {
  return (
    <section className="section border-t border-line">
      <div className="shell grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <div data-anim="stagger" className="prose text-ink-muted lg:col-span-7">
          <p>
            I hold an M.Arch in Landscape Architecture from Politecnico di Milano
            and have spent roughly seven years working as a graphic designer
            alongside architecture practice: brand books, catalogues and
            interfaces in the same weeks as masterplans and site analysis.
          </p>
          <p>
            The work runs from territorial strategy across the Po plain to a
            playground under construction in Tehran, and from a thesis on the
            Niger Delta to the identities that present it.
          </p>
          <p>
            <Link href="/about" className="link-underline text-[0.95rem] text-accent">
              More about how I work
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
