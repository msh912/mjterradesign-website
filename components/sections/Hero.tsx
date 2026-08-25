import Image from 'next/image'
import Link from 'next/link'

/**
 * The opening plate runs full bleed across the top of the site, edge to edge and
 * behind the header, so the drawing is the first thing on the page. The copy
 * follows beneath it rather than sitting beside it.
 */
const HERO = {
  src: '/images/healing-garden/concept-sketch.jpg',
  alt: 'Hand-drawn concept plan in pencil and ink: overlaid sheets of a site layout with tree canopies, hatched terraces, planting beds and circulation lines, and a small red grid study at the foot of the sheet.',
}

export default function Hero() {
  return (
    <section className="relative">
      {/* The drawing's paper white is normalised to the page ground at publish
          time, so the sheet meets the page with no visible seam. On narrow
          screens the frame takes the drawing's own proportions and fits it
          exactly; from lg up it becomes a tall band with the sheet centred, the
          surplus white reading as page rather than as letterboxing. */}
      <div
        data-anim="plate"
        className="relative aspect-[894/1000] w-full overflow-hidden bg-ground lg:aspect-auto lg:h-[86svh] lg:min-h-[420px]"
      >
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <div className="shell grid gap-x-12 gap-y-8 pt-14 pb-16 lg:grid-cols-12 lg:pb-24">
        <h1
          data-anim="lines"
          className="font-display text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[0.95] tracking-[-0.04em] lg:col-span-7"
        >
          Landscape architecture, drawn by the hand that designed it.
        </h1>

        <div className="lg:col-span-4 lg:col-start-9">
          <p data-anim="rise" className="max-w-[46ch] text-ink-muted">
            I&rsquo;m Mohamadjavad Shoori, an architect and graphic designer in Milan.
            The masterplan, the diagrams, the boards and the identity are one
            continuous piece of work, not four handoffs.
          </p>

          <div data-anim="stagger" className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-[0.95rem] transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              See the work
              <span
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </Link>
            <Link href="/contact" className="link-underline text-[0.95rem] text-ink-muted hover:text-ink">
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
