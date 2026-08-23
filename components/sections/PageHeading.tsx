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
    <section className="pt-32 pb-4 sm:pt-40">
      <div className="shell">
        <Reveal stagger className="flex flex-col gap-7">
          <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.92] tracking-[-0.04em]">
            {title}
          </h1>

          {lede && <p className="max-w-[60ch] text-ink-muted">{lede}</p>}

          {meta && meta.length > 0 && (
            <dl className="flex flex-wrap gap-x-12 gap-y-5 border-t border-line pt-6">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="meta">{m.label}</dt>
                  <dd className="mt-1.5 text-[0.95rem]">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </div>
    </section>
  )
}
