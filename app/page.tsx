import Hero from '@/components/sections/Hero'
import Statement from '@/components/sections/Statement'
import Practice from '@/components/sections/Practice'
import Fields from '@/components/sections/Fields'
import ContactCta from '@/components/sections/ContactCta'

/**
 * Three texts, then three ways in: the claim over the drawing, who is making it,
 * what that is built on, and then the three fields as circles.
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
      <Practice />
      <Fields />
      <ContactCta />
    </>
  )
}
