'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
