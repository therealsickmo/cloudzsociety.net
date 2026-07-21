// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Shared domain types
// ────────────────────────────────────────────────────────────────

export type Currency = 'goon' | 'premium' | 'eur';

export type ShopCategory =
  | 'ranks'
  | 'keys'
  | 'coins'
  | 'bundles'
  | 'cosmetics';

export interface Product {
  slug: string;
  name: string;
  category: ShopCategory;
  shortDescription: string;
  description: string;
  price: number;
  currency: Currency;
  /** Remaining stock; `null` means unlimited. */
  stock: number | null;
  image: string;
  gallery?: string[];
  benefits: string[];
  featured?: boolean;
  badge?: string;
}

export type TeamRole =
  | 'Founder'
  | 'Co-Founder'
  | 'Management'
  | 'Administration'
  | 'Sr. Moderator'
  | 'Moderator'
  | 'Jr. Moderator'
  | 'Sr. Supporter'
  | 'Supporter'
  | 'Jr. Supporter'
  | 'Developer'
  | 'Jr. Developer'
  | 'Builder'
  | 'Jr. Builder'
  | 'Designer'
  | 'Jr. Designer';

export interface TeamMember {
  name: string;
  /** Minecraft username used to render the skin head. */
  minecraft: string;
  role: TeamRole;
  memberSince: string;
  available: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  readingTime: number;
  image: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export type ChangelogType = 'feature' | 'improvement' | 'bugfix';

export interface ChangelogEntry {
  version: string;
  date: string;
  category: string;
  features: string[];
  improvements: string[];
  bugfixes: string[];
}

export type ApplicationStatus = 'open' | 'closed';

export interface ApplicationRole {
  role: TeamRole;
  status: ApplicationStatus;
  description: string;
}

export interface ApplicationPayload {
  role: string;
  minecraftName: string;
  discordName: string;
  age: string;
  experience: string;
  motivation: string;
}

export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  registeredPlayers: number;
  discordMembers: number;
  version: string;
  uptime: number;
}

// ── Editable site settings (managed via the /admin dashboard) ──────

export interface SiteStats {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  registeredPlayers: number;
  discordMembers: number;
  version: string;
  uptimeDays: number;
  uptimeHours: number;
}

export interface SiteSettings {
  site: {
    name: string;
    tagline: string;
    description: string;
    domain: string;
  };
  minecraft: {
    ip: string;
    port: string;
  };
  links: {
    discord: string;
    wiki: string;
    github: string;
  };
  stats: SiteStats;
}

/** Settings plus derived values exposed to the client. */
export interface PublicSettings extends SiteSettings {
  connectAddress: string;
}

export type AdminCollection =
  | 'products'
  | 'team'
  | 'changelog'
  | 'roles';
