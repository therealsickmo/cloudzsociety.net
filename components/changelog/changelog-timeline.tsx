'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Search, Sparkles, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn, formatDate } from '@/lib/utils';
import type { ChangelogEntry } from '@/types';

type Filter = 'all' | 'feature' | 'improvement' | 'bugfix';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'feature', label: 'Features' },
  { value: 'improvement', label: 'Verbesserungen' },
  { value: 'bugfix', label: 'Bugfixes' },
];

const GROUPS = [
  {
    key: 'features' as const,
    type: 'feature' as const,
    label: 'Features',
    icon: Sparkles,
    accent: 'text-brand',
    dot: 'bg-brand',
  },
  {
    key: 'improvements' as const,
    type: 'improvement' as const,
    label: 'Verbesserungen',
    icon: Wrench,
    accent: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  {
    key: 'bugfixes' as const,
    type: 'bugfix' as const,
    label: 'Bugfixes',
    icon: Bug,
    accent: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
];

interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
}

export function ChangelogTimeline({ entries }: ChangelogTimelineProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .map((entry) => {
        const matchesQuery =
          q === '' ||
          entry.version.toLowerCase().includes(q) ||
          [...entry.features, ...entry.improvements, ...entry.bugfixes].some(
            (line) => line.toLowerCase().includes(q),
          );
        return matchesQuery ? entry : null;
      })
      .filter((entry): entry is ChangelogEntry => entry !== null);
  }, [entries, query]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Version oder Änderung suchen…"
            className="pl-11"
            aria-label="Changelog durchsuchen"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                filter === f.value
                  ? 'border-transparent bg-brand text-white shadow-glow-sm'
                  : 'border-border bg-surface/60 text-text-secondary hover:text-white',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-20 text-center text-text-secondary">
          Keine Einträge gefunden.
        </div>
      ) : (
        <div className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-border md:before:left-[calc(8rem+7px)]">
          {filtered.map((entry, index) => {
            const visibleGroups = GROUPS.filter(
              (g) =>
                (filter === 'all' || filter === g.type) &&
                entry[g.key].length > 0,
            );
            if (visibleGroups.length === 0) return null;

            return (
              <motion.div
                key={entry.version}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative flex flex-col gap-4 md:flex-row md:gap-8"
              >
                {/* Date + version rail */}
                <div className="flex items-center gap-4 md:w-32 md:flex-col md:items-end md:gap-1 md:pt-0.5 md:text-right">
                  <div className="order-2 md:order-1">
                    <div className="font-mono text-lg font-bold text-white">
                      v{entry.version}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <span className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-background bg-brand shadow-glow-sm md:left-32" />

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-border bg-card p-6 md:ml-4">
                  <Badge variant="outline" className="mb-4">
                    {entry.category}
                  </Badge>
                  <div className="space-y-5">
                    {visibleGroups.map((group) => (
                      <div key={group.key}>
                        <h4
                          className={cn(
                            'flex items-center gap-2 text-sm font-semibold',
                            group.accent,
                          )}
                        >
                          <group.icon className="size-4" />
                          {group.label}
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                          {entry[group.key].map((line) => (
                            <li
                              key={line}
                              className="flex items-start gap-2.5 text-sm text-text-secondary"
                            >
                              <span
                                className={cn(
                                  'mt-1.5 size-1.5 shrink-0 rounded-full',
                                  group.dot,
                                )}
                              />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
