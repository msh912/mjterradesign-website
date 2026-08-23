import { cn } from '@/lib/utils'

export type Anim = 'rise' | 'stagger' | 'lines' | 'plate' | 'rule' | 'meta'

type Props = {
  children: React.ReactNode
  className?: string
  /** Which entrance this group uses. See components/motion/MotionRoot.tsx. */
  anim?: Anim
  /** Shorthand for anim="stagger". */
  stagger?: boolean
}

/**
 * Declares a scroll entrance for its children.
 *
 * This only marks the element; the animation itself is built by MotionRoot,
 * which keeps every page a server component. The resting state is the visible
 * state, so if JS never runs the content is simply there.
 */
export default function Reveal({ children, className, anim, stagger }: Props) {
  return (
    <div data-anim={anim ?? (stagger ? 'stagger' : 'rise')} className={cn(className)}>
      {children}
    </div>
  )
}
