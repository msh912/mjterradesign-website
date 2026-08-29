import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ContactCta from '@/components/sections/ContactCta'
import Reveal from '@/components/Reveal'
import { getProject, projects, sorted } from '@/content/projects'
import { sizeOf } from '@/content/image-sizes'
import { cn } from '@/lib/utils'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Not found' }

  // Every project shares as its own drawing, hung on the gallery ground at
  // 1200x630 under `public/og/`. Generated from the cover by `npm run og`,
  // contained rather than cropped, because a portrait board cropped to 1.91:1
  // shows only a sliver. If the card was never generated, fall back to the cover
  // itself rather than pointing a crawler at a 404.
  const card = `/og/${project.slug}.jpg`
  const hasCard = existsSync(path.join(process.cwd(), 'public', card))
  const image = {
    url: hasCard ? card : project.cover,
    ...(hasCard ? { width: 1200, height: 630 } : sizeOf(project.cover)),
    alt: project.coverAlt,
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title}${project.subtitle ? `. ${project.subtitle}` : ''}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: 'article',
      images: [image],
    },
    twitter: { card: 'summary_large_image', images: [image] },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const order = sorted()
  const index = order.findIndex((p) => p.slug === slug)
  const next = order[(index + 1) % order.length]

  const facts: { label: string; value: string }[] = [
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.yearLabel ?? String(project.year) },
    ...(project.context ? [{ label: project.academic ? 'Studio' : 'Client', value: project.context }] : []),
    ...(project.professors?.length
      ? [{ label: project.professors.length > 1 ? 'Professors' : 'Professor', value: project.professors.join(' · ') }]
      : []),
    ...(project.collaboration ? [{ label: 'Format', value: project.collaboration }] : []),
    { label: 'My role', value: project.role.join(' · ') },
    { label: 'Tools', value: project.tools.join(' · ') },
  ]

  return (
    <>
      <article>
        <header className="pt-32 sm:pt-40">
          <div className="shell">
            <h1
              data-anim="lines"
              className="max-w-[18ch] font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
              {project.title}
            </h1>
            {project.subtitle && (
              <p data-anim="rise" className="mt-4 max-w-[34ch] font-display text-[clamp(1.2rem,2.6vw,1.9rem)] tracking-[-0.03em] text-ink-faint">
                {project.subtitle}
              </p>
            )}
            <p data-anim="rise" className="mt-7 max-w-[58ch] text-[1.08rem] text-ink-muted">
              {project.summary}
            </p>
          </div>

          <figure className="shell mt-14">
            <div data-anim="plate" className="mx-auto max-w-6xl overflow-hidden bg-ground-2">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                width={sizeOf(project.cover).width}
                height={sizeOf(project.cover).height}
                priority
                sizes="(max-width: 1152px) 100vw, 72rem"
                className="h-auto w-full"
              />
            </div>
          </figure>
        </header>

        <section className="section pt-16">
          <div className="shell grid gap-x-12 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div data-anim="stagger" className="prose text-[1.06rem]">
                {project.body.map((para, i) => (
                  <p key={i} className={i === 0 ? 'text-ink' : 'text-ink-muted'}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal anim="stagger">
                <dl className="border-t border-line">
                  {facts.map((f) => (
                    <div key={f.label} className="flex flex-col gap-1 border-b border-line py-4">
                      <dt className="meta">{f.label}</dt>
                      <dd className="text-[0.95rem]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {project.academic && (
                  <p className="mt-5 text-[0.85rem] text-ink-muted">
                    Academic work. My contribution is listed above; the rest of the
                    studio group did the rest.
                  </p>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className="section pt-0">
            <div className="shell grid gap-x-10 gap-y-16 sm:grid-cols-2">
              {project.gallery.map((item) => {
                const size = sizeOf(item.src)
                const wide = size.width / size.height >= 1.35
                return (
                <figure
                  key={item.src}
                  className={cn(wide && 'sm:col-span-2')}
                >
                  <div data-anim="plate" className="overflow-hidden bg-ground-2">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={size.width}
                      height={size.height}
                      sizes={wide ? '(max-width: 640px) 100vw, 88rem' : '(max-width: 640px) 100vw, 44rem'}
                      className="h-auto w-full"
                    />
                  </div>
                  {item.caption && (
                    <figcaption data-anim="meta" className="meta mt-3">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
                )
              })}
            </div>
          </section>
        )}
      </article>

      <section className="pb-4">
        <div className="shell">
          <Link
            href={`/work/${next.slug}`}
            data-anim="stagger"
            className="group flex flex-col gap-2 border-t border-line pt-8"
          >
            <span className="meta">Next project</span>
            <span className="font-display text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.95] tracking-[-0.035em] transition-colors duration-500 group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
