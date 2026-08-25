import Image from 'next/image'

export default function PageHeading({
  title,
  lede,
  meta,
  portrait,
}: {
  title: string
  lede?: string
  meta?: { label: string; value: string }[]
  /** Optional circular portrait, sitting above the title. */
  portrait?: { src: string; alt: string }
}) {
  return (
    <section className="pt-32 pb-4 sm:pt-40">
      <div className="shell flex flex-col gap-7">
        {portrait && (
          <div
            data-anim="plate"
            className="relative size-[clamp(6.5rem,11vw,9.5rem)] overflow-hidden rounded-full bg-ground-2 ring-1 ring-line"
          >
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              priority
              sizes="(max-width: 640px) 7rem, 9.5rem"
              className="object-cover"
            />
          </div>
        )}

        <h1
          data-anim="lines"
          className="max-w-[16ch] font-display text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"
        >
          {title}
        </h1>

        {lede && (
          <p data-anim="rise" className="max-w-[60ch] text-ink-muted">
            {lede}
          </p>
        )}

        {meta && meta.length > 0 && (
          <dl data-anim="stagger" className="flex flex-wrap gap-x-12 gap-y-5 border-t border-line pt-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="meta">{m.label}</dt>
                <dd className="mt-1.5 text-[0.95rem]">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
