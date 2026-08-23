import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section flex min-h-[70svh] items-center pt-36">
      <div className="shell">
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9]">
          Not here
        </h1>
        <p className="mt-6 max-w-md text-ink-muted">
          That page does not exist — it may have been renamed or retired.
        </p>
        <Link
          href="/work"
          className="mt-8 inline-flex items-center gap-3 border-b border-line pb-2 transition-colors hover:border-accent"
        >
          <span>Back to the work</span>
          <span className="text-accent">→</span>
        </Link>
      </div>
    </section>
  )
}
