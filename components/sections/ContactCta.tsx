import Reveal from '@/components/Reveal'
import { site } from '@/content/site'

export default function ContactCta() {
  return (
    <section className="section section--veiled">
      <div className="shell">
        <Reveal stagger className="flex flex-col items-start gap-8">
          <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.94]">
            Have something that needs building?
          </h2>

          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-4 rounded-full border border-accent/60 px-7 py-4 text-ink transition-colors duration-500 hover:bg-accent hover:text-ground"
          >
            <span>{site.email}</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
