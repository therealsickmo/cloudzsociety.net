import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth/session';
import { ADMIN_COOKIE } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

function clear(origin: string) {
  const response = NextResponse.redirect(`${origin}/login`, { status: 303 });
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}

export async function POST(request: Request) {
  return clear(new URL(request.url).origin);
}

export async function GET(request: Request) {
  return clear(new URL(request.url).origin);
}
