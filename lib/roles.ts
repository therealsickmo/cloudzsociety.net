import type { TeamRole } from '@/types';

// ────────────────────────────────────────────────────────────────
// Role metadata — ordering (hierarchy) and accent colour per role.
// ────────────────────────────────────────────────────────────────

export const ROLE_ORDER: TeamRole[] = [
  'Founder',
  'Co-Founder',
  'Management',
  'Administration',
  'Sr. Moderator',
  'Moderator',
  'Jr. Moderator',
  'Sr. Supporter',
  'Supporter',
  'Jr. Supporter',
  'Developer',
  'Jr. Developer',
  'Builder',
  'Jr. Builder',
  'Designer',
  'Jr. Designer',
];

/** Tailwind text/border classes for a role's accent colour. */
export const ROLE_COLOR: Record<TeamRole, string> = {
  Founder: 'text-red-400 border-red-500/30 bg-red-500/10',
  'Co-Founder': 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  Management: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  Administration: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  'Sr. Moderator': 'text-brand border-brand/30 bg-brand/10',
  Moderator: 'text-brand-300 border-brand/30 bg-brand/10',
  'Jr. Moderator': 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  'Sr. Supporter': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Supporter: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  'Jr. Supporter': 'text-teal-300 border-teal-500/30 bg-teal-500/10',
  Developer: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  'Jr. Developer': 'text-violet-300 border-violet-500/30 bg-violet-500/10',
  Builder: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  'Jr. Builder': 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10',
  Designer: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
  'Jr. Designer': 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10',
};

/** Sort helper honouring the role hierarchy. */
export function byRole<T extends { role: TeamRole }>(a: T, b: T) {
  return ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role);
}
