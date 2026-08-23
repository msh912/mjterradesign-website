'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion, EASE } from '@/lib/motion'
import ScrambleText from '@/components/ScrambleText'

const LINES = ['Ground', 'up', 'design']

export default function Hero() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const inner = gsap.utils.toArray<HTMLElement>('[data-mask-inner]')
      if (inner.length) {
        // Wipes up out of an overflow:hidden mask. Default state is visible.
        gsap.from(inner, {
          yPercent: 115,
          duration: 1.25,
          ease: EASE.out,
          stagger: 0.09,
        })
      }

      gsap.from('[data-hero-meta]', {
        y: 18,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 1,
        delay: 0.5,
        ease: EASE.out,
        stagger: 0.1,
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      className="section relative flex min-h-[92svh] items-end pt-32 sm:pt-40"
    >
      <div className="shell w-full">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end">
          {/* Deliberately colossal, and deliberately off-grid: the third line
              is indented so the block reads as composed, not centred. */}
          <h1 className="font-display text-[clamp(3.2rem,12vw,10rem)] leading-[0.86] tracking-[-0.05em]">
            {LINES.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden"
                style={i === 2 ? { paddingLeft: '0.14em' } : undefined}
              >
                <span data-mask-inner className="block">
                  {i === 1 ? (
                    <span className="text-accent">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col gap-7 pb-3">
            <p data-hero-meta className="max-w-sm text-ink-muted">
              A working archive of everything I have designed, built and shipped —
              across product, space and interface.
            </p>

            <div data-hero-meta>
              <ScrambleText
                as="span"
                text="SELECTED WORKS 2019—2026"
                className="label"
                speed={26}
                delay={700}
              />
            </div>

            <Link
              data-hero-meta
              href="/work"
              className="group inline-flex w-fit items-center gap-3 border-b border-line pb-2 text-ink transition-colors hover:border-accent"
            >
              <span>Enter the archive</span>
              <span className="text-accent transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
