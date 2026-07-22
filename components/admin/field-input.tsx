'use client';

import { useRef, useState } from 'react';
import { Check, Loader2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getIcon, ICON_OPTIONS } from '@/lib/icons';
import type { Field } from '@/components/admin/schema';

interface FieldInputProps {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
  id: string;
}

/** Renders the right input control for a schema field. */
export function FieldInput({ field, value, onChange, id }: FieldInputProps) {
  return (
    <div className={cn('space-y-1.5', field.wide && 'sm:col-span-2')}>
      <Label htmlFor={id}>{field.label}</Label>
      <Control field={field} value={value} onChange={onChange} id={id} />
      {field.hint && (
        <p className="text-xs text-text-secondary">{field.hint}</p>
      )}
    </div>
  );
}

function Control({ field, value, onChange, id }: FieldInputProps) {
  switch (field.type) {
    case 'textarea':
      return (
        <Textarea
          id={id}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'lines': {
      const arr = Array.isArray(value) ? (value as string[]) : [];
      return (
        <Textarea
          id={id}
          value={arr.join('\n')}
          placeholder={field.placeholder ?? 'Ein Eintrag pro Zeile'}
          onChange={(e) =>
            onChange(
              e.target.value
                .split('\n')
                .map((line) => line.trimEnd())
                .filter((line, i, all) => line !== '' || i < all.length - 1),
            )
          }
        />
      );
    }

    case 'number':
      return (
        <Input
          id={id}
          type="number"
          value={value === null || value === undefined ? '' : String(value)}
          placeholder={field.placeholder}
          onChange={(e) =>
            onChange(e.target.value === '' ? 0 : Number(e.target.value))
          }
        />
      );

    case 'nullable-number':
      return (
        <Input
          id={id}
          type="number"
          value={value === null || value === undefined ? '' : String(value)}
          placeholder={field.placeholder ?? 'leer = unbegrenzt'}
          onChange={(e) =>
            onChange(e.target.value === '' ? null : Number(e.target.value))
          }
        />
      );

    case 'date':
      return (
        <Input
          id={id}
          type="date"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'boolean':
      return (
        <button
          type="button"
          id={id}
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className={cn(
            'flex h-11 w-full items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors',
            value
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-border bg-surface/60 text-text-secondary',
          )}
        >
          <span
            className={cn(
              'flex size-5 items-center justify-center rounded-full border',
              value
                ? 'border-emerald-400 bg-emerald-500 text-white'
                : 'border-border',
            )}
          >
            {value ? <Check className="size-3.5" /> : null}
          </span>
          {value ? 'Ja / aktiv' : 'Nein / inaktiv'}
        </button>
      );

    case 'color': {
      const hex = String(value ?? '#000000');
      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(e.target.value)}
            className="h-11 w-14 shrink-0 cursor-pointer rounded-xl border border-border bg-surface/60 p-1"
          />
          <Input
            id={id}
            value={hex}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#0066FF"
            className="font-mono"
          />
        </div>
      );
    }

    case 'select':
      return (
        <select
          id={id}
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm text-white focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface">
              {opt.label}
            </option>
          ))}
        </select>
      );

    case 'icon':
      return (
        <IconControl id={id} value={String(value ?? '')} onChange={onChange} />
      );

    case 'image':
      return (
        <ImageControl id={id} value={String(value ?? '')} onChange={onChange} />
      );

    default:
      return (
        <Input
          id={id}
          value={String(value ?? '')}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

/** Icon picker with a live preview of the selected icon. */
function IconControl({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: unknown) => void;
}) {
  const Icon = getIcon(value || 'Sparkles');
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/60 text-brand">
        <Icon className="size-5" />
      </span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm text-white focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        {ICON_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Image path field with a preview and a direct upload button. */
function ImageControl({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: unknown) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(file: File) {
    setBusy(true);
    setError('');
    const body = new FormData();
    body.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const json = await res.json();
      if (json.ok) onChange(json.path);
      else setError(json.message ?? 'Upload fehlgeschlagen.');
    } catch {
      setError('Upload fehlgeschlagen.');
    }
    setBusy(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Vorschau"
            className="size-14 shrink-0 rounded-lg border border-border bg-surface/60 object-contain p-1"
          />
        ) : (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-surface/60 text-text-secondary">
            <Upload className="size-5" />
          </div>
        )}
        <div className="flex-1">
          <Input
            id={id}
            value={value}
            placeholder="/images/…"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 text-sm font-medium text-white transition-colors hover:border-brand/50 disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}
          Hochladen
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
