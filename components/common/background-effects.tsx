/**
 * Fixed background used across the whole app (public + admin): a calm, uniform
 * blue-tinted dark with one very soft top glow. No grain, no hard gradients —
 * so it stays smooth and free of banding / that pixelated look.
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

      {/* Very soft top glow (same blue) */}
      <div className="absolute -top-48 left-1/2 h-[46rem] w-[68rem] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-[220px]" />
    </div>
  );
}
