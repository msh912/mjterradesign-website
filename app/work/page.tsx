import type { Metadata } from 'next'
import WorkIndex from '@/components/sections/WorkIndex'
import ContactCta from '@/components/sections/ContactCta'
import PageHeading from '@/components/sections/PageHeading'
import { projects } from '@/content/projects'

export const metadata: Metadata = { title: 'Work' }

export default function WorkPage() {
  return (
    <>
      <PageHeading
        title="Everything"
        lede={`${projects.length} projects, newest first. Nothing curated out.`}
      />
      <WorkIndex projects={projects} />
      <ContactCta />
    </>
  )
}
