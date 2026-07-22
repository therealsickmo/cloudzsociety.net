import { NextResponse } from 'next/server';
import { canManage, getSession } from '@/lib/auth/session';
import {
  getTickets,
  getTimeEntries,
  getTodos,
  newId,
  saveTickets,
  saveTimeEntries,
  saveTodos,
} from '@/lib/dashboard-store';
import type {
  DashboardTicket,
  DashboardTodo,
  TimeEntry,
} from '@/types';

export const dynamic = 'force-dynamic';

const RESOURCES = ['todos', 'tickets', 'time'] as const;
type Resource = (typeof RESOURCES)[number];

function isResource(v: string): v is Resource {
  return (RESOURCES as readonly string[]).includes(v);
}

async function guard() {
  const user = await getSession();
  if (!canManage(user)) return null;
  return user;
}

// ── GET: list ──────────────────────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const { resource } = await params;
  if (!isResource(resource)) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const data =
    resource === 'todos'
      ? getTodos()
      : resource === 'tickets'
        ? getTickets()
        : getTimeEntries();
  return NextResponse.json({ ok: true, data });
}

// ── POST: create (time → clock in/out toggle) ──────────────────────
export async function POST(
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const { resource } = await params;
  if (!isResource(resource)) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const now = new Date().toISOString();

  if (resource === 'todos') {
    const todos = getTodos();
    const todo: DashboardTodo = {
      id: newId(),
      title: String(body.title ?? '').trim() || 'Neue Aufgabe',
      description: body.description ? String(body.description) : undefined,
      assignee: body.assignee ? String(body.assignee) : undefined,
      status: 'open',
      createdBy: user.name,
      createdAt: now,
      dueAt: body.dueAt ? String(body.dueAt) : undefined,
    };
    todos.unshift(todo);
    saveTodos(todos);
    return NextResponse.json({ ok: true, data: todo });
  }

  if (resource === 'tickets') {
    const tickets = getTickets();
    const ticket: DashboardTicket = {
      id: newId(),
      subject: String(body.subject ?? '').trim() || 'Neues Ticket',
      message: String(body.message ?? ''),
      category: String(body.category ?? 'Allgemein'),
      status: 'open',
      assignee: body.assignee ? String(body.assignee) : undefined,
      author: user.name,
      createdAt: now,
      updatedAt: now,
    };
    tickets.unshift(ticket);
    saveTickets(tickets);
    return NextResponse.json({ ok: true, data: ticket });
  }

  // time → toggle: close the user's open entry, or open a new one
  const entries = getTimeEntries();
  const open = entries.find((e) => e.userId === user.sub && !e.clockOut);
  if (open) {
    open.clockOut = now;
    if (body.note) open.note = String(body.note);
    saveTimeEntries(entries);
    return NextResponse.json({ ok: true, data: open });
  }
  const entry: TimeEntry = {
    id: newId(),
    userId: user.sub,
    username: user.name,
    clockIn: now,
    note: body.note ? String(body.note) : undefined,
  };
  entries.unshift(entry);
  saveTimeEntries(entries);
  return NextResponse.json({ ok: true, data: entry });
}

// ── PATCH: update by id ────────────────────────────────────────────
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const { resource } = await params;
  if (!isResource(resource) || resource === 'time') {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = String(body.id ?? '');
  const now = new Date().toISOString();

  if (resource === 'todos') {
    const todos = getTodos();
    const t = todos.find((x) => x.id === id);
    if (!t) return NextResponse.json({ ok: false }, { status: 404 });
    if (body.title !== undefined) t.title = String(body.title);
    if (body.description !== undefined) t.description = String(body.description);
    if (body.assignee !== undefined) t.assignee = String(body.assignee);
    if (body.status !== undefined) t.status = body.status as DashboardTodo['status'];
    if (body.dueAt !== undefined) t.dueAt = String(body.dueAt) || undefined;
    saveTodos(todos);
    return NextResponse.json({ ok: true, data: t });
  }

  const tickets = getTickets();
  const tk = tickets.find((x) => x.id === id);
  if (!tk) return NextResponse.json({ ok: false }, { status: 404 });
  if (body.subject !== undefined) tk.subject = String(body.subject);
  if (body.status !== undefined) tk.status = body.status as DashboardTicket['status'];
  if (body.assignee !== undefined) tk.assignee = String(body.assignee);
  if (body.category !== undefined) tk.category = String(body.category);
  tk.updatedAt = now;
  saveTickets(tickets);
  return NextResponse.json({ ok: true, data: tk });
}

// ── DELETE: by ?id= ────────────────────────────────────────────────
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const { resource } = await params;
  if (!isResource(resource)) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const id = new URL(request.url).searchParams.get('id') ?? '';

  if (resource === 'todos') {
    saveTodos(getTodos().filter((x) => x.id !== id));
  } else if (resource === 'tickets') {
    saveTickets(getTickets().filter((x) => x.id !== id));
  } else {
    saveTimeEntries(getTimeEntries().filter((x) => x.id !== id));
  }
  return NextResponse.json({ ok: true });
}
