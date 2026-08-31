import Link from 'next/link'
import { byField, type Field } from '@/content/projects'
import { cn } from '@/lib/utils'

/**
 * The three ways into the work.
 *
 * Not a feature grid: no cards, no boxes, no shadows, nothing enclosing them.
 * Three circles on the ground with the field named underneath, which is closer
 * to a gallery's room directory than to the icon-and-heading card row the
 * transfer doc bans.
 *
 * A field with no work in it yet is still shown, because the three fields are
 * how MJ describes himself, but it is not made to look clickable and does not
 * lie about being ready. Counts come from `byField`, so this needs no edit when
 * the work arrives.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Contours read in plan: the ground itself, described by drawing it. */
function LandscapeMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-full">
      <path
        d="M2.6 13.2c0-4.1 4-7.2 9.3-7.2 5 0 9.1 2.7 9.1 6.6 0 4-4.3 6.9-9.5 6.9-5 0-8.9-2.5-8.9-6.3Z"
        {...stroke}
      />
      <path
        d="M6.4 13.1c0-2.3 2.4-4 5.6-4 3 0 5.5 1.5 5.5 3.7 0 2.2-2.6 3.8-5.8 3.8-2.9 0-5.3-1.4-5.3-3.5Z"
        {...stroke}
      />
      <path d="M10.1 12.9c0-.8.9-1.4 2-1.4s1.9.6 1.9 1.3-.9 1.4-2 1.4-1.9-.5-1.9-1.3Z" fill="currentColor" />
    </svg>
  )
}

/** A volume in axonometric: the drawing an architect reaches for first. */
function ArchitectureMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-full">
      <path d="M12 3 20.5 7.6 12 12.2 3.5 7.6 12 3Z" {...stroke} />
      <path d="M3.5 7.6v8.8L12 21v-8.8" {...stroke} />
      <path d="M20.5 7.6v8.8L12 21" {...stroke} />
    </svg>
  )
}

/** Two shapes composed against each other, which is the whole job. */
function GraphicMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-full">
      <circle cx="9.4" cy="9.4" r="5.9" {...stroke} />
      <path d="M8.7 8.7h11.8v11.8H8.7V8.7Z" {...stroke} />
    </svg>
  )
}

const FIELDS: { field: Field; label: string; Mark: () => React.ReactElement }[] = [
  { field: 'landscape', label: 'Landscape architecture', Mark: LandscapeMark },
  { field: 'architecture', label: 'Architecture', Mark: ArchitectureMark },
  { field: 'graphic', label: 'Graphic design', Mark: GraphicMark },
]

export default function Fields() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <ul data-anim="stagger" className="grid grid-cols-3 gap-x-4 sm:gap-x-10">
          {FIELDS.map(({ field, label, Mark }) => {
            const count = byField(field).length
            const ready = count > 0

            const body = (
              <>
                <span
                  className={cn(
                    'grid aspect-square w-full max-w-[11rem] place-items-center rounded-full ring-1 transition-[color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    ready
                      ? 'text-ink ring-line group-hover:scale-[1.03] group-hover:text-accent group-hover:ring-accent'
                      : 'text-ink-faint ring-line/70',
                  )}
                >
                  <span className="size-[38%]">
                    <Mark />
                  </span>
                </span>

                <span className="mt-5 block">
                  <span
                    className={cn(
                      'block font-display text-[clamp(0.95rem,1.9vw,1.35rem)] leading-[1.1] tracking-[-0.03em] transition-colors duration-300',
                      ready ? 'text-ink group-hover:text-accent' : 'text-ink-faint',
                    )}
                  >
                    {label}
                  </span>
                  <span className="meta tnum mt-2 block">
                    {ready ? `${count} ${count === 1 ? 'project' : 'projects'}` : 'In preparation'}
                  </span>
                </span>
              </>
            )

            return (
              <li key={field}>
                {ready ? (
                  <Link href={`/work#${field}`} className="group block">
                    {body}
                  </Link>
                ) : (
                  <div className="block">{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
