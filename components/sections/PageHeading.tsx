import Reveal from '@/components/Reveal'

export default function PageHeading({
  title,
  lede,
  meta,
}: {
  title: string
  lede?: string
  meta?: { label: string; value: string }[]
}) {
  return (
    <section className="section pt-36 pb-0 sm:pt-44">
      <div className="shell">
        <Reveal stagger className="flex flex-col gap-7">
          <h1 className="max-w-[14ch] font-display text-[clamp(2.8rem,9vw,7rem)] leading-[0.9]">
            {title}
          </h1>

          {lede && <p className="max-w-xl text-ink-muted">{lede}</p>}

          {meta && meta.length > 0 && (
            <dl className="flex flex-wrap gap-x-12 gap-y-4 pt-2">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-1">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </div>
    </section>
  )
}
