'use client';

import { useState } from 'react';
import { Trash2, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Member, Role } from '@/types';

const ROLE_OPTIONS: { id: Role; label: string }[] = [
  { id: 'player', label: 'Spieler' },
  { id: 'team', label: 'Teammitglied' },
  { id: 'admin', label: 'Administrator' },
];

const ROLE_BADGE: Record<Role, string> = {
  admin: 'bg-amber-500/15 text-amber-400',
  team: 'bg-brand/15 text-brand',
  player: 'bg-white/10 text-text-secondary',
};

export function MembersPanel({ initial }: { initial: Member[] }) {
  const [members, setMembers] = useState(initial);
  const [discordId, setDiscordId] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<Role>('team');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function add() {
    if (!discordId.trim()) return;
    setBusy(true);
    setError('');
    const res = await fetch('/api/dashboard/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ discordId, username, role }),
    });
    const json = await res.json();
    setBusy(false);
    if (json.ok) {
      setMembers((m) => [...m, json.data]);
      setDiscordId('');
      setUsername('');
      setRole('team');
    } else {
      setError(json.message ?? 'Fehler beim Hinzufügen.');
    }
  }

  async function changeRole(member: Member, next: Role) {
    setMembers((m) =>
      m.map((x) => (x.discordId === member.discordId ? { ...x, role: next } : x)),
    );
    await fetch('/api/dashboard/members', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ discordId: member.discordId, role: next }),
    });
  }

  async function remove(id: string) {
    setMembers((m) => m.filter((x) => x.discordId !== id));
    await fetch(`/api/dashboard/members?id=${id}`, { method: 'DELETE' });
  }

  return (
    <div className="space-y-6">
      {/* Add member */}
      <Card className="space-y-3 p-5">
        <p className="text-sm text-text-secondary">
          Mitglied hinzufügen (z. B. ein Teammitglied vorab per Discord-ID
          anlegen, bevor es sich einloggt).
        </p>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
          <input
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Discord-ID…"
            className="rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-text-secondary focus:border-brand/50"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name (optional)…"
            className="rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-text-secondary focus:border-brand/50"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-sm text-white outline-none focus:border-brand/50"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <Button onClick={add} disabled={busy || !discordId.trim()}>
            <UserPlus className="size-4" />
            Hinzufügen
          </Button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </Card>

      {/* Member list */}
      {members.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">
          Noch keine Mitglieder. Sobald sich jemand über Discord anmeldet,
          erscheint er hier automatisch.
        </p>
      ) : (
        <div className="space-y-2">
          {members.map((m) => (
            <Card key={m.discordId} className="flex items-center gap-3 p-4">
              {m.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.avatar}
                  alt={m.username}
                  className="size-10 rounded-full border border-white/15"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-white/5 text-sm font-semibold text-brand">
                  {m.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">
                    {m.username}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${ROLE_BADGE[m.role]}`}
                  >
                    {ROLE_OPTIONS.find((r) => r.id === m.role)?.label}
                  </span>
                </div>
                <p className="mt-0.5 truncate font-mono text-xs text-text-secondary">
                  {m.discordId}
                </p>
              </div>
              <select
                value={m.role}
                onChange={(e) => changeRole(m, e.target.value as Role)}
                className="shrink-0 rounded-lg border border-border bg-surface/60 px-2 py-1.5 text-xs text-white outline-none focus:border-brand/50"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove(m.discordId)}
                className="shrink-0 rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                aria-label="Entfernen"
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
