import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeading from '@/components/sections/PageHeading'
import ContactCta from '@/components/sections/ContactCta'
import { site } from '@/content/site'
import {
  bio,
  education,
  experience,
  interests,
  languages,
  tools,
  workshops,
} from '@/content/profile'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <PageHeading
        title="Mohamadjavad Shoori"
        lede={`${site.role} in ${site.location}. ${site.availability}.`}
        portrait={{
          src: '/images/portrait.jpg',
          alt: 'Mohamadjavad Shoori, photographed against a plain grey wall.',
        }}
      />

      <section className="section pt-12">
        <div className="shell grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div data-anim="stagger" className="prose text-[1.08rem]">
              {bio.map((para, i) => (
                <p key={i} className={i === 0 ? 'text-ink' : 'text-ink-muted'}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          <figure className="lg:col-span-4 lg:col-start-9">
            <div data-anim="plate" className="overflow-hidden bg-ground-2">
              <Image
                src="/images/selected-sketches/sketches-right.jpg"
                alt="Pen sketches of a hill town, a monastery, mountain ranges and a cliffside viaduct."
                width={1700}
                height={2200}
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="h-auto w-full"
              />
            </div>
            <figcaption data-anim="meta" className="meta mt-3">
              Selected sketches, 2022–2024
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell grid gap-x-12 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              data-anim="lines"
              className="border-b border-line pb-4 font-display text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.035em]"
            >
              Experience
            </h2>
            <ol data-anim="stagger" className="mt-2">
              {experience.map((e) => (
                <li key={`${e.org}-${e.dates}`} className="border-b border-line py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-[1.15rem] tracking-[-0.02em]">{e.role}</h3>
                    <span className="meta tnum">{e.dates}</span>
                  </div>
                  <p className="mt-1 text-[0.98rem] text-ink-muted">
                    {e.org} — {e.place}
                  </p>
                  <p className="mt-2 text-[0.9rem] text-ink-faint">{e.work}</p>
                </li>
              ))}
            </ol>

            <h2
              data-anim="lines"
              className="mt-16 border-b border-line pb-4 font-display text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.035em]"
            >
              Workshops and seminars
            </h2>
            <ul data-anim="stagger" className="mt-2">
              {workshops.map((w) => (
                <li
                  key={w.title}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
                >
                  <span className="max-w-[46ch] text-[0.98rem]">{w.title}</span>
                  <span className="meta tnum">{w.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            <div data-anim="stagger">
              <h2 className="meta">Education</h2>
              <ul className="mt-4 flex flex-col gap-5">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-[0.98rem]">{e.degree}</p>
                    <p className="mt-1 text-[0.9rem] text-ink-muted">
                      {e.school}, {e.place}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div data-anim="stagger">
              <h2 className="meta">Tools</h2>
              <p className="mt-4 text-[0.95rem] text-ink-muted">{tools.join(' · ')}</p>
            </div>

            <div data-anim="stagger">
              <h2 className="meta">Languages</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 text-[0.95rem]">
                    <span>{l.name}</span>
                    <span className="text-ink-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-anim="stagger">
              <h2 className="meta">Interests</h2>
              <p className="mt-4 text-[0.95rem] text-ink-muted">{interests.join(' · ')}</p>
            </div>
          </aside>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
