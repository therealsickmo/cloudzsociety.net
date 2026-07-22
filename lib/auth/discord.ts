// ────────────────────────────────────────────────────────────────
// Discord OAuth2 (SERVER ONLY)
//
// Implements the authorization-code flow. Configure via env:
//   DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
//   DISCORD_REDIRECT_URI (optional — otherwise derived from request)
// ────────────────────────────────────────────────────────────────

const AUTHORIZE_URL = 'https://discord.com/oauth2/authorize';
const TOKEN_URL = 'https://discord.com/api/oauth2/token';
const USER_URL = 'https://discord.com/api/users/@me';

export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
}

export function discordConfigured(): boolean {
  return Boolean(
    process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET,
  );
}

export function redirectUri(origin: string): string {
  return process.env.DISCORD_REDIRECT_URI ?? `${origin}/api/auth/discord/callback`;
}

export function authorizeUrl(origin: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID ?? '',
    redirect_uri: redirectUri(origin),
    response_type: 'code',
    scope: 'identify',
    state,
    prompt: 'consent',
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeCode(
  code: string,
  origin: string,
): Promise<string> {
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID ?? '',
    client_secret: process.env.DISCORD_CLIENT_SECRET ?? '',
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri(origin),
  });
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`Token exchange failed (${res.status})`);
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

export async function fetchUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch(USER_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`User fetch failed (${res.status})`);
  return (await res.json()) as DiscordUser;
}

/** Full CDN URL for a Discord avatar, or null for the default. */
export function avatarUrl(user: DiscordUser): string | undefined {
  if (!user.avatar) return undefined;
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`;
}
