import type { Metadata } from 'next'
import PageHeading from '@/components/sections/PageHeading'
import ContactCta from '@/components/sections/ContactCta'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = { title: 'About' }

// PLACEHOLDER copy — replace with the real bio.
const BIO = [
  'Two or three paragraphs of who you are and how you work. Written in your own voice, not a résumé summary.',
  'What you keep returning to. What you refuse to compromise on. Where the work comes from.',
]

export default function AboutPage() {
  return (
    <>
      <PageHeading title="About" />

      <section className="section">
        <div className="shell grid gap-14 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-24">
          <Reveal stagger className="flex max-w-2xl flex-col gap-6 text-[1.1rem] text-ink-muted">
            {BIO.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>

          <Reveal className="flex flex-col gap-8">
            <div>
              <span className="label">Practice</span>
              <p className="mt-2">Design · Build · Direction</p>
            </div>
            <div>
              <span className="label">Based</span>
              <p className="mt-2">Add location</p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
