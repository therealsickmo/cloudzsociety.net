'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DashboardTicket, Member, TicketStatus } from '@/types';

const STATUS: { id: TicketStatus; label: string; cls: string }[] = [
  { id: 'open', label: 'Offen', cls: 'bg-white/10 text-text-secondary' },
  { id: 'in_progress', label: 'In Bearbeitung', cls: 'bg-amber-500/15 text-amber-400' },
  { id: 'closed', label: 'Geschlossen', cls: 'bg-emerald-500/15 text-emerald-400' },
];

const nextStatus: Record<TicketStatus, TicketStatus> = {
  open: 'in_progress',
  in_progress: 'closed',
  closed: 'open',
};

const CATEGORIES = ['Allgemein', 'Bug', 'Bewerbung', 'Support', 'Idee'];

export function TicketsPanel({
  initial,
  members,
}: {
  initial: DashboardTicket[];
  members: Member[];
}) {
  const [tickets, setTickets] = useState(initial);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [busy, setBusy] = useState(false);

  const staff = members.filter((m) => m.role !== 'player');

  async function add() {
    if (!subject.trim()) return;
    setBusy(true);
    const res = await fetch('/api/dashboard/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, message, category }),
    });
    const json = await res.json();
    setBusy(false);
    if (json.ok) {
      setTickets((t) => [json.data, ...t]);
      setSubject('');
      setMessage('');
    }
  }

  async function patch(ticket: DashboardTicket, body: Partial<DashboardTicket>) {
    setTickets((t) =>
      t.map((x) => (x.id === ticket.id ? { ...x, ...body } : x)),
    );
    await fetch('/api/dashboard/tickets', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ticket.id, ...body }),
    });
  }

  async function remove(id: string) {
    setTickets((t) => t.filter((x) => x.id !== id));
    await fetch(`/api/dashboard/tickets?id=${id}`, { method: 'DELETE' });
  }

  const badge = (s: TicketStatus) => STATUS.find((x) => x.id === s)!;

  return (
    <div className="space-y-6">
      {/* Create */}
      <Card className="space-y-3 p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Betreff…"
            className="rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-text-secondary focus:border-brand/50"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-sm text-white outline-none focus:border-brand/50"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Beschreibung (optional)…"
          rows={2}
          className="w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-text-secondary focus:border-brand/50"
        />
        <div className="flex justify-end">
          <Button onClick={add} disabled={busy || !subject.trim()}>
            <Plus className="size-4" />
            Ticket erstellen
          </Button>
        </div>
      </Card>

      {/* List */}
      {tickets.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">
          Noch keine Tickets.
        </p>
      ) : (
        <div className="space-y-3">
          {tickets.map((tk) => {
            const b = badge(tk.status);
            return (
              <Card key={tk.id} className="p-5">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => patch(tk, { status: nextStatus[tk.status] })}
                    className={cn(
                      'shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                      b.cls,
                    )}
                  >
                    {b.label}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold text-white">
                        {tk.subject}
                      </h3>
                      <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-text-secondary">
                        {tk.category}
                      </span>
                    </div>
                    {tk.message && (
                      <p className="mt-1 text-sm text-text-secondary">
                        {tk.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-text-secondary">
                      von {tk.author} ·{' '}
                      {new Date(tk.createdAt).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(tk.id)}
                    className="shrink-0 rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                    aria-label="Löschen"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-3">
                  <span className="text-xs text-text-secondary">Zuständig:</span>
                  <select
                    value={tk.assignee ?? ''}
                    onChange={(e) => patch(tk, { assignee: e.target.value })}
                    className="rounded-lg border border-border bg-surface/60 px-2 py-1 text-xs text-white outline-none focus:border-brand/50"
                  >
                    <option value="">Niemand</option>
                    {staff.map((m) => (
                      <option key={m.discordId} value={m.username}>
                        {m.username}
                      </option>
                    ))}
                  </select>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
