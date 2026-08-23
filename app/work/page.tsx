import type { Metadata } from 'next'
import WorkIndex from '@/components/sections/WorkIndex'
import ContactCta from '@/components/sections/ContactCta'
import PageHeading from '@/components/sections/PageHeading'
import { byField, projects } from '@/content/projects'

export const metadata: Metadata = { title: 'Work' }

export default function WorkPage() {
  const landscape = byField('landscape')
  const graphic = byField('graphic')

  return (
    <>
      <PageHeading
        title="Work"
        lede={`${projects.length} projects — territorial strategy, masterplans and a built playground, then the identities and printed work that came out of the same practice.`}
      />

      <WorkIndex projects={landscape} heading="Landscape and architecture" id="landscape" />
      <WorkIndex projects={graphic} heading="Graphic design" id="graphic" />

      <ContactCta />
    </>
  )
}
