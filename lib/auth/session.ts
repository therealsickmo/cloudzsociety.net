import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminPassword, adminToken } from '@/lib/admin-auth';
import type { SessionUser } from '@/types';

// ────────────────────────────────────────────────────────────────
// Dashboard session (SERVER ONLY)
//
// A signed cookie (`cz_session`) holds the logged-in Discord user and
// their resolved role. The existing admin password (ADMIN_COOKIE) is
// accepted as a bridge that maps to an admin session, so the dashboard
// is usable even before Discord OAuth is configured.
// ────────────────────────────────────────────────────────────────

export const SESSION_COOKIE = 'cz_session';

function secret(): string {
  return process.env.SESSION_SECRET ?? `cz-session::${adminPassword()}`;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function encodeSession(user: SessionUser): string {
  const body = Buffer.from(JSON.stringify(user)).toString('base64url');
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionUser;
  } catch {
    return null;
  }
}

/** Current session from cookies, falling back to the admin password. */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const fromDiscord = decodeSession(store.get(SESSION_COOKIE)?.value);
  if (fromDiscord) return fromDiscord;

  const adminValue = store.get(ADMIN_COOKIE)?.value;
  if (adminValue) {
    const expected = adminToken();
    const a = Buffer.from(adminValue);
    const b = Buffer.from(expected);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      return { sub: 'admin', name: 'Administrator', role: 'admin' };
    }
  }
  return null;
}

export function canManage(user: SessionUser | null): boolean {
  return user?.role === 'admin' || user?.role === 'team';
}
