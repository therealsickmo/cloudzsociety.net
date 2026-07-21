'use client';

import { Activity, Gauge, MessageCircle, UserCheck, Users } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Card } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/common/animated-counter';
import { useServerStatus } from '@/hooks/use-server-status';
import {
  useContent,
  useSettings,
} from '@/components/providers/settings-provider';
import { formatUptime } from '@/lib/utils';

export function Stats() {
  const { status, loading } = useServerStatus();
  const { connectAddress } = useSettings();
  const heading = useContent().stats;

  const items = [
    {
      icon: Users,
      label: 'Spieler online',
      value: status?.playersOnline ?? 0,
      render: (v: number) => <AnimatedCounter value={v} />,
    },
    {
      icon: UserCheck,
      label: 'Registrierte Spieler',
      value: status?.registeredPlayers ?? 0,
      render: (v: number) => <AnimatedCounter value={v} />,
    },
    {
      icon: MessageCircle,
      label: 'Discord Mitglieder',
      value: status?.discordMembers ?? 0,
      render: (v: number) => <AnimatedCounter value={v} />,
    },
    {
      icon: Gauge,
      label: 'Server Version',
      value: 0,
      render: () => <span>{status?.version ?? '—'}</span>,
    },
    {
      icon: Activity,
      label: 'Uptime',
      value: 0,
      render: () => (
        <span>{status ? formatUptime(status.uptime) : '—'}</span>
      ),
    },
  ];

  return (
    <Section id="stats">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />

      <Reveal>
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-white">
                {loading ? 'Verbinde…' : 'Netzwerk online'}
              </span>
            </div>
            <span className="text-xs text-text-secondary">{connectAddress}</span>
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            {items.map((item) => (
              <div key={item.label} className="p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <item.icon className="size-5" />
                </div>
                <div className="mt-4 text-2xl font-bold tabular-nums text-white md:text-3xl">
                  {loading ? (
                    <span className="inline-block h-8 w-16 animate-pulse rounded-md bg-white/10" />
                  ) : (
                    item.render(item.value)
                  )}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-text-secondary">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
