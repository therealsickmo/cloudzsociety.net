'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIcon, ICON_OPTIONS } from '@/lib/icons';
import {
  COLOR_HUES,
  COLOR_VARIANTS,
  colorLabel,
  pillStyle,
} from '@/lib/tag-colors';

/** Closes the popover when clicking outside of `ref`. */
function useOutsideClose(
  ref: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

// ── Icon picker (tile grid + search) ───────────────────────────────
export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  useOutsideClose(ref, () => setOpen(false));

  const Current = getIcon(value || 'Sparkles');
  const matches = q
    ? ICON_OPTIONS.filter((o) => o.value.toLowerCase().includes(q.toLowerCase()))
    : ICON_OPTIONS;
  // Cap rendered tiles for performance (search narrows the full set).
  const filtered = matches.slice(0, 300);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 text-sm text-white hover:border-brand/50"
      >
        <Current className="size-5 text-brand" />
        <span className="flex-1 truncate text-left">{value || 'Sparkles'}</span>
        <ChevronDown className="size-4 text-text-secondary" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-72 rounded-xl border border-border bg-surface p-3 shadow-xl">
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-background/60 px-2">
            <Search className="size-4 text-text-secondary" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Icon suchen…"
              className="h-9 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-text-secondary"
            />
          </div>
          <div className="grid max-h-64 grid-cols-6 gap-1 overflow-y-auto">
            {filtered.map((o) => {
              const Icon = getIcon(o.value);
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  title={o.value}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-lg border transition-colors',
                    active
                      ? 'border-brand bg-brand/15 text-brand'
                      : 'border-transparent text-text-secondary hover:border-border hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Icon className="size-5" />
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="col-span-6 py-4 text-center text-xs text-text-secondary">
                Kein Icon gefunden.
              </p>
            )}
          </div>
          <p className="mt-2 text-center text-[11px] text-text-secondary">
            {matches.length > filtered.length
              ? `${filtered.length} von ${matches.length} — tippe zum Suchen`
              : `${matches.length} Icons`}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Colour picker (hue × 5 variants, coloured labels) ──────────────
export function ColorPicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useOutsideClose(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full items-center gap-2 rounded-xl border border-border bg-surface/60 px-2 text-sm hover:border-brand/50"
      >
        <span
          className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold"
          style={pillStyle(value)}
        >
          {label ? `${label}` : colorLabel(value)}
        </span>
        <span className="flex-1" />
        <ChevronDown className="size-4 text-text-secondary" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-72 w-72 space-y-2 overflow-y-auto rounded-xl border border-border bg-surface p-3 shadow-xl">
          {COLOR_HUES.map((hue) => (
            <div key={hue.value}>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                {hue.label}
              </div>
              <div className="flex flex-wrap gap-1">
                {COLOR_VARIANTS.map((variant) => {
                  const val = `${hue.value}-${variant.value}`;
                  const active = value === val;
                  return (
                    <button
                      key={variant.value}
                      type="button"
                      onClick={() => {
                        onChange(val);
                        setOpen(false);
                      }}
                      style={pillStyle(val)}
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-[11px] font-bold transition-transform hover:scale-105',
                        active && 'ring-2 ring-white/70',
                      )}
                    >
                      {variant.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
