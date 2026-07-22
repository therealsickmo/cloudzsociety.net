'use client';

import { useState } from 'react';
import { LogIn, LogOut, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TimeEntry } from '@/types';

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function duration(entry: TimeEntry) {
  const end = entry.clockOut ? new Date(entry.clockOut) : new Date();
  const ms = end.getTime() - new Date(entry.clockIn).getTime();
  const mins = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

export function TimePanel({
  initial,
  userId,
}: {
  initial: TimeEntry[];
  userId: string;
}) {
  const [entries, setEntries] = useState(initial);
  const [busy, setBusy] = useState(false);
  const open = entries.find((e) => e.userId === userId && !e.clockOut);

  async function toggle() {
    setBusy(true);
    const res = await fetch('/api/dashboard/time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const json = await res.json();
    setBusy(false);
    if (!json.ok) return;
    const updated = json.data as TimeEntry;
    setEntries((list) => {
      const exists = list.some((e) => e.id === updated.id);
      return exists
        ? list.map((e) => (e.id === updated.id ? updated : e))
        : [updated, ...list];
    });
  }

  async function remove(id: string) {
    setEntries((list) => list.filter((e) => e.id !== id));
    await fetch(`/api/dashboard/time?id=${id}`, { method: 'DELETE' });
  }

  return (
    <div className="space-y-6">
      {/* Clock */}
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="text-sm text-text-secondary">
          {open ? (
            <>
              Eingestempelt seit{' '}
              <span className="font-semibold text-white">
                {fmtTime(open.clockIn)}
              </span>{' '}
              · {duration(open)}
            </>
          ) : (
            'Du bist aktuell nicht eingestempelt.'
          )}
        </div>
        <Button
          onClick={toggle}
          disabled={busy}
          variant={open ? 'outline' : 'default'}
          size="lg"
        >
          {open ? (
            <>
              <LogOut className="size-4" />
              Ausstempeln
            </>
          ) : (
            <>
              <LogIn className="size-4" />
              Einstempeln
            </>
          )}
        </Button>
      </Card>

      {/* History */}
      {entries.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">
          Noch keine Zeitstempel erfasst.
        </p>
      ) : (
        <div className="space-y-2">
          {entries.map((e) => (
            <Card key={e.id} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{e.username}</p>
                <p className="mt-0.5 text-xs text-text-secondary">
                  {fmtTime(e.clockIn)}
                  {' → '}
                  {e.clockOut ? fmtTime(e.clockOut) : 'läuft…'}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white">
                {duration(e)}
              </span>
              <button
                onClick={() => remove(e.id)}
                className="shrink-0 rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                aria-label="Löschen"
              >
                <Trash2 className="size-4" />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
