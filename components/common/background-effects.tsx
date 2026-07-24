/**
 * Fixed background used across the whole app (public + admin): an Apple-Music
 * style flowing blue gradient. A rich blue base plus three slowly morphing
 * gradient layers (deep navy, royal blue and a bright drifting highlight) make
 * the whole background flow like a coloured aura. The home hero still paints
 * its own image on top (fading into this aura at its bottom).
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          'radial-gradient(125% 120% at 50% 30%, #123163 0%, #0b1f47 60%, #06122e 100%)',
      }}
    >
      {/* Flowing gradient layers */}
      <div className="site-aura" />
      <div className="site-aura-2" />
      <div className="site-aura-3" />
      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 105% at 50% 40%, transparent 55%, rgba(6, 18, 46, 0.5) 100%)',
        }}
      />
    </div>
  );
}
