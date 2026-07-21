// Fine grain (feTurbulence) to dither the gradient so it doesn't band/line.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fixed decorative background: a single, uniform bluish tone tuned to the
 * CS logo's blue. One smooth radial gradient + a grain layer so it reads as
 * one clean colour without visible bands/lines. No multicolour blobs.
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Monochrome blue base — brighter navy near the top, deep at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 50% -15%, rgb(var(--brand-800)) 0%, rgb(var(--brand-900) / 0.65) 32%, rgb(var(--background)) 70%)',
        }}
      />

      {/* Soft brand glow (same blue) at the top */}
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[64rem] -translate-x-1/2 rounded-full bg-brand/12 blur-[180px]" />

      {/* Gentle vignette to keep the edges calm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 25%, transparent 55%, rgb(var(--background)) 100%)',
        }}
      />

      {/* Grain overlay — removes banding / the "lines" look */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
      />
    </div>
  );
}
