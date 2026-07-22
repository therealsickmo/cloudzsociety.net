import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { authorizeUrl, discordConfigured } from '@/lib/auth/discord';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;

  if (!discordConfigured()) {
    return NextResponse.redirect(`${origin}/login?error=discord_not_configured`);
  }

  const state = crypto.randomBytes(16).toString('hex');
  const response = NextResponse.redirect(authorizeUrl(origin, state));
  response.cookies.set('cz_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10,
  });
  return response;
}
