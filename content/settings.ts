import type { SiteSettings } from '@/types';

// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Default site settings
// These seed the editable settings; the /admin dashboard writes
// overrides to data/settings.json.
// ────────────────────────────────────────────────────────────────

export const defaultSettings: SiteSettings = {
  site: {
    name: 'CLOUDZ™',
    tagline: 'Eine moderne Minecraft Community.',
    description:
      'CLOUDZ™ — eine moderne Minecraft Community. Eigene Spielmodi, aktive Community und regelmäßige Updates.',
    domain: 'CloudzSociety.net',
  },
  minecraft: {
    ip: 'play.cloudzsociety.net',
    port: '25565',
  },
  links: {
    discord: 'https://discord.gg/cloudz',
    wiki: 'https://docs.cloudzsociety.net',
    github: 'https://github.com/therealsickmo/cloudzsociety.net',
  },
  stats: {
    online: true,
    playersOnline: 137,
    playersMax: 500,
    registeredPlayers: 14238,
    discordMembers: 4820,
    version: '1.21.4',
    uptimeDays: 42,
    uptimeHours: 7,
  },
};
