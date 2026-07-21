// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Central configuration & static constants
// ────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'CLOUDZ™',
  brand: 'CloudzSociety',
  domain: 'CloudzSociety.net',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cloudzsociety.net',
  description:
    'CLOUDZ™ — eine moderne Minecraft Community. Eigene Spielmodi, aktive Community und regelmäßige Updates.',
  tagline: 'Eine moderne Minecraft Community.',
} as const;

export const MINECRAFT = {
  ip: process.env.NEXT_PUBLIC_MC_SERVER_IP ?? 'play.cloudzsociety.net',
  port: process.env.NEXT_PUBLIC_MC_SERVER_PORT ?? '25565',
} as const;

export const LINKS = {
  discord: process.env.NEXT_PUBLIC_DISCORD_INVITE ?? 'https://discord.gg/cloudz',
  wiki: process.env.NEXT_PUBLIC_WIKI_URL ?? 'https://docs.cloudzsociety.net',
  github: 'https://github.com/therealsickmo/cloudzsociety.net',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Bewerben', href: '/apply' },
  { label: 'Spenden', href: '/donate' },
];

export const FOOTER_LINKS = {
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  social: [
    { label: 'Discord', href: LINKS.discord },
    { label: 'GitHub', href: LINKS.github },
    { label: 'Wiki', href: LINKS.wiki },
  ],
} as const;
