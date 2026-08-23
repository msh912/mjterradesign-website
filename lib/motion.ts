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

/** Lenis on wheel only; pinned mobile ScrollTriggers need catch-up scrub. */
export const scrubFor = (isMobile: boolean) => (isMobile ? 1 : true)
