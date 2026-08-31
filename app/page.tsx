import Hero from '@/components/sections/Hero'
import Statement from '@/components/sections/Statement'
import Practice from '@/components/sections/Practice'
import Fields from '@/components/sections/Fields'
import WorkIndex from '@/components/sections/WorkIndex'
import ContactCta from '@/components/sections/ContactCta'
import { featuredProjects } from '@/content/projects'

/**
 * Three texts, then three ways in: the claim over the drawing, who is making it,
 * what that is built on, and then the three fields as circles.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Practice />
      <Fields />
      <WorkIndex projects={featuredProjects()} heading="Selected work" />
      <ContactCta />
    </>
  )
}
