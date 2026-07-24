/**
 * Fixed background used across the whole app (public + admin): a calm,
 * slowly moving blue aura over the navy base — two drifting, blurred blob
 * layers, like a large ambient lava lamp behind all content. The home hero
 * still paints its own image on top (fading into this aura at its bottom).
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="site-aura" />
      <div className="site-aura-2" />
    </div>
  );
}
