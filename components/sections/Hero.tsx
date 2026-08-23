import Image from 'next/image'
import Link from 'next/link'
import { getProject } from '@/content/projects'
import { sizeOf } from '@/content/image-sizes'

/**
 * Gallery opening: the plate bleeds toward the edge and the headline rises
 * line by line out from behind its own baseline.
 */
export default function Hero() {
  const lead = getProject('hidden-illusion-of-bygone-landscape')

  return (
    <section className="relative">
      <div className="shell grid items-end gap-x-12 gap-y-10 pt-32 pb-16 sm:pt-40 lg:grid-cols-12 lg:pt-44 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-5">
          <h1
            data-anim="lines"
            className="font-display text-[clamp(2.6rem,6.6vw,5.4rem)] leading-[0.93] tracking-[-0.04em]"
          >
            Landscape architecture, drawn by the hand that designed it.
          </h1>

          <p data-anim="rise" className="mt-8 max-w-[46ch] text-ink-muted">
            I&rsquo;m Mohamadjavad Shoori — an architect and graphic designer in Milan.
            The masterplan, the diagrams, the boards and the identity are one
            continuous piece of work, not four handoffs.
          </p>

          <div data-anim="stagger" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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

        {lead && (
          <figure className="lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <div data-anim="plate" className="overflow-hidden bg-ground-2">
              <Image
                src={lead.cover}
                alt={lead.coverAlt}
                width={sizeOf(lead.cover).width}
                height={sizeOf(lead.cover).height}
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption data-anim="meta" className="meta mt-3 flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-ink">{lead.title}</span>
              <span>{lead.location}</span>
              <span>{lead.yearLabel ?? lead.year}</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
