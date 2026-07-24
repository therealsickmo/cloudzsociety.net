/**
 * Fixed background used across the whole app (public + admin): a moving blue
 * aura that fills the entire viewport. A blue base wash plus two big, slowly
 * drifting gradient layers keep the whole background bathed in shifting blue
 * tones. The home hero still paints its own image on top (fading into this
 * aura at its bottom).
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Blue base wash so the whole area stays filled with colour */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgb(var(--brand-700) / 0.5), rgb(var(--brand-900) / 0.35) 45%, rgb(var(--brand-800) / 0.5))',
        }}
      />
      {/* Moving aura layers */}
      <div className="site-aura" />
      <div className="site-aura-2" />
    </div>
  );
}
