import Image from 'next/image'
import Link from 'next/link'
import { byField, type Field } from '@/content/projects'
import { cn } from '@/lib/utils'

/**
 * The three ways into the work.
 *
 * Not a feature grid: no cards, no boxes, no shadows, nothing enclosing them.
 * Three drawings on the ground with the field named underneath, which is closer
 * to a gallery's room directory than to the icon-and-heading card row the
 * transfer doc bans.
 *
 * Each mark is a line drawing that carries its own circle, so the component
 * draws no ring of its own. They are masked to alpha at the corners in
 * `public/images/fields/`, because the ground is #fafafa and a white square
 * would print a faintly brighter tile behind every one.
 *
 * A field with no work in it yet is still shown, because the three fields are
 * how MJ describes himself, but it is not made to look clickable and does not
 * lie about being ready. Counts come from `byField`, so this needs no edit when
 * the work arrives.
 */

const FIELDS: { field: Field; label: string; src: string; alt: string }[] = [
  {
    field: 'landscape',
    label: 'Landscape architecture',
    src: '/images/fields/landscape.png',
    alt: '',
  },
  {
    field: 'architecture',
    label: 'Architecture',
    src: '/images/fields/architecture.png',
    alt: '',
  },
  {
    field: 'graphic',
    label: 'Graphic design',
    src: '/images/fields/graphic.png',
    alt: '',
  },
]

export default function Fields() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <ul
          data-anim="stagger"
          className="mx-auto grid max-w-3xl grid-cols-3 gap-x-6 text-center sm:gap-x-14"
        >
          {FIELDS.map(({ field, label, src, alt }) => {
            const count = byField(field).length
            const ready = count > 0

            const body = (
              <>
                <span
                  className={cn(
                    'relative mx-auto block aspect-square w-full max-w-[11rem] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    ready ? 'group-hover:scale-[1.04]' : 'opacity-45',
                  )}
                >
                  {/* The label names the field in text directly underneath, so the
                      drawing is decoration and must not be read out twice. */}
                  <Image src={src} alt={alt} aria-hidden fill sizes="11rem" className="object-contain" />
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
