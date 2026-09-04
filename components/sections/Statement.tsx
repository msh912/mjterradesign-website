import Link from 'next/link'
import NamePortrait from '@/components/NamePortrait'

/**
 * The second and third texts, side by side rather than stacked.
 *
 * Left is the claim, set large in the display face and carrying the name
 * itself. Right is what backs it, in body size, so the two do not compete for
 * the same voice while still being read as one thought.
 *
 * The bolding follows MJ's own idiom in the printed book, where the discipline
 * nouns and the credential are the words set heavy and everything else carries
 * them.
 */
export default function Statement() {
  return (
    <section className="section border-t border-line">
      <div className="shell grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p
            data-anim="rise"
            className="max-w-[20ch] font-display text-[clamp(1.9rem,4.4vw,3.3rem)] leading-[1.06] tracking-[-0.035em] text-ink"
          >
            I&rsquo;m <NamePortrait>Mohamadjavad Shoori</NamePortrait>, an architect
            and graphic designer in Milan.
          </p>

          <p data-anim="rise" className="mt-8 max-w-[44ch] text-ink-muted">
            The masterplan, the diagrams, the boards and the identity are one
            continuous piece of work, not four handoffs.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
          <div data-anim="stagger" className="prose text-ink-muted">
            <p>
              I hold an{' '}
              <strong className="font-semibold text-ink">
                M.Arch in Landscape Architecture
              </strong>{' '}
              from{' '}
              <strong className="font-semibold text-ink">Politecnico di Milano</strong> and
              have spent roughly{' '}
              <strong className="font-semibold text-ink">seven years</strong> working as a{' '}
              <strong className="font-semibold text-ink">graphic designer</strong> alongside
              architecture practice: brand books, catalogues and interfaces in the
              same weeks as{' '}
              <strong className="font-semibold text-ink">masterplans</strong> and{' '}
              <strong className="font-semibold text-ink">site analysis</strong>.
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
