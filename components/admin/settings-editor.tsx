'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FieldInput } from '@/components/admin/field-input';
import type { Field } from '@/components/admin/schema';
import type { SiteSettings } from '@/types';

type Status = 'loading' | 'idle' | 'saving' | 'saved' | 'error';

interface SectionDef {
  title: string;
  group: keyof SiteSettings;
  fields: Field[];
}

const SECTIONS: SectionDef[] = [
  {
    title: 'Allgemein',
    group: 'site',
    fields: [
      { key: 'name', label: 'Markenname', type: 'text' },
      { key: 'tagline', label: 'Slogan', type: 'text', wide: true },
      { key: 'description', label: 'Beschreibung (SEO)', type: 'textarea', wide: true },
      { key: 'domain', label: 'Domain', type: 'text' },
    ],
  },
  {
    title: 'Minecraft-Server',
    group: 'minecraft',
    fields: [
      { key: 'ip', label: 'Server-IP', type: 'text' },
      { key: 'port', label: 'Port', type: 'text' },
    ],
  },
  {
    title: 'Links',
    group: 'links',
    fields: [
      { key: 'discord', label: 'Discord-Einladung', type: 'text', wide: true },
      { key: 'wiki', label: 'Wiki-URL (GitBook)', type: 'text', wide: true },
      { key: 'github', label: 'GitHub-URL', type: 'text', wide: true },
    ],
  },
  {
    title: 'Serverstatistik (Mockdaten)',
    group: 'stats',
    fields: [
      { key: 'online', label: 'Server online', type: 'boolean' },
      { key: 'version', label: 'Version', type: 'text' },
      { key: 'playersOnline', label: 'Spieler online', type: 'number' },
      { key: 'playersMax', label: 'Max. Spieler', type: 'number' },
      { key: 'registeredPlayers', label: 'Registrierte Spieler', type: 'number' },
      { key: 'discordMembers', label: 'Discord-Mitglieder', type: 'number' },
      { key: 'uptimeDays', label: 'Uptime (Tage)', type: 'number' },
      { key: 'uptimeHours', label: 'Uptime (Stunden)', type: 'number' },
    ],
  },
];

export function SettingsEditor() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data: { data: SiteSettings }) => {
        setSettings(data.data);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('error');
        setMessage('Laden fehlgeschlagen.');
      });
  }, []);

  function update(group: keyof SiteSettings, key: string, value: unknown) {
    setSettings((prev) =>
      prev
        ? { ...prev, [group]: { ...prev[group], [key]: value } }
        : prev,
    );
  }

  async function save() {
    if (!settings) return;
    setStatus('saving');
    setMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!data.ok) throw new Error(data.message);
      setStatus('saved');
      setMessage('Gespeichert ✓');
      window.setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Fehler beim Speichern.');
    }
  }

  if (status === 'loading' || !settings) {
    return (
      <div className="flex items-center gap-2 py-20 text-text-secondary">
        <Loader2 className="size-5 animate-spin" /> Lädt…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => (
        <div
          key={section.group}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="mb-5 text-lg font-semibold text-white">
            {section.title}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <FieldInput
                key={field.key}
                id={`${section.group}-${field.key}`}
                field={field}
                value={(settings[section.group] as Record<string, unknown>)[field.key]}
                onChange={(v) => update(section.group, field.key, v)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-4">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 px-5 py-3 shadow-soft backdrop-blur">
          <span
            className={cn(
              'text-sm',
              status === 'error' ? 'text-red-400' : 'text-text-secondary',
            )}
          >
            {message || 'Änderungen werden in data/settings.json gespeichert'}
          </span>
          <Button onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Speichert…
              </>
            ) : (
              <>
                <Save className="size-4" /> Speichern
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
