import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/admin-auth';
import { deleteDraft, getDraft, saveDraft, type BlogDraft } from '@/lib/blog';

export const dynamic = 'force-dynamic';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { slug } = await params;
  const draft = getDraft(slug);
  if (!draft) {
    return NextResponse.json({ ok: false, message: 'Nicht gefunden.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: draft });
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, message: 'Nicht angemeldet.' }, { status: 401 });
  }
  const { slug } = await params;
  try {
    const draft = (await request.json()) as BlogDraft;
    const newSlug = saveDraft(draft, slug);
    return NextResponse.json({ ok: true, slug: newSlug });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Speichern fehlgeschlagen.' },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, message: 'Nicht angemeldet.' }, { status: 401 });
  }
  const { slug } = await params;
  deleteDraft(slug);
  return NextResponse.json({ ok: true });
}
