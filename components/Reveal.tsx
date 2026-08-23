import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  /** Retained for call-site compatibility; grouping no longer changes behaviour. */
  stagger?: boolean
}

/**
 * A plain grouping wrapper. Text on this site does not animate in.
 *
 * Two earlier versions were removed for good reasons, both worth keeping:
 *
 * 1. A GSAP `gsap.from()` reveal set opacity 0 on mount and left everything
 *    below the fold invisible until ScrollTrigger fired.
 * 2. A CSS `animation-timeline: view()` reveal had the same effect in any
 *    render that never scrolls — print, crawlers, full-page screenshots.
 *
 * Both also broke the craft floor's rule against one identical entrance on
 * every section. The single authored motion moment is `.plate-in` on artwork;
 * copy is simply painted, which is what a gallery does.
 */
export default function Reveal({ children, className }: Props) {
  return <div className={cn(className)}>{children}</div>
}
