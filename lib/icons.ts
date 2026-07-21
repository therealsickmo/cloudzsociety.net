import {
  Activity,
  Award,
  Bell,
  BookOpen,
  Calendar,
  Compass,
  Crown,
  Flame,
  Gamepad2,
  Gauge,
  Gift,
  Globe,
  Headphones,
  Heart,
  Cloud,
  Rocket,
  RefreshCw,
  Server,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// ────────────────────────────────────────────────────────────────
// Curated set of icons selectable in the admin panel by name.
// ────────────────────────────────────────────────────────────────

export const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Calendar,
  Compass,
  Rocket,
  Gamepad2,
  Users,
  RefreshCw,
  Headphones,
  Shield,
  Crown,
  Star,
  Trophy,
  Award,
  Zap,
  Flame,
  Heart,
  Gift,
  Globe,
  Server,
  Gauge,
  Activity,
  Bell,
  BookOpen,
  ShoppingBag,
  Cloud,
};

/** Resolve an icon name to a component, falling back to Sparkles. */
export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}

/** Options for an icon-picker select in the admin. */
export const ICON_OPTIONS = Object.keys(ICON_MAP).map((name) => ({
  value: name,
  label: name,
}));
