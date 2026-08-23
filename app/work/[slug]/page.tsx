import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHeading from '@/components/sections/PageHeading'
import ContactCta from '@/components/sections/ContactCta'
import Reveal from '@/components/Reveal'
import { getProject, projects } from '@/content/projects'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Not found' }
  return { title: project.title, description: project.summary }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <PageHeading
        title={project.title}
        lede={project.summary}
        meta={[
          { label: 'Year', value: String(project.year) },
          { label: 'Role', value: project.role },
          ...(project.client ? [{ label: 'Client', value: project.client }] : []),
          { label: 'Discipline', value: project.disciplines.join(', ') },
        ]}
      />

      <section className="section">
        <div className="shell">
          <Reveal stagger className="flex max-w-2xl flex-col gap-6 text-ink-muted">
            {project.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>

          {project.facts && project.facts.length > 0 && (
            <Reveal className="mt-16">
              <dl className="flex flex-wrap gap-x-16 gap-y-6 border-t border-line/60 pt-8">
                {project.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="label">{f.label}</dt>
                    <dd className="mt-2 font-display text-3xl">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
              {project.gallery.map((item) => (
                <Reveal key={item.src}>
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.alt} className="w-full" />
                    {item.caption && (
                      <figcaption className="label mt-3">{item.caption}</figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-2 border-t border-line/60 pt-8"
          >
            <span className="label">Next</span>
            <span className="font-display text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.95] transition-colors duration-500 group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
