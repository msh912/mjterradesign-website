'use client'

import { useEffect } from 'react'
import { useLenis } from '@/components/layout/SmoothScroll'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Lands a `/work#landscape` link on the right section.
 *
 * Lenis runs its own scroll position, so the browser's native hash jump and the
 * smooth scroller disagree about where the page is: the jump happens, then Lenis
 * carries on from where it thought it was. Handing the target to Lenis when it
 * exists keeps the two in agreement, and the native path is kept for reduced
 * motion, where Lenis is never constructed at all.
 *
 * The frame of delay is for layout: images here are unoptimized and carry their
 * intrinsic size, but fonts can still reflow the headings under the target.
 */
export default function HashScroll() {
  const { lenis } = useLenis()

  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return

      const t = window.setTimeout(() => {
        if (lenis) lenis.scrollTo(el, { offset: -92 })
        else el.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }, 80)
      return () => window.clearTimeout(t)
    }

    const cleanup = go()
    window.addEventListener('hashchange', go)
    return () => {
      cleanup?.()
      window.removeEventListener('hashchange', go)
    }
  }, [lenis])

  return null
}
