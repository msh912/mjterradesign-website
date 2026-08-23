'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion, EASE } from '@/lib/motion'

const TEXT =
  'I design things that have to stand up in the real world — and then I build them.'

export default function Statement() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Words resolve from dim to full as the block crosses the viewport.
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 78%',
            end: 'bottom 58%',
            scrub: 0.6,
          },
        },
      )
    },
    { scope },
  )

  return (
    <section ref={scope} className="section section--veiled">
      <div className="shell">
        <p className="max-w-[24ch] font-display text-[clamp(1.9rem,5.2vw,4.2rem)] leading-[1.02] tracking-[-0.04em] md:max-w-[18ch]">
          {TEXT.split(' ').map((word, i) => (
            <span key={`${word}-${i}`} data-word className="inline-block">
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
