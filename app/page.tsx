import Hero from '@/components/sections/Hero'
import Statement from '@/components/sections/Statement'
import Fields from '@/components/sections/Fields'
import ContactCta from '@/components/sections/ContactCta'

/**
 * Three texts, then three ways in: the claim over the drawing, then who is
 * making it beside what that is built on, and then the three fields as circles.
 *
 * The work itself is deliberately not listed here. The circles are the way into
 * it, and a "Selected work" run underneath them only offered the same projects a
 * second time, one section later.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Fields />
      <ContactCta />
    </>
  )
}
