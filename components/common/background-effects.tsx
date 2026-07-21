// Fine grain (feTurbulence) to dither the tint so it doesn't band/line.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fixed background used across the whole app (public + admin). A calm, mostly
 * uniform blue-tinted dark — flat like the admin panel, just a touch bluer —
 * with a faint top glow and a grain layer to avoid banding.
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Uniform blue tint */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgb(var(--brand-900) / 0.5)' }}
      />

      {/* Faint top glow (same blue) */}
      <div className="absolute -top-44 left-1/2 h-[40rem] w-[62rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[190px]" />

      {/* Grain — removes banding / the "lines" look */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
      />
    </div>
  );
}
