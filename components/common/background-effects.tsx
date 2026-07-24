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
      {/* Moving aura layers (lighter blues) over the dark navy base */}
      <div className="site-aura" />
      <div className="site-aura-2" />
      {/* Dark vignette to keep edges deep & give the motion contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 40%, transparent 45%, rgb(var(--brand-900) / 0.55) 100%)',
        }}
      />
    </div>
  );
}
