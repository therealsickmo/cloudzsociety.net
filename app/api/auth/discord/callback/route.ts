import { NextResponse } from 'next/server';
import {
  avatarUrl,
  exchangeCode,
  fetchUser,
} from '@/lib/auth/discord';
import { encodeSession, SESSION_COOKIE } from '@/lib/auth/session';
import { resolveRole } from '@/lib/dashboard-store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = request.headers
    .get('cookie')
    ?.match(/cz_oauth_state=([^;]+)/)?.[1];

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(`${origin}/login?error=oauth_state`);
  }

  try {
    const token = await exchangeCode(code, origin);
    const user = await fetchUser(token);
    const name = user.global_name || user.username;
    const role = resolveRole(user.id, name);

    const response = NextResponse.redirect(`${origin}/dashboard`);
    response.cookies.set(
      SESSION_COOKIE,
      encodeSession({
        sub: user.id,
        name,
        avatar: avatarUrl(user),
        role,
      }),
      {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      },
    );
    response.cookies.set('cz_oauth_state', '', { path: '/', maxAge: 0 });
    return response;
  } catch {
    return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
  }
}
