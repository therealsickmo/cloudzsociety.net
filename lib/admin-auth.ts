import crypto from 'node:crypto';
import { cookies } from 'next/headers';

// ────────────────────────────────────────────────────────────────
// Minimal admin authentication (SERVER ONLY)
//
// A single shared password (ADMIN_PASSWORD) gates the /admin dashboard
// and its write APIs. On login we store an httpOnly cookie holding a
// token derived from the password; every request re-derives and
// compares it. This is deliberately simple — intended for a locally
// running instance. For a public deployment, upgrade to the reserved
// auth service (services/auth.ts) with real accounts.
// ────────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = 'cz_admin';

/** The configured password (with a clearly-flagged local default). */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'cloudz-admin';
}

/** Token stored in the cookie — a salted hash of the password. */
export function adminToken(): string {
  return crypto
    .createHash('sha256')
    .update(`cloudz::${adminPassword()}`)
    .digest('hex');
}

/** Constant-time comparison to avoid timing leaks. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPassword(password: string): boolean {
  return safeEqual(password, adminPassword());
}

/** Whether the current request carries a valid admin cookie. */
export async function isAdminAuthed(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  return Boolean(value) && safeEqual(value as string, adminToken());
}
