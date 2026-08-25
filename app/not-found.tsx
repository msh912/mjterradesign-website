import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[76svh] items-center pt-36 pb-24">
      <div className="shell">
        <h1
          data-anim="lines"
          className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em]"
        >
          Not here
        </h1>
        <p data-anim="rise" className="mt-6 max-w-[46ch] text-ink-muted">
          That page does not exist. It may have been renamed or retired.
        </p>
        <Link
          href="/work"
          className="group mt-9 inline-flex items-center gap-3 border-b border-ink pb-1 transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <span>Back to the work</span>
          <span
            aria-hidden
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  )
}
