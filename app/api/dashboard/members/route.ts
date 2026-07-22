import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getMembers, saveMembers } from '@/lib/dashboard-store';
import type { Member, Role } from '@/types';

export const dynamic = 'force-dynamic';

const ROLES: Role[] = ['admin', 'team', 'player'];

async function guardAdmin() {
  const user = await getSession();
  return user?.role === 'admin' ? user : null;
}

// ── GET: list members ──────────────────────────────────────────────
export async function GET() {
  if (!(await guardAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, data: getMembers() });
}

// ── POST: add a member manually (e.g. seed a teammate by Discord ID) ─
export async function POST(request: Request) {
  if (!(await guardAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const discordId = String(body.discordId ?? '').trim();
  if (!discordId) {
    return NextResponse.json(
      { ok: false, message: 'Discord-ID fehlt.' },
      { status: 400 },
    );
  }
  const role = ROLES.includes(body.role as Role) ? (body.role as Role) : 'team';
  const members = getMembers();
  if (members.some((m) => m.discordId === discordId)) {
    return NextResponse.json(
      { ok: false, message: 'Mitglied existiert bereits.' },
      { status: 409 },
    );
  }
  const member: Member = {
    discordId,
    username: String(body.username ?? '').trim() || discordId,
    role,
    createdAt: new Date().toISOString(),
  };
  members.push(member);
  saveMembers(members);
  return NextResponse.json({ ok: true, data: member });
}

// ── PATCH: change a member's role ──────────────────────────────────
export async function PATCH(request: Request) {
  if (!(await guardAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const discordId = String(body.discordId ?? '');
  const role = body.role as Role;
  if (!ROLES.includes(role)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const members = getMembers();
  const m = members.find((x) => x.discordId === discordId);
  if (!m) return NextResponse.json({ ok: false }, { status: 404 });
  m.role = role;
  saveMembers(members);
  return NextResponse.json({ ok: true, data: m });
}

// ── DELETE: remove a member by ?id= (Discord ID) ───────────────────
export async function DELETE(request: Request) {
  if (!(await guardAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get('id') ?? '';
  saveMembers(getMembers().filter((m) => m.discordId !== id));
  return NextResponse.json({ ok: true });
}
