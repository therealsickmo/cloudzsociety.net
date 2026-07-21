import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/admin-auth';
import { getContent, saveContent } from '@/lib/content-store';
import type { SiteContent } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, data: getContent() });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, message: 'Nicht angemeldet.' }, { status: 401 });
  }
  try {
    const data = (await request.json()) as SiteContent;
    saveContent(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Speichern fehlgeschlagen.' },
      { status: 400 },
    );
  }
}
