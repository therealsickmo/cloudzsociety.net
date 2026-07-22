import fs from 'node:fs';
import path from 'node:path';
import { products as defaultProducts } from '@/content/products';
import { team as defaultTeam } from '@/content/team';
import { changelog as defaultChangelog } from '@/content/changelog';
import { applicationRoles as defaultRoles } from '@/content/roles';
import { defaultSettings } from '@/content/settings';
import { defaultContent } from '@/content/site-content';
import type {
  ApplicationRole,
  ChangelogEntry,
  Product,
  PublicSettings,
  ServerStatus,
  SiteContent,
  SiteSettings,
  TeamMember,
} from '@/types';

// ────────────────────────────────────────────────────────────────
// Content store (SERVER ONLY — uses node:fs)
//
// Editable content lives in JSON files under `data/`. Reads fall back
// to the TypeScript defaults in `content/` when a file is missing, so
// the site works out of the box. The /admin dashboard writes changes
// here. Never import this module from a client component.
// ────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), 'data');

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJson<T>(name: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(filePath(name), 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(name: string, data: T): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePath(name), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

// ── Settings ───────────────────────────────────────────────────────

export function getSettings(): SiteSettings {
  const stored = readJson<Partial<SiteSettings>>('settings', {});
  // Deep-merge with defaults so newly added fields always have a value.
  return {
    site: { ...defaultSettings.site, ...stored.site },
    minecraft: { ...defaultSettings.minecraft, ...stored.minecraft },
    links: { ...defaultSettings.links, ...stored.links },
    stats: { ...defaultSettings.stats, ...stored.stats },
    theme: { ...defaultSettings.theme, ...stored.theme },
    layout: {
      ...defaultSettings.layout,
      ...stored.layout,
      sections: {
        ...defaultSettings.layout.sections,
        ...stored.layout?.sections,
      },
    },
  };
}

export function saveSettings(settings: SiteSettings): void {
  writeJson('settings', settings);
}

// ── Editable text content ──────────────────────────────────────────

export function getContent(): SiteContent {
  const stored = readJson<Partial<SiteContent>>('content', {});
  // Merge one level deep, falling back to defaults for any missing group.
  return {
    nav: stored.nav ?? defaultContent.nav,
    showcase: { ...defaultContent.showcase, ...stored.showcase },
    hero: { ...defaultContent.hero, ...stored.hero },
    about: { ...defaultContent.about, ...stored.about },
    features: { ...defaultContent.features, ...stored.features },
    stats: { ...defaultContent.stats, ...stored.stats },
    cta: { ...defaultContent.cta, ...stored.cta },
    footer: { ...defaultContent.footer, ...stored.footer },
    pages: { ...defaultContent.pages, ...stored.pages },
  };
}

export function saveContent(content: SiteContent): void {
  writeJson('content', content);
}

export function connectAddress(settings: SiteSettings): string {
  const { ip, port } = settings.minecraft;
  return port === '25565' ? ip : `${ip}:${port}`;
}

export function getPublicSettings(): PublicSettings {
  const settings = getSettings();
  return { ...settings, connectAddress: connectAddress(settings) };
}

export function getServerStatus(): ServerStatus {
  const { stats } = getSettings();
  return {
    online: stats.online,
    playersOnline: stats.playersOnline,
    playersMax: stats.playersMax,
    registeredPlayers: stats.registeredPlayers,
    discordMembers: stats.discordMembers,
    version: stats.version,
    uptime: stats.uptimeDays * 86400 + stats.uptimeHours * 3600,
  };
}

// ── Products ───────────────────────────────────────────────────────

export function getProducts(): Product[] {
  return readJson<Product[]>('products', defaultProducts);
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function saveProducts(products: Product[]): void {
  writeJson('products', products);
}

// ── Team ───────────────────────────────────────────────────────────

export function getTeam(): TeamMember[] {
  return readJson<TeamMember[]>('team', defaultTeam);
}

export function saveTeam(team: TeamMember[]): void {
  writeJson('team', team);
}

// ── Changelog ──────────────────────────────────────────────────────

export function getChangelog(): ChangelogEntry[] {
  return readJson<ChangelogEntry[]>('changelog', defaultChangelog);
}

export function saveChangelog(entries: ChangelogEntry[]): void {
  writeJson('changelog', entries);
}

// ── Application roles ──────────────────────────────────────────────

export function getRoles(): ApplicationRole[] {
  return readJson<ApplicationRole[]>('roles', defaultRoles);
}

export function saveRoles(roles: ApplicationRole[]): void {
  writeJson('roles', roles);
}
