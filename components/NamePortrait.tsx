'use client'

import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { EASE, prefersReducedMotion } from '@/lib/motion'

/**
 * MJ's name, with his portrait riding the cursor while you hover it.
 *
 * The circle is the one from the top of /about, same ring and same ground, so it
 * reads as the same object rather than a second treatment of the same photo.
 *
 * Two things worth knowing before editing this:
 *
 * 1. **It is portalled to `<body>` on purpose.** The name sits inside a
 *    `data-anim="rise"` block, and that tween leaves a `transform` (and a
 *    `filter`) on the block after it finishes. Either one makes the block a
 *    containing block for `position: fixed`, so a plate rendered in place would
 *    track the section instead of the viewport.
 * 2. **It is allowed to rest hidden**, which the reveal system is not. That ban
 *    exists so a failed reveal cannot blank a section; here the name itself is
 *    always rendered, plain and readable, the plate only mounts on a device with
 *    a real pointer, and /about carries the same photo with real alt text. Touch,
 *    keyboard and no-JS lose nothing but a flourish.
 */
export default function NamePortrait({ children }: { children: ReactNode }) {
  const nameRef = useRef<HTMLElement>(null)
  const plateRef = useRef<HTMLSpanElement>(null)
  const [pointer, setPointer] = useState(false)

  // Hover is not a thing you can have on a touch screen, so do not ship the
  // plate, or the portrait download, to one.
  useEffect(() => {
    setPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    const name = nameRef.current
    const plate = plateRef.current
    if (!pointer || !name || !plate) return

    const reduced = prefersReducedMotion()
    gsap.set(plate, { xPercent: -50, yPercent: -50, scale: 0.86, autoAlpha: 0 })

    // Trailing the cursor slightly is what makes the plate feel weighted rather
    // than glued to the pointer. Reduced motion pins it to the cursor instead.
    const follow = reduced ? 0 : 0.65
    const toX = gsap.quickTo(plate, 'x', { duration: follow, ease: EASE.outSoft })
    const toY = gsap.quickTo(plate, 'y', { duration: follow, ease: EASE.outSoft })

    const move = (e: PointerEvent) => {
      toX(e.clientX)
      toY(e.clientY)
    }

    const enter = (e: PointerEvent) => {
      // Land on the cursor before fading up, or the plate sails in from 0,0.
      gsap.set(plate, { x: e.clientX, y: e.clientY })
      window.addEventListener('pointermove', move)
      gsap.to(plate, {
        autoAlpha: 1,
        scale: 1,
        duration: reduced ? 0.12 : 0.6,
        ease: EASE.out,
        overwrite: true,
      })
    }

    const leave = () => {
      window.removeEventListener('pointermove', move)
      gsap.to(plate, {
        autoAlpha: 0,
        scale: 0.86,
        duration: reduced ? 0.12 : 0.4,
        ease: EASE.outSoft,
        overwrite: true,
      })
    }

    name.addEventListener('pointerenter', enter)
    name.addEventListener('pointerleave', leave)
    // Scrolling with the cursor held still fires no pointer event, which would
    // strand the plate mid-page.
    window.addEventListener('scroll', leave, { passive: true })

    return () => {
      name.removeEventListener('pointerenter', enter)
      name.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', leave)
      window.removeEventListener('pointermove', move)
      gsap.killTweensOf(plate)
    }
  }, [pointer])

  return (
    <>
      <strong ref={nameRef} className="link-underline font-semibold text-ink">
        {children}
      </strong>

      {pointer &&
        createPortal(
          <span
            ref={plateRef}
            aria-hidden
            style={{ zIndex: 'var(--z-overlay)', opacity: 0, visibility: 'hidden' }}
            className="pointer-events-none fixed left-0 top-0 block size-[clamp(7rem,10vw,10rem)] overflow-hidden rounded-full bg-ground-2 ring-1 ring-line"
          >
            <Image
              src="/images/portrait.jpg"
              alt=""
              width={1024}
              height={1024}
              sizes="10rem"
              className="size-full object-cover"
            />
          </span>,
          document.body,
        )}
    </>
  )
}
