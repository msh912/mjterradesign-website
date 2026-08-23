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
    const onScroll = () => setLifted(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 border-b transition-[background-color,border-color] duration-500',
        lifted ? 'border-line bg-ground/92 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
      style={{ zIndex: 'var(--z-header)' }}
    >
      <div className="shell flex items-baseline justify-between gap-6 py-5">
        <Link href="/" className="group font-display text-[1.05rem] font-semibold tracking-[-0.03em]">
          {site.name}
        </Link>

        <nav className="flex items-baseline gap-6 sm:gap-8">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'link-underline text-[0.9rem] transition-colors duration-300',
                  active ? 'text-accent' : 'text-ink-muted hover:text-ink',
                )}
                style={active ? { backgroundSize: '100% 1px' } : undefined}
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
