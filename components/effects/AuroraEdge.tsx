/**
 * Edge glow. A conic spectrum, heavily blurred, masked so only the viewport
 * EDGES light up — a halo hugging the screen, never a centre wash.
 * CSS only, no JS, no layout cost.
 */
export default function AuroraEdge() {
  return (
    <div aria-hidden className="aurora">
      <style>{`
        .aurora {
          position: fixed;
          inset: 0;
          z-index: var(--z-backdrop);
          pointer-events: none;
          overflow: hidden;
        }
        .aurora::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 190vmax;
          height: 190vmax;
          translate: -50% -50%;
          background: conic-gradient(
            from 0deg,
            oklch(0.795 0.168 150 / 0.55),
            oklch(0.62 0.14 200 / 0.40),
            oklch(0.75 0.15 62 / 0.30),
            oklch(0.70 0.16 300 / 0.34),
            oklch(0.795 0.168 150 / 0.55)
          );
          filter: blur(90px) saturate(150%);
          opacity: 0.30;
          -webkit-mask-image: radial-gradient(
            ellipse 62% 58% at 50% 50%,
            transparent 56%,
            #000 82%
          );
          mask-image: radial-gradient(
            ellipse 62% 58% at 50% 50%,
            transparent 56%,
            #000 82%
          );
          animation: aurora-drift 44s linear infinite;
        }
        @keyframes aurora-drift {
          to { rotate: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora::before { animation: none; }
        }
        @media (max-width: 680px) {
          .aurora::before { filter: blur(64px) saturate(140%); opacity: 0.22; }
        }
      `}</style>
    </div>
  )
}
