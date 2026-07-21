'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FieldInput } from '@/components/admin/field-input';
import { useToast } from '@/components/admin/toast';
import { ICON_OPTIONS } from '@/lib/icons';
import type { Field } from '@/components/admin/schema';

// ── Field presets ──────────────────────────────────────────────────
const HEADER_FIELDS: Field[] = [
  { key: 'eyebrow', label: 'Kleiner Titel (oben)', type: 'text' },
  { key: 'title', label: 'Überschrift', type: 'text', wide: true },
  { key: 'description', label: 'Beschreibung', type: 'textarea', wide: true },
];
const ICON_TEXT_FIELDS: Field[] = [
  { key: 'icon', label: 'Icon', type: 'select', options: ICON_OPTIONS },
  { key: 'title', label: 'Titel', type: 'text' },
  { key: 'text', label: 'Text', type: 'textarea', wide: true },
];

type Group =
  | { kind: 'fields'; title: string; path: string; fields: Field[] }
  | {
      kind: 'repeater';
      title: string;
      path: string;
      fields: Field[];
      itemLabel: (item: Record<string, unknown>) => string;
      newItem: () => Record<string, unknown>;
    };

const GROUPS: Group[] = [
  {
    kind: 'repeater',
    title: 'Navigation (Menü)',
    path: 'nav.items',
    fields: [
      { key: 'label', label: 'Beschriftung', type: 'text' },
      { key: 'href', label: 'Link (Pfad)', type: 'text', hint: 'z. B. /shop' },
      { key: 'badge', label: 'Badge (optional)', type: 'text', hint: 'z. B. Neu' },
      { key: 'enabled', label: 'Sichtbar', type: 'boolean' },
    ],
    itemLabel: (i) => String(i.label),
    newItem: () => ({ label: 'Neu', href: '/', enabled: true, badge: '' }),
  },
  {
    kind: 'fields',
    title: 'Hero (Startseite oben)',
    path: 'hero',
    fields: [
      { key: 'title', label: 'Titel (unter dem Logo)', type: 'text', wide: true },
      { key: 'subtitle', label: 'Untertitel-Text', type: 'textarea', wide: true },
    ],
  },
  {
    kind: 'repeater',
    title: 'Hero – Info-Bar',
    path: 'hero.stats',
    fields: [
      { key: 'icon', label: 'Icon', type: 'select', options: ICON_OPTIONS },
      { key: 'label', label: 'Beschriftung', type: 'text', hint: 'z. B. Gründung' },
      { key: 'value', label: 'Wert', type: 'text', hint: 'z. B. 01.02.2026' },
    ],
    itemLabel: (i) => `${i.label} · ${i.value}`,
    newItem: () => ({ icon: 'Sparkles', label: 'Neu', value: '' }),
  },
  {
    kind: 'fields',
    title: 'Über Cloudz – Überschrift',
    path: 'about',
    fields: HEADER_FIELDS,
  },
  {
    kind: 'repeater',
    title: 'Über Cloudz – Karten',
    path: 'about.points',
    fields: ICON_TEXT_FIELDS,
    itemLabel: (i) => String(i.title),
    newItem: () => ({ icon: 'Sparkles', title: 'Neu', text: '' }),
  },
  {
    kind: 'fields',
    title: 'Features – Überschrift',
    path: 'features',
    fields: HEADER_FIELDS,
  },
  {
    kind: 'repeater',
    title: 'Features – Karten',
    path: 'features.items',
    fields: ICON_TEXT_FIELDS,
    itemLabel: (i) => String(i.title),
    newItem: () => ({ icon: 'Star', title: 'Neu', text: '' }),
  },
  {
    kind: 'fields',
    title: 'Serverstatistik – Überschrift',
    path: 'stats',
    fields: HEADER_FIELDS,
  },
  {
    kind: 'fields',
    title: 'Call-to-Action (unten)',
    path: 'cta',
    fields: [
      { key: 'title', label: 'Überschrift', type: 'text', wide: true },
      { key: 'description', label: 'Beschreibung', type: 'textarea', wide: true },
      { key: 'joinLabel', label: 'Button „Beitreten“', type: 'text' },
      { key: 'discordLabel', label: 'Button „Discord“', type: 'text' },
    ],
  },
  {
    kind: 'fields',
    title: 'Footer',
    path: 'footer',
    fields: [
      { key: 'tagline', label: 'Spruch (neben Logo)', type: 'text', wide: true },
      { key: 'note', label: 'Hinweis (unten)', type: 'text', wide: true },
    ],
  },
  { kind: 'fields', title: 'Seite: Shop', path: 'pages.shop', fields: HEADER_FIELDS },
  { kind: 'fields', title: 'Seite: Team', path: 'pages.team', fields: HEADER_FIELDS },
  { kind: 'fields', title: 'Seite: Blog', path: 'pages.blog', fields: HEADER_FIELDS },
  {
    kind: 'fields',
    title: 'Seite: Changelog',
    path: 'pages.changelog',
    fields: HEADER_FIELDS,
  },
  { kind: 'fields', title: 'Seite: Bewerben', path: 'pages.apply', fields: HEADER_FIELDS },
  { kind: 'fields', title: 'Seite: Spenden', path: 'pages.donate', fields: HEADER_FIELDS },
  { kind: 'fields', title: 'Seite: Kontakt', path: 'pages.kontakt', fields: HEADER_FIELDS },
];

// ── Path helpers ───────────────────────────────────────────────────
type Json = Record<string, unknown>;

function getPath(obj: Json, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Json)[key];
    return undefined;
  }, obj);
}

function setPath(obj: Json, path: string, value: unknown): Json {
  const clone = structuredClone(obj);
  const keys = path.split('.');
  let cur: Json = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]] as Json;
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

type Status = 'loading' | 'idle' | 'saving' | 'error';

export function ContentEditor() {
  const toast = useToast();
  const [data, setData] = useState<Json | null>(null);
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<Status>('loading');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((res: { data: Json }) => {
        setData(res.data);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('idle');
        toast('Laden fehlgeschlagen.', 'error');
      });
  }, [toast]);

  function update(path: string, value: unknown) {
    setData((prev) => (prev ? setPath(prev, path, value) : prev));
    setDirty(true);
  }

  async function save() {
    if (!data) return;
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as { ok: boolean; message?: string };
      if (!result.ok) throw new Error(result.message);
      setDirty(false);
      toast('Gespeichert', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Fehler beim Speichern.', 'error');
    } finally {
      setStatus('idle');
    }
  }

  if (status === 'loading' || !data) {
    return (
      <div className="flex items-center gap-2 py-20 text-text-secondary">
        <Loader2 className="size-5 animate-spin" /> Lädt…
      </div>
    );
  }

  const group = GROUPS[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Section nav */}
      <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-2xl border border-border bg-surface/40 p-2">
        {GROUPS.map((g, i) => (
          <button
            key={g.path}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors',
              i === active
                ? 'bg-brand/15 text-white'
                : 'text-text-secondary hover:bg-white/5 hover:text-white',
            )}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-5 text-lg font-semibold text-white">{group.title}</h3>

          {group.kind === 'fields' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((field) => (
                <FieldInput
                  key={field.key}
                  id={`${group.path}-${field.key}`}
                  field={field}
                  value={getPath(data, `${group.path}.${field.key}`)}
                  onChange={(v) => update(`${group.path}.${field.key}`, v)}
                />
              ))}
            </div>
          ) : (
            <Repeater
              items={(getPath(data, group.path) as Json[]) ?? []}
              fields={group.fields}
              itemLabel={group.itemLabel}
              onAdd={() =>
                update(group.path, [
                  ...((getPath(data, group.path) as Json[]) ?? []),
                  group.newItem(),
                ])
              }
              onRemove={(index) =>
                update(
                  group.path,
                  ((getPath(data, group.path) as Json[]) ?? []).filter(
                    (_, i) => i !== index,
                  ),
                )
              }
              onChange={(index, key, value) => {
                const arr = [
                  ...((getPath(data, group.path) as Json[]) ?? []),
                ];
                arr[index] = { ...arr[index], [key]: value };
                update(group.path, arr);
              }}
              onMove={(index, dir) => {
                const arr = [
                  ...((getPath(data, group.path) as Json[]) ?? []),
                ];
                const target = index + dir;
                if (target < 0 || target >= arr.length) return;
                [arr[index], arr[target]] = [arr[target], arr[index]];
                update(group.path, arr);
              }}
            />
          )}
        </div>

        {/* Save bar */}
        <div className="sticky bottom-4 mt-6">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 px-5 py-3 shadow-soft backdrop-blur">
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              {dirty && (
                <span className="size-2 rounded-full bg-amber-400" />
              )}
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
    </div>
  );
}

// ── Repeater (array of objects) ────────────────────────────────────
function Repeater({
  items,
  fields,
  itemLabel,
  onAdd,
  onRemove,
  onChange,
  onMove,
}: {
  items: Json[];
  fields: Field[];
  itemLabel: (item: Json) => string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, key: string, value: unknown) => void;
  onMove: (index: number, dir: -1 | 1) => void;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-border bg-surface/40 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium text-white">
              {itemLabel(item) || `Eintrag ${index + 1}`}
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => onMove(index, -1)}
                disabled={index === 0}
                className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30"
                aria-label="Nach oben"
              >
                <ChevronUp className="size-4" />
              </button>
              <button
                onClick={() => onMove(index, 1)}
                disabled={index === items.length - 1}
                className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30"
                aria-label="Nach unten"
              >
                <ChevronDown className="size-4" />
              </button>
              <button
                onClick={() => onRemove(index)}
                className="rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                aria-label="Löschen"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <FieldInput
                key={field.key}
                id={`rep-${index}-${field.key}`}
                field={field}
                value={item[field.key]}
                onChange={(v) => onChange(index, field.key, v)}
              />
            ))}
          </div>
        </div>
      ))}
      <Button onClick={onAdd} variant="secondary" className="w-full">
        <Plus className="size-4" /> Hinzufügen
      </Button>
    </div>
  );
}
