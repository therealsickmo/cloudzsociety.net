'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DashboardTodo, Member, TodoStatus } from '@/types';

const STATUS: { id: TodoStatus; label: string; cls: string }[] = [
  { id: 'open', label: 'Offen', cls: 'bg-white/10 text-text-secondary' },
  { id: 'in_progress', label: 'In Arbeit', cls: 'bg-amber-500/15 text-amber-400' },
  { id: 'done', label: 'Erledigt', cls: 'bg-emerald-500/15 text-emerald-400' },
];

const nextStatus: Record<TodoStatus, TodoStatus> = {
  open: 'in_progress',
  in_progress: 'done',
  done: 'open',
};

export function TodosPanel({
  initial,
  members,
}: {
  initial: DashboardTodo[];
  members: Member[];
}) {
  const [todos, setTodos] = useState(initial);
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [due, setDue] = useState('');
  const [busy, setBusy] = useState(false);

  const staff = members.filter((m) => m.role !== 'player');

  async function add() {
    if (!title.trim()) return;
    setBusy(true);
    const res = await fetch('/api/dashboard/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, assignee, dueAt: due }),
    });
    const json = await res.json();
    setBusy(false);
    if (json.ok) {
      setTodos((t) => [json.data, ...t]);
      setTitle('');
      setAssignee('');
      setDue('');
    }
  }

  async function cycle(todo: DashboardTodo) {
    const status = nextStatus[todo.status];
    setTodos((t) => t.map((x) => (x.id === todo.id ? { ...x, status } : x)));
    await fetch('/api/dashboard/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: todo.id, status }),
    });
  }

  async function remove(id: string) {
    setTodos((t) => t.filter((x) => x.id !== id));
    await fetch(`/api/dashboard/todos?id=${id}`, { method: 'DELETE' });
  }

  const badge = (s: TodoStatus) => STATUS.find((x) => x.id === s)!;

  return (
    <div className="space-y-6">
      {/* Create */}
      <Card className="p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Neue Aufgabe…"
            className="rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-text-secondary focus:border-brand/50"
          />
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-sm text-white outline-none focus:border-brand/50"
          >
            <option value="">Zuweisen…</option>
            {staff.map((m) => (
              <option key={m.discordId} value={m.username}>
                {m.username}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-sm text-white outline-none focus:border-brand/50"
          />
          <Button onClick={add} disabled={busy || !title.trim()}>
            <Plus className="size-4" />
            Hinzufügen
          </Button>
        </div>
      </Card>

      {/* List */}
      {todos.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">
          Noch keine Aufgaben. Erstelle die erste oben.
        </p>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => {
            const b = badge(todo.status);
            return (
              <Card
                key={todo.id}
                className="flex items-center gap-3 p-4"
              >
                <button
                  onClick={() => cycle(todo)}
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                    b.cls,
                  )}
                >
                  {b.label}
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'truncate text-sm font-medium text-white',
                      todo.status === 'done' && 'text-text-secondary line-through',
                    )}
                  >
                    {todo.title}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {todo.assignee ? `→ ${todo.assignee}` : 'Nicht zugewiesen'}
                    {todo.dueAt && ` · fällig ${todo.dueAt}`}
                  </p>
                </div>
                <button
                  onClick={() => remove(todo.id)}
                  className="shrink-0 rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                  aria-label="Löschen"
                >
                  <Trash2 className="size-4" />
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
