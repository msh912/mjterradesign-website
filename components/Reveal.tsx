'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion, EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  /** Stagger direct children instead of animating the wrapper. */
  stagger?: boolean
  y?: number
  blur?: number
  delay?: number
}

/**
 * Scroll reveal that ENHANCES an already-painted element. Nothing here sets
 * an initial hidden state in CSS, so if JS never runs (hidden tab, headless
 * render, reduced motion) the content is still fully visible.
 */
export default function Reveal({
  children,
  className,
  stagger = false,
  y = 26,
  blur = 8,
  delay = 0,
}: Props) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const root = scope.current
      if (!root) return

      const targets = stagger ? Array.from(root.children) : [root]
      if (!targets.length) return

      gsap.from(targets, {
        y,
        opacity: 0,
        filter: `blur(${blur}px)`,
        duration: 1.05,
        delay,
        ease: EASE.out,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: root,
          start: 'top 88%',
          once: true,
        },
      })
    },
    { scope },
  )

  return (
    <div ref={scope} className={cn('reveal', className)}>
      {children}
    </div>
  )
}
