import NamePortrait from '@/components/NamePortrait'

/**
 * The second of the three texts the home page opens with. It is the claim, so it
 * is set large, in the display face, and carries the name itself. The paragraph
 * about the degree and the range follows in `Practice`, smaller, because two
 * blocks of body copy at the same size read as one long block nobody finishes.
 */
export default function Statement() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <p
          data-anim="rise"
          className="max-w-[24ch] font-display text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.06] tracking-[-0.035em] text-ink"
        >
          I&rsquo;m <NamePortrait>Mohamadjavad Shoori</NamePortrait>, an architect
          and graphic designer in Milan.
        </p>

        <p data-anim="rise" className="mt-8 max-w-[46ch] text-ink-muted">
          The masterplan, the diagrams, the boards and the identity are one
          continuous piece of work, not four handoffs.
        </p>
      </div>
    </section>
  )
}
