/**
 * Reduced-motion gate. Every animation in this project checks this BEFORE
 * running, and every reveal must enhance an already-visible default — never
 * gate visibility on a class transition that can fail headless.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** House easing — exponential ease-out. No bounce, no elastic. */
export const EASE = {
  out: 'expo.out',
  outSoft: 'power3.out',
  inOut: 'power2.inOut',
} as const

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches

/** Lenis on wheel only; pinned mobile ScrollTriggers need catch-up scrub. */
export const scrubFor = (mobile: boolean) => (mobile ? 1 : true)

/**
 * How long to wait before force-revealing anything an animation left hidden.
 *
 * Two earlier reveal implementations shipped blank sections because they set an
 * invisible start state and then depended on an event that never arrived. Any
 * JS-driven reveal here is backed by this failsafe so that failure mode cannot
 * return.
 */
export const FAILSAFE_MS = 5000
