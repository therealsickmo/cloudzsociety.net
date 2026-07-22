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

export type ButtonRadius = 'eckig' | 'abgerundet' | 'pill';
export type HeroLogoSize = 'klein' | 'mittel' | 'gross' | 'riesig';

export interface SiteTheme {
  brand: string;
  background: string;
  surface: string;
  card: string;
  textSecondary: string;
  radius: ButtonRadius;
}

export interface SiteLayout {
  heroLogoSize: HeroLogoSize;
  heroOverlay: number;
  heroBackground: string;
  sections: {
    about: boolean;
    features: boolean;
    stats: boolean;
    cta: boolean;
  };
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
  theme: SiteTheme;
  layout: SiteLayout;
}

// ── Editable text content (managed via /admin → Inhalte) ───────────

export interface NavItemContent {
  label: string;
  href: string;
  enabled: boolean;
  badge?: string;
}

export interface IconTextItem {
  icon: string;
  title: string;
  text: string;
}

export interface LabelValueItem {
  icon?: string;
  label: string;
  value: string;
}

export interface PageHeaderContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface SiteContent {
  nav: { items: NavItemContent[] };
  hero: {
    title: string;
    subtitle: string;
    joinLabel: string;
    discordLabel: string;
    rulesLabel: string;
    stats: LabelValueItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    points: IconTextItem[];
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    items: IconTextItem[];
  };
  stats: { eyebrow: string; title: string; description: string };
  cta: {
    title: string;
    description: string;
    joinLabel: string;
    discordLabel: string;
  };
  footer: { tagline: string; note: string };
  pages: {
    shop: PageHeaderContent;
    team: PageHeaderContent;
    blog: PageHeaderContent;
    changelog: PageHeaderContent;
    apply: PageHeaderContent;
    donate: PageHeaderContent;
    kontakt: PageHeaderContent;
  };
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

// ── Dashboard & auth (Discord OAuth) ───────────────────────────────

/** Access level of a logged-in user. */
export type Role = 'admin' | 'team' | 'player';

export interface Member {
  discordId: string;
  username: string;
  avatar?: string;
  role: Role;
  createdAt: string;
}

/** A signed-session snapshot stored in the auth cookie. */
export interface SessionUser {
  sub: string;
  name: string;
  avatar?: string;
  role: Role;
}

export type TodoStatus = 'open' | 'in_progress' | 'done';

export interface DashboardTodo {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  status: TodoStatus;
  createdBy: string;
  createdAt: string;
  dueAt?: string;
}

export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface DashboardTicket {
  id: string;
  subject: string;
  message: string;
  category: string;
  status: TicketStatus;
  assignee?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  username: string;
  clockIn: string;
  clockOut?: string;
  note?: string;
}
