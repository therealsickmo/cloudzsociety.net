// ────────────────────────────────────────────────────────────────
// Selectable colours for showcase tags (pill + icon). The class strings
// are literal so Tailwind keeps them; keep both maps in sync with OPTIONS.
// ────────────────────────────────────────────────────────────────

export const TAG_COLOR_OPTIONS = [
  { value: 'blue', label: 'Blau' },
  { value: 'green', label: 'Grün' },
  { value: 'cyan', label: 'Türkis' },
  { value: 'purple', label: 'Lila' },
  { value: 'pink', label: 'Pink' },
  { value: 'red', label: 'Rot' },
  { value: 'amber', label: 'Gelb' },
  { value: 'white', label: 'Weiß' },
  { value: 'gray', label: 'Grau' },
];

/** Pill styling (border + background + text) per colour. */
export const TAG_PILL: Record<string, string> = {
  blue: 'border-brand/40 bg-brand/15 text-brand-100',
  green: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100',
  cyan: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-100',
  purple: 'border-purple-500/40 bg-purple-500/15 text-purple-100',
  pink: 'border-pink-500/40 bg-pink-500/15 text-pink-100',
  red: 'border-red-500/40 bg-red-500/15 text-red-100',
  amber: 'border-amber-500/40 bg-amber-500/15 text-amber-100',
  white: 'border-white/25 bg-white/15 text-white',
  gray: 'border-white/15 bg-white/[0.06] text-text-secondary',
};

/** Icon colour per colour name. */
export const TAG_ICON_COLOR: Record<string, string> = {
  blue: 'text-brand-300',
  green: 'text-emerald-400',
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  red: 'text-red-400',
  amber: 'text-amber-400',
  white: 'text-white',
  gray: 'text-text-secondary',
};

export const pillClass = (color?: string) => TAG_PILL[color ?? 'blue'] ?? TAG_PILL.blue;
export const iconColorClass = (color?: string) =>
  TAG_ICON_COLOR[color ?? 'blue'] ?? TAG_ICON_COLOR.blue;
