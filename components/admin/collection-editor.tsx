'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Plus,
  Save,
  Search,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldInput } from '@/components/admin/field-input';
import { useToast } from '@/components/admin/toast';
import type { Field } from '@/components/admin/schema';

interface CollectionEditorProps<T extends object> {
  resource: string;
  fields: Field[];
  newItem: () => T;
  itemLabel: (item: T) => string;
  itemMeta?: (item: T) => string;
  /** Optional small visual shown left of the label in the list. */
  renderPreview?: (item: T) => ReactNode;
}

type Status = 'idle' | 'loading' | 'saving';

export function CollectionEditor<T extends object>({
  resource,
  fields,
  newItem,
  itemLabel,
  itemMeta,
  renderPreview,
}: CollectionEditorProps<T>) {
  const toast = useToast();
  const [items, setItems] = useState<T[]>([]);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<Status>('loading');
  const [dirty, setDirty] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`/api/admin/${resource}`)
      .then((res) => res.json())
      .then((data: { data: T[] }) => {
        setItems(data.data ?? []);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('idle');
        toast('Laden fehlgeschlagen.', 'error');
      });
  }, [resource, toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((item, index) => ({ item, index }))
      .filter(
        ({ item }) =>
          q === '' ||
          itemLabel(item).toLowerCase().includes(q) ||
          (itemMeta?.(item).toLowerCase().includes(q) ?? false),
      );
  }, [items, query, itemLabel, itemMeta]);

  function updateField(key: string, value: unknown) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === selected ? ({ ...item, [key]: value } as T) : item,
      ),
    );
    setDirty(true);
  }

  function addItem() {
    setItems((prev) => [...prev, newItem()]);
    setSelected(items.length);
    setDirty(true);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setSelected((s) => Math.max(0, s >= index ? s - 1 : s));
    setDirty(true);
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSelected(target);
    setDirty(true);
  }

  async function save() {
    setStatus('saving');
    try {
      const res = await fetch(`/api/admin/${resource}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!data.ok) throw new Error(data.message);
      setDirty(false);
      toast('Gespeichert', 'success');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.', 'error');
    } finally {
      setStatus('idle');
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 py-20 text-text-secondary">
        <Loader2 className="size-5 animate-spin" /> Lädt…
      </div>
    );
  }

  const current = items[selected];

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* List */}
      <div className="flex flex-col gap-3">
        <Button onClick={addItem} variant="secondary" className="w-full">
          <Plus className="size-4" /> Neu hinzufügen
        </Button>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen…"
            className="pl-10"
          />
        </div>

        <div className="flex max-h-[60vh] flex-col gap-1.5 overflow-y-auto rounded-2xl border border-border bg-surface/40 p-2">
          {filtered.length === 0 && (
            <p className="p-4 text-center text-sm text-text-secondary">
              Keine Einträge.
            </p>
          )}
          {filtered.map(({ item, index }) => (
            <div
              key={index}
              className={cn(
                'group flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors',
                index === selected
                  ? 'border-brand/40 bg-brand/10'
                  : 'border-transparent hover:bg-white/5',
              )}
            >
              <button
                onClick={() => setSelected(index)}
                className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
              >
                {renderPreview && (
                  <span className="shrink-0">{renderPreview(item)}</span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">
                    {itemLabel(item) || '(ohne Titel)'}
                  </span>
                  {itemMeta && (
                    <span className="block truncate text-xs text-text-secondary">
                      {itemMeta(item)}
                    </span>
                  )}
                </span>
              </button>
              {query === '' && (
                <span className="flex shrink-0 flex-col opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => move(index, -1)}
                    className="text-text-secondary hover:text-white"
                    aria-label="Nach oben"
                  >
                    <ChevronUp className="size-4" />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    className="text-text-secondary hover:text-white"
                    aria-label="Nach unten"
                  >
                    <ChevronDown className="size-4" />
                  </button>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-2xl border border-border bg-card p-6">
        {current ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="truncate text-lg font-semibold text-white">
                {itemLabel(current) || 'Neuer Eintrag'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(selected)}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="size-4" /> Löschen
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <FieldInput
                  key={field.key}
                  id={`${resource}-${field.key}`}
                  field={field}
                  value={(current as Record<string, unknown>)[field.key]}
                  onChange={(v) => updateField(field.key, v)}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="py-16 text-center text-text-secondary">
            Wähle links einen Eintrag oder füge einen neuen hinzu.
          </p>
        )}
      </div>

      {/* Save bar */}
      <div className="sticky bottom-4 lg:col-span-2">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 px-5 py-3 shadow-soft backdrop-blur">
          <span className="flex items-center gap-2 text-sm text-text-secondary">
            {dirty && (
              <span className="size-2 rounded-full bg-amber-400" title="Ungespeicherte Änderungen" />
            )}
            {items.length} Einträge{dirty ? ' · ungespeichert' : ''}
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
