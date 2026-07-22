import fs from 'node:fs';
import path from 'node:path';
import type {
  DashboardTicket,
  DashboardTodo,
  Member,
  Role,
  TimeEntry,
} from '@/types';

// ────────────────────────────────────────────────────────────────
// Dashboard store (SERVER ONLY — uses node:fs)
//
// Team/Admin dashboard data (todos, tickets, time entries) and the
// member → role map live as JSON files under `data/`. Never import
// this module from a client component.
// ────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), 'data');

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJson<T>(name: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(filePath(name), 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(name: string, data: T): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePath(name), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ── Members / roles ────────────────────────────────────────────────

/** Discord IDs seeded as admins via env (comma-separated). */
function seededAdminIds(): string[] {
  return (process.env.ADMIN_DISCORD_IDS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getMembers(): Member[] {
  return readJson<Member[]>('members', []);
}

export function saveMembers(members: Member[]): void {
  writeJson('members', members);
}

/** Resolve a Discord user's role, seeding admins/new players as needed. */
export function resolveRole(discordId: string, username: string): Role {
  if (seededAdminIds().includes(discordId)) return 'admin';
  const members = getMembers();
  const found = members.find((m) => m.discordId === discordId);
  if (found) return found.role;
  // First-time login → registered as a player with an empty dashboard.
  members.push({
    discordId,
    username,
    role: 'player',
    createdAt: new Date().toISOString(),
  });
  saveMembers(members);
  return 'player';
}

// ── To-dos ─────────────────────────────────────────────────────────

export function getTodos(): DashboardTodo[] {
  return readJson<DashboardTodo[]>('todos', []);
}

export function saveTodos(todos: DashboardTodo[]): void {
  writeJson('todos', todos);
}

// ── Tickets ────────────────────────────────────────────────────────

export function getTickets(): DashboardTicket[] {
  return readJson<DashboardTicket[]>('tickets', []);
}

export function saveTickets(tickets: DashboardTicket[]): void {
  writeJson('tickets', tickets);
}

// ── Time entries (Zeitstempel) ─────────────────────────────────────

export function getTimeEntries(): TimeEntry[] {
  return readJson<TimeEntry[]>('time', []);
}

export function saveTimeEntries(entries: TimeEntry[]): void {
  writeJson('time', entries);
}
