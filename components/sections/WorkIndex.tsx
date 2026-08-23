import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { sizeOf } from '@/content/image-sizes'
import { cn } from '@/lib/utils'

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
    <section className="section" id={id}>
      <div className="shell">
        {heading && (
          <div className="mb-14 flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] tracking-[-0.035em]">
              {heading}
            </h2>
            <span className="meta tnum">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        )}

        {/* Plates keep their own proportions — a gallery does not crop the work. */}
        <ul className="grid items-start gap-x-12 gap-y-20 sm:grid-cols-2 lg:gap-y-28">
          {projects.map((p, i) => {
            const size = sizeOf(p.cover)
            // The artwork sets the rhythm: landscape spreads take the full
            // measure, upright pages sit in a column so they stay readable.
            const wide = size.width / size.height >= 1.35
            return (
              <li key={p.slug} className={cn(wide && 'sm:col-span-2')}>
                <Link href={`/work/${p.slug}`} className="group block">
                  <div className={cn('overflow-hidden bg-ground-2', wide && 'mx-auto max-w-5xl')}>
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      width={size.width}
                      height={size.height}
                      priority={i === 0}
                      sizes={wide ? '(max-width: 640px) 100vw, 64rem' : '(max-width: 640px) 100vw, 40rem'}
                      className="plate-in h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className={cn('mt-5', wide && 'mx-auto max-w-5xl')}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3
                        className={cn(
                          'font-display tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent',
                          wide
                            ? 'text-[clamp(1.6rem,3.4vw,2.6rem)]'
                            : 'text-[clamp(1.35rem,2.4vw,1.8rem)]',
                        )}
                      >
                        {p.title}
                      </h3>
                      {p.subtitle && <span className="text-ink-faint">{p.subtitle}</span>}
                    </div>

                    <p className="mt-2 max-w-[58ch] text-ink-muted">{p.summary}</p>

                    <p className="meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{p.location}</span>
                      <span aria-hidden className="text-line-strong">
                        /
                      </span>
                      <span className="tnum">{p.yearLabel ?? p.year}</span>
                      {p.academic && (
                        <>
                          <span aria-hidden className="text-line-strong">
                            /
                          </span>
                          <span>Academic</span>
                        </>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
