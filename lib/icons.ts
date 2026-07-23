import { icons, Sparkles, type LucideIcon } from 'lucide-react';

// ────────────────────────────────────────────────────────────────
// Full Lucide icon set (~1500 icons). `icons` is Lucide's manifest of
// every icon keyed by its PascalCase name.
// ────────────────────────────────────────────────────────────────

export const ICON_MAP = icons as Record<string, LucideIcon>;

/** Resolve an icon name to a component, falling back to Sparkles. */
export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}

/** All icon names for the picker, sorted alphabetically. */
export const ICON_OPTIONS = Object.keys(ICON_MAP)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ value: name, label: name }));
