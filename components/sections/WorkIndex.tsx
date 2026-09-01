import { existsSync } from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { cn } from '@/lib/utils'

/**
 * A field's work, as a row of circles.
 *
 * The circle is the site's way of naming a body of work: the home page offers
 * the three fields as circles, and opening one hands you the same shape again,
 * once per project. The row wraps rather than scrolling sideways, so nothing is
 * hidden off the edge of a phone.
 *
 * Each circle is a square centre crop built by `npm run og` into `public/thumbs`,
 * not the cover itself. `next.config.ts` sets `images.unoptimized`, so pointing
 * these at the covers would pull several hundred KB per project to draw it the
 * size of a coin. The full plate is on the project page, which is where the work
 * is actually meant to be looked at.
 */
export default function WorkIndex({
  projects,
  heading,
  id,
}: {
  projects: Project[]
  heading?: string
  id?: string
}) {
  if (!projects.length) return null

  return (
    <section className={cn('section', id && 'scroll-mt-28')} id={id}>
      <div className="shell">
        {heading && (
          <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <h2
              data-anim="lines"
              className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] tracking-[-0.035em]"
            >
              {heading}
            </h2>
            <span data-anim="meta" className="meta tnum">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        )}

        <ul
          data-anim="stagger"
          className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12"
        >
          {projects.map((p, i) => {
            // A missing thumb would draw a broken circle, which is worse than a
            // heavy one, so fall back to the cover rather than trusting the file.
            const thumb = `/thumbs/${p.slug}.jpg`
            const src = existsSync(path.join(process.cwd(), 'public', thumb)) ? thumb : p.cover

            return (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="group block text-center">
                  <span className="relative mx-auto block aspect-square w-full max-w-[15rem] overflow-hidden rounded-full bg-ground-2 ring-1 ring-line transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:ring-accent">
                    <Image
                      src={src}
                      alt={p.coverAlt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15rem"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </span>

                  <span className="mt-6 block">
                    <span className="block font-display text-[clamp(1.05rem,1.7vw,1.35rem)] leading-[1.12] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                      {p.title}
                    </span>

                    <span className="meta mt-2.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                      <span>{p.location}</span>
                      <span aria-hidden className="text-line-strong">
                        /
                      </span>
                      <span className="tnum">{p.yearLabel ?? p.year}</span>
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
