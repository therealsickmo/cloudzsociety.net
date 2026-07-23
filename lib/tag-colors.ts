// ────────────────────────────────────────────────────────────────
// Selectable colours for showcase tags (pill + icon). The class strings
// are literal so Tailwind keeps them; keep both maps in sync with OPTIONS.
// (lib/ is included in the Tailwind content scan.)
// ────────────────────────────────────────────────────────────────

export const TAG_COLOR_OPTIONS = [
  { value: 'blue', label: 'Blau' },
  { value: 'sky', label: 'Himmelblau' },
  { value: 'cyan', label: 'Türkis' },
  { value: 'teal', label: 'Petrol' },
  { value: 'green', label: 'Grün' },
  { value: 'lime', label: 'Limette' },
  { value: 'yellow', label: 'Gelb' },
  { value: 'amber', label: 'Bernstein' },
  { value: 'orange', label: 'Orange' },
  { value: 'red', label: 'Rot' },
  { value: 'rose', label: 'Rosé' },
  { value: 'pink', label: 'Pink' },
  { value: 'fuchsia', label: 'Fuchsia' },
  { value: 'purple', label: 'Lila' },
  { value: 'violet', label: 'Violett' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'white', label: 'Weiß' },
  { value: 'gray', label: 'Grau' },
];

/** Pill styling (border + background + text) per colour. */
export const TAG_PILL: Record<string, string> = {
  blue: 'border-brand/40 bg-brand/15 text-brand-100',
  sky: 'border-sky-500/40 bg-sky-500/15 text-sky-100',
  cyan: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-100',
  teal: 'border-teal-500/40 bg-teal-500/15 text-teal-100',
  green: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100',
  lime: 'border-lime-500/40 bg-lime-500/15 text-lime-100',
  yellow: 'border-yellow-500/40 bg-yellow-500/15 text-yellow-100',
  amber: 'border-amber-500/40 bg-amber-500/15 text-amber-100',
  orange: 'border-orange-500/40 bg-orange-500/15 text-orange-100',
  red: 'border-red-500/40 bg-red-500/15 text-red-100',
  rose: 'border-rose-500/40 bg-rose-500/15 text-rose-100',
  pink: 'border-pink-500/40 bg-pink-500/15 text-pink-100',
  fuchsia: 'border-fuchsia-500/40 bg-fuchsia-500/15 text-fuchsia-100',
  purple: 'border-purple-500/40 bg-purple-500/15 text-purple-100',
  violet: 'border-violet-500/40 bg-violet-500/15 text-violet-100',
  indigo: 'border-indigo-500/40 bg-indigo-500/15 text-indigo-100',
  white: 'border-white/25 bg-white/15 text-white',
  gray: 'border-white/15 bg-white/[0.06] text-text-secondary',
};

/** Icon colour per colour name. */
export const TAG_ICON_COLOR: Record<string, string> = {
  blue: 'text-brand-300',
  sky: 'text-sky-400',
  cyan: 'text-cyan-400',
  teal: 'text-teal-400',
  green: 'text-emerald-400',
  lime: 'text-lime-400',
  yellow: 'text-yellow-400',
  amber: 'text-amber-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
  rose: 'text-rose-400',
  pink: 'text-pink-400',
  fuchsia: 'text-fuchsia-400',
  purple: 'text-purple-400',
  violet: 'text-violet-400',
  indigo: 'text-indigo-400',
  white: 'text-white',
  gray: 'text-text-secondary',
};

export const pillClass = (color?: string) => TAG_PILL[color ?? 'blue'] ?? TAG_PILL.blue;
export const iconColorClass = (color?: string) =>
  TAG_ICON_COLOR[color ?? 'blue'] ?? TAG_ICON_COLOR.blue;
