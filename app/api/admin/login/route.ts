import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminToken, verifyPassword } from '@/lib/admin-auth';

export async function POST(request: Request) {
  let password = '';
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? '';
  } catch {
    return NextResponse.json({ ok: false, message: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { ok: false, message: 'Falsches Passwort.' },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
