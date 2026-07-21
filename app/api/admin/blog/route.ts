import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/admin-auth';
import { getAllDrafts, saveDraft, type BlogDraft } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, data: getAllDrafts() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, message: 'Nicht angemeldet.' }, { status: 401 });
  }
  try {
    const draft = (await request.json()) as BlogDraft;
    if (!draft.title?.trim()) {
      return NextResponse.json(
        { ok: false, message: 'Titel ist erforderlich.' },
        { status: 422 },
      );
    }
    const slug = saveDraft(draft);
    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Speichern fehlgeschlagen.' },
      { status: 400 },
    );
  }
}
