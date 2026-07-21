import type { SiteTheme } from '@/types';

// ────────────────────────────────────────────────────────────────
// Turns the editable theme colours into CSS custom properties.
// Tailwind reads these via `rgb(var(--x) / <alpha-value>)`, so a single
// brand colour recolours the whole accent palette (shades derived here).
// ────────────────────────────────────────────────────────────────

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Rgb {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const int = parseInt(h, 16);
  if (Number.isNaN(int) || h.length !== 6) {
    return { r: 0, g: 102, b: 255 }; // fallback brand blue
  }
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

/** "r g b" channel string used by the `<alpha-value>` colour syntax. */
function channels(rgb: Rgb): string {
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

/** Mix a colour toward white (ratio>0) or black (ratio<0). */
function shade(rgb: Rgb, ratio: number): Rgb {
  const target = ratio > 0 ? 255 : 0;
  const t = Math.abs(ratio);
  return {
    r: Math.round(rgb.r + (target - rgb.r) * t),
    g: Math.round(rgb.g + (target - rgb.g) * t),
    b: Math.round(rgb.b + (target - rgb.b) * t),
  };
}

const SHADE_RATIOS: Record<number, number> = {
  50: 0.9,
  100: 0.8,
  200: 0.6,
  300: 0.4,
  400: 0.2,
  500: 0,
  600: -0.2,
  700: -0.4,
  800: -0.6,
  900: -0.8,
};

/** Build the `:root { … }` CSS that overrides the theme variables. */
export function buildThemeCss(theme: SiteTheme): string {
  const brand = hexToRgb(theme.brand);
  const vars: string[] = [
    `--background: ${channels(hexToRgb(theme.background))};`,
    `--surface: ${channels(hexToRgb(theme.surface))};`,
    `--card: ${channels(hexToRgb(theme.card))};`,
    `--text-secondary: ${channels(hexToRgb(theme.textSecondary))};`,
  ];
  for (const [key, ratio] of Object.entries(SHADE_RATIOS)) {
    vars.push(`--brand-${key}: ${channels(shade(brand, ratio))};`);
  }

  const radiusMap: Record<string, string> = {
    eckig: '0.375rem',
    abgerundet: '0.9rem',
    pill: '9999px',
  };
  vars.push(`--btn-radius: ${radiusMap[theme.radius] ?? '0.9rem'};`);

  return `:root{${vars.join('')}}`;
}
