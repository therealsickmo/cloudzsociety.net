'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldInput } from '@/components/admin/field-input';
import { useToast } from '@/components/admin/toast';
import type { Field } from '@/components/admin/schema';
import type { SiteSettings } from '@/types';

type Status = 'loading' | 'idle' | 'saving';

interface SectionDef {
  title: string;
  group: keyof SiteSettings;
  fields: Field[];
}

const RADIUS_OPTIONS = [
  { value: 'eckig', label: 'Eckig' },
  { value: 'abgerundet', label: 'Abgerundet' },
  { value: 'pill', label: 'Rund (Pill)' },
];

const LOGO_SIZE_OPTIONS = [
  { value: 'klein', label: 'Klein' },
  { value: 'mittel', label: 'Mittel' },
  { value: 'gross', label: 'Groß' },
  { value: 'riesig', label: 'Riesig' },
];

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
    title: 'Farben & Design',
    group: 'theme',
    fields: [
      { key: 'brand', label: 'Hauptfarbe', type: 'color', hint: 'Akzentfarbe der ganzen Seite' },
      { key: 'background', label: 'Hintergrund', type: 'color' },
      { key: 'surface', label: 'Oberfläche', type: 'color' },
      { key: 'card', label: 'Karten', type: 'color' },
      { key: 'textSecondary', label: 'Sekundärtext', type: 'color' },
      { key: 'radius', label: 'Button-Form', type: 'select', options: RADIUS_OPTIONS },
    ],
  },
  {
    title: 'Startseite & Layout',
    group: 'layout',
    fields: [
      { key: 'heroLogoSize', label: 'Logo-Größe (Hero)', type: 'select', options: LOGO_SIZE_OPTIONS },
      { key: 'heroOverlay', label: 'Hintergrund-Abdunklung (%)', type: 'number', hint: '0 = hell, 90 = sehr dunkel' },
      { key: 'heroBackground', label: 'Hintergrundbild (Pfad)', type: 'text', wide: true, hint: 'z. B. /images/cloudz-banner-leer.png' },
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

const PRESETS: {
  name: string;
  colors: Pick<
    SiteSettings['theme'],
    'brand' | 'background' | 'surface' | 'card' | 'textSecondary'
  >;
}[] = [
  { name: 'Standard (Blau)', colors: { brand: '#0066FF', background: '#05070A', surface: '#0D1117', card: '#151B23', textSecondary: '#A8B3CF' } },
  { name: 'Violett', colors: { brand: '#7C3AED', background: '#07050C', surface: '#120D1C', card: '#1B1428', textSecondary: '#B7A8CF' } },
  { name: 'Smaragd', colors: { brand: '#10B981', background: '#04080A', surface: '#0B1512', card: '#121F1B', textSecondary: '#9FC7B8' } },
  { name: 'Rubin', colors: { brand: '#E11D48', background: '#0A0507', surface: '#170C11', card: '#20141A', textSecondary: '#CFA8B4' } },
  { name: 'Bernstein', colors: { brand: '#F59E0B', background: '#0A0703', surface: '#17110A', card: '#201812', textSecondary: '#CFC0A8' } },
  { name: 'Cyan', colors: { brand: '#06B6D4', background: '#04080A', surface: '#0B141A', card: '#121D26', textSecondary: '#A8C4CF' } },
  { name: 'Monochrom', colors: { brand: '#64748B', background: '#06080B', surface: '#0F141B', card: '#171D26', textSecondary: '#AEB6C2' } },
];

const SECTION_TOGGLES: { key: keyof SiteSettings['layout']['sections']; label: string }[] = [
  { key: 'about', label: 'Über Cloudz' },
  { key: 'features', label: 'Features' },
  { key: 'stats', label: 'Serverstatistik' },
  { key: 'cta', label: 'Call-to-Action' },
];

export function SettingsEditor() {
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data: { data: SiteSettings }) => {
        setSettings(data.data);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('idle');
        toast('Laden fehlgeschlagen.', 'error');
      });
  }, [toast]);

  function update(group: keyof SiteSettings, key: string, value: unknown) {
    setSettings((prev) =>
      prev ? { ...prev, [group]: { ...prev[group], [key]: value } } : prev,
    );
    setDirty(true);
  }

  function toggleSection(
    key: keyof SiteSettings['layout']['sections'],
    value: boolean,
  ) {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            layout: {
              ...prev.layout,
              sections: { ...prev.layout.sections, [key]: value },
            },
          }
        : prev,
    );
    setDirty(true);
  }

  function applyPreset(name: string) {
    const preset = PRESETS.find((p) => p.name === name);
    if (!preset || !settings) return;
    setSettings({ ...settings, theme: { ...settings.theme, ...preset.colors } });
    setDirty(true);
    toast(`Farbschema „${name}" übernommen`, 'info');
  }

  async function save() {
    if (!settings) return;
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!data.ok) throw new Error(data.message);
      setDirty(false);
      toast('Gespeichert', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Fehler beim Speichern.', 'error');
    } finally {
      setStatus('idle');
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

          {section.group === 'theme' && (
            <div className="mb-5 flex flex-col gap-2 rounded-xl border border-border bg-surface/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2 text-sm text-text-secondary">
                <Wand2 className="size-4 text-brand" />
                Fertige Farbschema-Vorlage anwenden:
              </span>
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) applyPreset(e.target.value);
                  e.currentTarget.value = '';
                }}
                className="h-10 rounded-xl border border-border bg-surface/60 px-3 text-sm text-white focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <option value="" className="bg-surface">
                  — Vorlage wählen —
                </option>
                {PRESETS.map((p) => (
                  <option key={p.name} value={p.name} className="bg-surface">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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

          {section.group === 'layout' && (
            <div className="mt-5 border-t border-border pt-5">
              <p className="mb-3 text-sm font-medium text-white">
                Sichtbare Startseiten-Bereiche
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {SECTION_TOGGLES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() =>
                      toggleSection(t.key, !settings.layout.sections[t.key])
                    }
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                      settings.layout.sections[t.key]
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        : 'border-border bg-surface/60 text-text-secondary'
                    }`}
                  >
                    {t.label}
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                        settings.layout.sections[t.key]
                          ? 'bg-emerald-500/20'
                          : 'bg-white/5'
                      }`}
                    >
                      {settings.layout.sections[t.key] ? 'sichtbar' : 'aus'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="sticky bottom-4">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 px-5 py-3 shadow-soft backdrop-blur">
          <span className="flex items-center gap-2 text-sm text-text-secondary">
            {dirty && <span className="size-2 rounded-full bg-amber-400" />}
            {dirty ? 'Ungespeicherte Änderungen' : 'Alle Änderungen gespeichert'}
          </span>
          <Button onClick={save} disabled={status === 'saving' || !dirty}>
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
