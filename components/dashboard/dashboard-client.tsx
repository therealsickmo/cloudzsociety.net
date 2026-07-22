'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Clock,
  Globe,
  Inbox,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TodosPanel } from '@/components/dashboard/todos-panel';
import { TicketsPanel } from '@/components/dashboard/tickets-panel';
import { TimePanel } from '@/components/dashboard/time-panel';
import { MembersPanel } from '@/components/dashboard/members-panel';
import type {
  DashboardTicket,
  DashboardTodo,
  Member,
  SessionUser,
  TimeEntry,
} from '@/types';

interface DashboardClientProps {
  user: SessionUser;
  initial: {
    todos: DashboardTodo[];
    tickets: DashboardTicket[];
    time: TimeEntry[];
    members: Member[];
  };
}

type Tab = 'todos' | 'tickets' | 'time' | 'members';

const ROLE_LABEL: Record<SessionUser['role'], string> = {
  admin: 'Administrator',
  team: 'Teammitglied',
  player: 'Spieler',
};

export function DashboardClient({ user, initial }: DashboardClientProps) {
  const [tab, setTab] = useState<Tab>('todos');
  const canManage = user.role === 'admin' || user.role === 'team';

  const tabs: { id: Tab; label: string; icon: typeof CheckSquare }[] = [
    { id: 'todos', label: 'ToDos', icon: CheckSquare },
    { id: 'tickets', label: 'Tickets', icon: Inbox },
    { id: 'time', label: 'Zeitstempel', icon: Clock },
    ...(user.role === 'admin'
      ? [{ id: 'members' as Tab, label: 'Mitglieder', icon: Users }]
      : []),
  ];

  return (
    <div className="container py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name}
              className="size-12 rounded-full border border-white/15"
            />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-brand">
              <LayoutDashboard className="size-6" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <Badge variant={user.role === 'admin' ? 'premium' : 'default'}>
                {ROLE_LABEL[user.role]}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary">
              Willkommen in deinem CLOUDZ™ Dashboard.
            </p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href="/api/auth/logout">
            <LogOut className="size-4" />
            Abmelden
          </a>
        </Button>
      </div>

      {/* Player: empty state */}
      {!canManage && (
        <Card className="mt-10 p-10 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 text-brand">
            <Sparkles className="size-7" />
          </div>
          <h2 className="mt-6 text-lg font-semibold text-white">
            Dein Dashboard ist noch leer
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Hier findest du bald deine Statistiken, Ränge und Belohnungen. Wir
            bauen das Spieler-Dashboard gerade auf — schau bald wieder vorbei.
          </p>
        </Card>
      )}

      {/* Team / Admin */}
      {canManage && (
        <>
          {/* Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  tab === t.id
                    ? 'border-brand/40 bg-brand/15 text-white'
                    : 'border-border bg-surface/40 text-text-secondary hover:text-white',
                )}
              >
                <t.icon className="size-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === 'todos' && (
              <TodosPanel initial={initial.todos} members={initial.members} />
            )}
            {tab === 'tickets' && (
              <TicketsPanel
                initial={initial.tickets}
                members={initial.members}
              />
            )}
            {tab === 'time' && (
              <TimePanel initial={initial.time} userId={user.sub} />
            )}
            {tab === 'members' && user.role === 'admin' && (
              <MembersPanel initial={initial.members} />
            )}
          </div>

          {/* Admin-only: website management */}
          {user.role === 'admin' && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Globe className="size-5 text-brand" />
                Website verwalten
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Inhalte, Einstellungen, Team, Shop und mehr — die klassischen
                Admin-Optionen der Website.
              </p>
              <div className="mt-5">
                <Button asChild>
                  <Link href="/admin">
                    <Globe className="size-4" />
                    Zum Website-Adminbereich
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
