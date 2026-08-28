import Image from 'next/image'
import Link from 'next/link'

/**
 * The opening plate runs full bleed, edge to edge and behind the header, and the
 * copy sits inside it rather than under it. The sheet dissolves into the page
 * ground at its foot, which is what lets the type sit on the drawing and still
 * clear contrast, and is why the copy and the image read as one thing.
 */
const HERO = {
  src: '/images/healing-garden/concept-sketch.jpg',
  alt: 'Hand-drawn concept plan in pencil and ink, drawn wide across overlaid sheets: site layout with tree canopies, hatched terraces, planting beds and circulation lines, with a red grid study set into the middle of the sheet.',
}

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative w-full">
        {/* The sheet is wide, so at its own proportions it would be a thin band
            on a phone. It gets a share of the screen instead and is cropped to
            its middle, where the plan and the red grid study sit. From lg up it
            fills the opening screen and loses only the bare paper margins. */}
        <div
          data-anim="plate"
          className="relative h-[46svh] min-h-[260px] w-full overflow-hidden bg-ground lg:h-[92svh] lg:min-h-[560px]"
        >
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* The sheet dissolves into the page at the head so the nav always
              clears the pencil work beneath it, whatever the crop lands on. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ground via-ground/70 to-transparent"
          />

          {/* And at the foot, so the headline can live in the drawing.
              Only from lg up, where the copy is actually overlaid. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[42%] bg-gradient-to-t from-ground via-ground/70 to-transparent lg:block"
          />
        </div>

        <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0">
          <div className="shell grid gap-x-12 gap-y-7 pt-9 pb-14 lg:grid-cols-12 lg:pt-0 lg:pb-16">
            <h1
              data-anim="lines"
              className="font-display text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[0.95] tracking-[-0.04em] lg:col-span-7"
            >
              Landscape architecture, drawn by the hand that designed it.
            </h1>

            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p data-anim="rise" className="max-w-[46ch] text-ink-muted">
                I&rsquo;m <strong className="font-semibold text-ink">Mohamadjavad Shoori</strong>,
                an architect and graphic designer in Milan. The masterplan, the
                diagrams, the boards and the identity are one continuous piece of
                work, not four handoffs.
              </p>

              <div data-anim="stagger" className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
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
                <Link
                  href="/contact"
                  className="link-underline text-[0.95rem] text-ink-muted hover:text-ink"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
