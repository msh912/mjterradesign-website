'use client'

import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { EASE, FAILSAFE_MS, isMobile, prefersReducedMotion, scrubFor } from '@/lib/motion'

/**
 * One client component drives every scroll animation on the site.
 *
 * Sections stay server components and opt in declaratively with `data-anim`,
 * so no page needs a client boundary just to move.
 *
 * The hard rule this file exists to keep: **nothing may end up permanently
 * invisible.** Every resting state in CSS is the visible state, the hidden
 * start state is only ever applied by `gsap.from()` (which creates the tween in
 * the same call), reduced motion skips the whole thing, and a failsafe sweeps
 * up anything still hidden after FAILSAFE_MS. Two previous reveal
 * implementations shipped blank sections; this one is built so that cannot
 * happen.
 */
export default function MotionRoot() {
  const pathname = usePathname()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const mobile = isMobile()
      const splits: SplitText[] = []
      let failsafe: number | undefined

      const trigger = (el: Element, start = 'top 88%') => ({
        trigger: el,
        start,
        once: true,
      })

      const build = () => {
        // ---- Headings: lines rise out from behind their own edge ------------
        gsap.utils.toArray<HTMLElement>('[data-anim="lines"]').forEach((el) => {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
          splits.push(split)
          gsap.from(split.lines, {
            yPercent: 118,
            duration: 1.2,
            ease: EASE.out,
            stagger: 0.085,
            scrollTrigger: trigger(el),
            onComplete: () => split.revert(),
          })
        })

        // ---- Copy: lifts in with a shallow focus pull -----------------------
        gsap.utils.toArray<HTMLElement>('[data-anim="rise"]').forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            filter: 'blur(8px)',
            duration: 1.15,
            ease: EASE.out,
            scrollTrigger: trigger(el),
          })
        })

        // ---- Groups: children follow one another ----------------------------
        gsap.utils.toArray<HTMLElement>('[data-anim="stagger"]').forEach((el) => {
          const kids = Array.from(el.children)
          if (!kids.length) return
          gsap.from(kids, {
            y: 26,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 1.05,
            ease: EASE.out,
            stagger: 0.075,
            scrollTrigger: trigger(el, 'top 90%'),
          })
        })

        // ---- Artwork: a curtain opens while the image settles back ----------
        // The image is held at a slight overscale so the drift below always has
        // material to move into and can never expose the frame behind it.
        const OVERSCALE = 1.06
        const DRIFT = 2.4

        gsap.utils.toArray<HTMLElement>('[data-anim="plate"]').forEach((el) => {
          const img = el.querySelector('img')
          const tl = gsap.timeline({ scrollTrigger: trigger(el, 'top 86%') })

          tl.from(el, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.3,
            ease: EASE.out,
          })

          if (img) {
            gsap.set(img, { scale: OVERSCALE })
            tl.from(img, { scale: 1.16, duration: 1.7, ease: EASE.out }, 0)

            // Continuous drift, the flow between sections. GSAP tracks
            // transform components separately, so this never fights the scale
            // above, and being pure translation it cannot hide anything.
            gsap.fromTo(
              img,
              { yPercent: -DRIFT },
              {
                yPercent: DRIFT,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: scrubFor(mobile),
                },
              },
            )
          }
        })

        // ---- Hairlines: drawn from the left ---------------------------------
        gsap.utils.toArray<HTMLElement>('[data-anim="rule"]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.25,
            ease: EASE.out,
            scrollTrigger: trigger(el, 'top 94%'),
          })
        })

        // ---- Small metadata: letters tick into place ------------------------
        gsap.utils.toArray<HTMLElement>('[data-anim="meta"]').forEach((el) => {
          const split = SplitText.create(el, { type: 'chars' })
          splits.push(split)
          gsap.from(split.chars, {
            opacity: 0,
            duration: 0.5,
            ease: EASE.outSoft,
            stagger: 0.012,
            scrollTrigger: trigger(el, 'top 92%'),
            onComplete: () => split.revert(),
          })
        })

        ScrollTrigger.refresh()
      }

      // Split after fonts settle, or the line boxes are measured against a
      // fallback face and break in the wrong places.
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
      if (fonts?.ready) {
        fonts.ready.then(build).catch(build)
      } else {
        build()
      }

      // Failsafe: reveal anything a tween left hidden.
      failsafe = window.setTimeout(() => {
        splits.forEach((s) => {
          try {
            s.revert()
          } catch {
            /* already reverted */
          }
        })
        document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
          const seen = getComputedStyle(el)
          if (parseFloat(seen.opacity) < 0.95) {
            gsap.set(el, { clearProps: 'all' })
          }
          el.querySelectorAll<HTMLElement>('*').forEach((child) => {
            if (parseFloat(getComputedStyle(child).opacity) < 0.95) {
              gsap.set(child, { clearProps: 'opacity,transform,filter,clipPath' })
            }
          })
        })
      }, FAILSAFE_MS)

      return () => {
        if (failsafe) window.clearTimeout(failsafe)
        splits.forEach((s) => {
          try {
            s.revert()
          } catch {
            /* already reverted */
          }
        })
      }
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return null
}
