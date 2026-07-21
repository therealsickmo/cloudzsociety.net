import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/admin-auth';
import {
  getChangelog,
  getProducts,
  getRoles,
  getTeam,
  saveChangelog,
  saveProducts,
  saveRoles,
  saveTeam,
} from '@/lib/content-store';

export const dynamic = 'force-dynamic';

// Generic read/write endpoint for the array-based collections.
const COLLECTIONS = {
  products: { get: getProducts, save: saveProducts },
  team: { get: getTeam, save: saveTeam },
  changelog: { get: getChangelog, save: saveChangelog },
  roles: { get: getRoles, save: saveRoles },
} as const;

type CollectionName = keyof typeof COLLECTIONS;

function resolve(name: string) {
  return (COLLECTIONS as Record<string, (typeof COLLECTIONS)[CollectionName]>)[
    name
  ];
}

interface Params {
  params: Promise<{ collection: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { collection } = await params;
  const handler = resolve(collection);
  if (!handler) {
    return NextResponse.json({ ok: false, message: 'Unbekannt.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: handler.get() });
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, message: 'Nicht angemeldet.' }, { status: 401 });
  }
  const { collection } = await params;
  const handler = resolve(collection);
  if (!handler) {
    return NextResponse.json({ ok: false, message: 'Unbekannt.' }, { status: 404 });
  }
  try {
    const data = (await request.json()) as unknown[];
    if (!Array.isArray(data)) throw new Error('not an array');
    // The save functions are typed per collection; the admin UI sends the
    // matching shape, so a controlled cast is acceptable here.
    (handler.save as (value: unknown[]) => void)(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Speichern fehlgeschlagen.' },
      { status: 400 },
    );
  }
}
