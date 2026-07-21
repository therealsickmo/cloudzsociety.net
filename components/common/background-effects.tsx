/**
 * Fixed background used across the whole app (public + admin): one uniform,
 * dark blue-tinted tone. No glow, no gradients — perfectly even everywhere.
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-background"
    >
      {/* Uniform, subtle dark-blue tint */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgb(var(--brand-900) / 0.32)' }}
      />
    </div>
  );
}
