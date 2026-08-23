'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\<>[]{}=+*#%&$@01'

type Props = {
  text: string
  /** Flip to replay. */
  play?: boolean
  /** ms each character spends scrambling before it locks. */
  speed?: number
  delay?: number
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

/**
 * Decodes text left→right through random glyphs.
 *
 * Width gotcha: every cell is sized by its FINAL glyph (rendered invisibly)
 * with the scrambling glyph overlaid absolutely. Otherwise the line width
 * jitters each frame and wrapped titles hop between lines.
 */
export default function ScrambleText({
  text,
  play = true,
  speed = 34,
  delay = 0,
  className,
  as: Tag = 'span',
}: Props) {
  const [revealed, setRevealed] = useState(() => text.length)
  const [noise, setNoise] = useState<string[]>(() => text.split(''))
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!play) return
    if (prefersReducedMotion()) {
      setRevealed(text.length)
      return
    }

    let start = 0
    setRevealed(0)

    const step = (now: number) => {
      if (!start) start = now + delay
      const elapsed = now - start

      if (elapsed < 0) {
        raf.current = requestAnimationFrame(step)
        return
      }

      const done = Math.floor(elapsed / speed)
      setRevealed(done)
      setNoise(
        text
          .split('')
          .map((c) =>
            c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ),
      )

      if (done <= text.length) raf.current = requestAnimationFrame(step)
    }

    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [text, play, speed, delay])

  return (
    <Tag className={className} aria-label={text}>
      {text.split('').map((char, i) => {
        const settled = i < revealed
        return (
          <span
            key={`${char}-${i}`}
            aria-hidden
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {/* Sizes the cell by the final glyph. */}
            <span style={{ visibility: settled ? 'visible' : 'hidden' }}>
              {char === ' ' ? ' ' : char}
            </span>
            {!settled && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  color: 'var(--color-accent)',
                }}
              >
                {noise[i] === ' ' ? ' ' : noise[i]}
              </span>
            )}
          </span>
        )
      })}
    </Tag>
  )
}
