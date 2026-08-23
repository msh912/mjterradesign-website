import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk, Martian_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import { site } from '@/content/site'

// Contrast axis: expressive variable display against a humanist body,
// with a technical mono for small structural metadata only.
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
  themeColor: '#fafafa',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${martian.variable}`}
      // Baked inline so the very first paint is the gallery ground.
      style={{ backgroundColor: '#fafafa' }}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-40 focus:bg-ink focus:px-4 focus:py-2 focus:text-ground"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  )
}
