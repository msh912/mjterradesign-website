import Link from 'next/link'
import Reveal from '@/components/Reveal'
import type { Project } from '@/content/projects'

/**
 * Index rows, not a card grid. Rows let the type carry the work and scale to
 * any number of projects; identical repeated cards would flatten them.
 */
export default function WorkIndex({
  projects,
  heading,
}: {
  projects: Project[]
  heading?: string
}) {
  return (
    <section className="section">
      <div className="shell">
        {heading && (
          <Reveal>
            <h2 className="mb-14 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink-muted">
              {heading}
            </h2>
          </Reveal>
        )}

        <ul className="border-t border-line/60">
          {projects.map((project) => (
            <li key={project.slug} className="border-b border-line/60">
              <Link
                href={`/work/${project.slug}`}
                className="group grid gap-3 py-8 transition-colors sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10 sm:py-10"
              >
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,5vw,3.6rem)] leading-[0.95] transition-colors duration-500 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-ink-muted">{project.summary}</p>
                </div>

                <div className="flex items-baseline gap-5 sm:flex-col sm:items-end sm:gap-2 sm:text-right">
                  <span className="label">{project.year}</span>
                  <span className="label">{project.disciplines.join(' · ')}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
