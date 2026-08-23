'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

const LenisCtx = createContext<{ lenis: Lenis | null }>({ lenis: null })
export const useLenis = () => useContext(LenisCtx)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const l = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Feed Lenis's virtual scroll position into ScrollTrigger...
    l.on('scroll', ScrollTrigger.update)
    // ...and drive Lenis off GSAP's ticker so both share one rAF loop.
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    setLenis(l)

    return () => {
      gsap.ticker.remove(tick)
      l.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisCtx.Provider value={{ lenis }}>{children}</LenisCtx.Provider>
}
