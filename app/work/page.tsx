import type { Metadata } from 'next'
import WorkIndex from '@/components/sections/WorkIndex'
import ContactCta from '@/components/sections/ContactCta'
import PageHeading from '@/components/sections/PageHeading'
import HashScroll from '@/components/HashScroll'
import { byField, projects } from '@/content/projects'

export const metadata: Metadata = { title: 'Work', alternates: { canonical: '/work' } }

export default function WorkPage() {
  return (
    <>
      <HashScroll />

      <PageHeading
        title="Work"
        lede={`${projects.length} projects: territorial strategy, masterplans and a built playground, then the identities and printed work that came out of the same practice.`}
      />

      {/* One section per field, in the order the home page offers them.
          WorkIndex renders nothing for an empty field, so architecture stays
          out of the page until there is work to put in it. */}
      <WorkIndex projects={byField('landscape')} heading="Landscape architecture" id="landscape" />
      <WorkIndex projects={byField('architecture')} heading="Architecture" id="architecture" />
      <WorkIndex projects={byField('graphic')} heading="Graphic design" id="graphic" />

      <ContactCta />
    </>
  )
}
