import type { ApplicationRole } from '@/types';

// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Applyable roles and their current status
// ────────────────────────────────────────────────────────────────

export const applicationRoles: ApplicationRole[] = [
  {
    role: 'Moderator',
    status: 'open',
    description: 'Sorge für Ordnung und ein faires Miteinander im Spiel.',
  },
  {
    role: 'Jr. Moderator',
    status: 'open',
    description: 'Dein Einstieg ins Moderationsteam.',
  },
  {
    role: 'Supporter',
    status: 'open',
    description: 'Hilf Spielern bei Fragen und Problemen im Support.',
  },
  {
    role: 'Jr. Supporter',
    status: 'open',
    description: 'Unterstütze das Support-Team im Discord.',
  },
  {
    role: 'Developer',
    status: 'closed',
    description: 'Entwickle Plugins und Features für das Netzwerk.',
  },
  {
    role: 'Jr. Developer',
    status: 'open',
    description: 'Lerne und entwickle mit unserem Dev-Team.',
  },
  {
    role: 'Builder',
    status: 'open',
    description: 'Erschaffe beeindruckende Welten und Maps.',
  },
  {
    role: 'Jr. Builder',
    status: 'open',
    description: 'Unterstütze das Build-Team bei Projekten.',
  },
  {
    role: 'Designer',
    status: 'closed',
    description: 'Gestalte Grafiken, UI und Branding.',
  },
  {
    role: 'Jr. Designer',
    status: 'open',
    description: 'Sammle Erfahrung im Design-Team.',
  },
];
