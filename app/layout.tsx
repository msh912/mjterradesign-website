import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk, Martian_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import ShaderBackgroundClient from '@/components/effects/ShaderBackgroundClient'
import AuroraEdge from '@/components/effects/AuroraEdge'
import { site } from '@/content/site'

// Contrast axis: expressive variable display against a humanist body,
// with a technical mono for small structural labels only.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

const martian = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-martian',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d1a16',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${martian.variable}`}
      // Baked inline so the very first paint is the ground, not white.
      style={{ backgroundColor: '#0d1a16' }}
    >
      <body>
        <ShaderBackgroundClient />
        <AuroraEdge />
        <SmoothScroll>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  )
}
