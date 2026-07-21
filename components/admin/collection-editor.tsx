'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FieldInput } from '@/components/admin/field-input';
import type { Field } from '@/components/admin/schema';

interface CollectionEditorProps<T extends object> {
  /** API resource path segment, e.g. "products". */
  resource: string;
  fields: Field[];
  /** Factory for a new blank item. */
  newItem: () => T;
  /** Renders the label shown in the list for an item. */
  itemLabel: (item: T) => string;
  /** Optional secondary line in the list. */
  itemMeta?: (item: T) => string;
}

type Status = 'idle' | 'loading' | 'saving' | 'saved' | 'error';

export function CollectionEditor<T extends object>({
  resource,
  fields,
  newItem,
  itemLabel,
  itemMeta,
}: CollectionEditorProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/admin/${resource}`)
      .then((res) => res.json())
      .then((data: { data: T[] }) => {
        setItems(data.data ?? []);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('error');
        setMessage('Laden fehlgeschlagen.');
      });
  }, [resource]);

  function updateField(key: string, value: unknown) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === selected ? ({ ...item, [key]: value } as T) : item,
      ),
    );
  }

  function addItem() {
    setItems((prev) => [...prev, newItem()]);
    setSelected(items.length);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setSelected((s) => Math.max(0, s > index ? s - 1 : s));
  }

  async function save() {
    setStatus('saving');
    setMessage('');
    try {
      const res = await fetch(`/api/admin/${resource}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!data.ok) throw new Error(data.message);
      setStatus('saved');
      setMessage('Gespeichert ✓');
      window.setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Speichern fehlgeschlagen.');
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
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* List */}
      <div className="flex flex-col gap-3">
        <Button onClick={addItem} variant="secondary" className="w-full">
          <Plus className="size-4" /> Neu hinzufügen
        </Button>
        <div className="flex max-h-[65vh] flex-col gap-1.5 overflow-y-auto rounded-2xl border border-border bg-surface/40 p-2">
          {items.length === 0 && (
            <p className="p-4 text-center text-sm text-text-secondary">
              Noch keine Einträge.
            </p>
          )}
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'flex flex-col rounded-xl border px-3 py-2.5 text-left transition-colors',
                i === selected
                  ? 'border-brand/40 bg-brand/10'
                  : 'border-transparent hover:bg-white/5',
              )}
            >
              <span className="truncate text-sm font-medium text-white">
                {itemLabel(item) || '(ohne Titel)'}
              </span>
              {itemMeta && (
                <span className="truncate text-xs text-text-secondary">
                  {itemMeta(item)}
                </span>
              )}
            </button>
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
          <span
            className={cn(
              'text-sm',
              status === 'error' ? 'text-red-400' : 'text-text-secondary',
            )}
          >
            {message || `${items.length} Einträge`}
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
