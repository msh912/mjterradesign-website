import Hero from '@/components/sections/Hero'
import Statement from '@/components/sections/Statement'
import WorkIndex from '@/components/sections/WorkIndex'
import ContactCta from '@/components/sections/ContactCta'
import { featuredProjects } from '@/content/projects'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <WorkIndex projects={featuredProjects()} heading="Selected work" />
      <ContactCta />
    </>
  )
}
