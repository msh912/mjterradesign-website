'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, site } from '@/content/site'
import { cn } from '@/lib/utils'

export default function SiteHeader() {
  const pathname = usePathname()
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0"
      style={{ zIndex: 'var(--z-header)' }}
    >
      <div className="shell flex items-center justify-between gap-6 py-4 sm:py-5">
        <Link
          href="/"
          className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-ink"
        >
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        {/* The one deliberate glass surface on the site. */}
        <nav
          className={cn(
            'flex items-center gap-1 rounded-full px-1.5 py-1.5 transition-[background-color,border-color,backdrop-filter] duration-500',
            lifted
              ? 'border border-line/70 bg-ground-2/55 backdrop-blur-[22px] backdrop-saturate-150'
              : 'border border-transparent bg-transparent',
          )}
        >
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300',
                  active ? 'text-ground' : 'text-ink-muted hover:text-ink',
                )}
                style={active ? { backgroundColor: 'var(--color-accent)' } : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
