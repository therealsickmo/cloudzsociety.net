import type { CSSProperties } from 'react';

// ────────────────────────────────────────────────────────────────
// Tag colours as HSL so every hue supports 5 brightness variants.
// Colour value format: "<hue>-<variant>" e.g. "blue-neon". A bare hue
// ("blue") defaults to the "normal" variant (backwards compatible).
// Rendered via inline styles → no Tailwind purge limits.
// ────────────────────────────────────────────────────────────────

export const COLOR_HUES = [
  { value: 'blue', label: 'Blau', h: 217, s: 91 },
  { value: 'sky', label: 'Himmelblau', h: 199, s: 89 },
  { value: 'cyan', label: 'Türkis', h: 187, s: 85 },
  { value: 'teal', label: 'Petrol', h: 172, s: 66 },
  { value: 'green', label: 'Grün', h: 145, s: 63 },
  { value: 'lime', label: 'Limette', h: 85, s: 78 },
  { value: 'yellow', label: 'Gelb', h: 48, s: 96 },
  { value: 'amber', label: 'Bernstein', h: 38, s: 92 },
  { value: 'orange', label: 'Orange', h: 25, s: 95 },
  { value: 'red', label: 'Rot', h: 0, s: 84 },
  { value: 'rose', label: 'Rosé', h: 347, s: 77 },
  { value: 'pink', label: 'Pink', h: 330, s: 81 },
  { value: 'fuchsia', label: 'Fuchsia', h: 292, s: 84 },
  { value: 'purple', label: 'Lila', h: 271, s: 81 },
  { value: 'violet', label: 'Violett', h: 258, s: 90 },
  { value: 'indigo', label: 'Indigo', h: 239, s: 84 },
  { value: 'white', label: 'Weiß', h: 220, s: 8 },
  { value: 'gray', label: 'Grau', h: 220, s: 9 },
] as const;

export const COLOR_VARIANTS = [
  { value: 'dunkel', label: 'Dunkel', l: 44, sMul: 0.8, glow: false },
  { value: 'normal', label: 'Normal', l: 58, sMul: 1, glow: false },
  { value: 'hell', label: 'Hell', l: 72, sMul: 0.92, glow: false },
  { value: 'knallig', label: 'Knallig', l: 55, sMul: 1.2, glow: false },
  { value: 'neon', label: 'Neon', l: 63, sMul: 1.3, glow: true },
] as const;

interface Resolved {
  h: number;
  s: number;
  l: number;
  glow: boolean;
}

function resolve(color?: string): Resolved {
  const [hueKey, variantKey = 'normal'] = (color ?? 'blue-normal').split('-');
  const hue = COLOR_HUES.find((x) => x.value === hueKey) ?? COLOR_HUES[0];
  const variant =
    COLOR_VARIANTS.find((x) => x.value === variantKey) ?? COLOR_VARIANTS[1];
  const white = hue.value === 'white';
  const s = Math.min(100, hue.s * variant.sMul);
  const l = white ? Math.min(98, variant.l + 30) : variant.l;
  return { h: hue.h, s, l, glow: variant.glow };
}

/** Solid colour (for swatches / icon colour). */
export function colorValue(color?: string): string {
  const { h, s, l } = resolve(color);
  return `hsl(${h} ${s}% ${l}%)`;
}

/** Inline style for a tag pill. */
export function pillStyle(color?: string): CSSProperties {
  const { h, s, l, glow } = resolve(color);
  return {
    backgroundColor: `hsl(${h} ${s}% ${l}% / 0.15)`,
    borderColor: `hsl(${h} ${s}% ${l}% / 0.5)`,
    color: `hsl(${h} ${Math.max(25, s - 5)}% ${Math.min(93, l + 28)}%)`,
    ...(glow ? { boxShadow: `0 0 12px hsl(${h} ${s}% ${l}% / 0.55)` } : {}),
  };
}

/** Inline style for a tag icon. */
export function iconStyle(color?: string): CSSProperties {
  const { h, s, l, glow } = resolve(color);
  return {
    color: `hsl(${h} ${s}% ${l}%)`,
    ...(glow
      ? { filter: `drop-shadow(0 0 6px hsl(${h} ${s}% ${l}% / 0.9))` }
      : {}),
  };
}

/** Human label like "Blau · Neon". */
export function colorLabel(color?: string): string {
  const [hueKey, variantKey = 'normal'] = (color ?? 'blue-normal').split('-');
  const hue = COLOR_HUES.find((x) => x.value === hueKey);
  const variant = COLOR_VARIANTS.find((x) => x.value === variantKey);
  return `${hue?.label ?? 'Blau'} · ${variant?.label ?? 'Normal'}`;
}
