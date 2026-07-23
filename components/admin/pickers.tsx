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

// ── Icon categories (WhatsApp-style tabs) ──────────────────────────
const RECENT_KEY = 'cz_recent_icons';

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
function pushRecent(name: string): string[] {
  const next = [name, ...loadRecent().filter((n) => n !== name)].slice(0, 24);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

type Category = { key: string; label: string; tab: string; kw?: string[] };

const CATEGORIES: Category[] = [
  { key: 'recent', label: 'Zuletzt', tab: 'Clock' },
  { key: 'all', label: 'Alle', tab: 'LayoutGrid' },
  {
    key: 'symbols',
    label: 'Symbole',
    tab: 'Heart',
    kw: ['heart', 'star', 'shield', 'check', 'zap', 'flame', 'sparkle', 'crown', 'badge', 'award', 'gem', 'diamond', 'bell', 'flag', 'bookmark', 'tag', 'hash', 'infinity', 'circle', 'square', 'triangle', 'hexagon', 'plus', 'minus', 'x'],
  },
  {
    key: 'animals',
    label: 'Tiere & Natur',
    tab: 'Cat',
    kw: ['cat', 'dog', 'fish', 'bird', 'rabbit', 'bug', 'leaf', 'tree', 'flower', 'sprout', 'paw', 'feather', 'snail', 'squirrel', 'turtle', 'rat', 'egg', 'shell', 'clover', 'cactus', 'palm', 'bone', 'ham', 'worm', 'bird'],
  },
  {
    key: 'weather',
    label: 'Wetter',
    tab: 'Cloud',
    kw: ['sun', 'cloud', 'rain', 'snow', 'wind', 'moon', 'star', 'umbrella', 'thermometer', 'droplet', 'tornado', 'rainbow', 'haze', 'sunrise', 'sunset', 'zap'],
  },
  {
    key: 'food',
    label: 'Essen',
    tab: 'Pizza',
    kw: ['pizza', 'cake', 'coffee', 'wine', 'beer', 'apple', 'banana', 'egg', 'cookie', 'candy', 'cup', 'soup', 'ice-cream', 'cherry', 'carrot', 'croissant', 'donut', 'popcorn', 'sandwich', 'salad', 'milk', 'utensils', 'wheat', 'grape'],
  },
  {
    key: 'travel',
    label: 'Reisen',
    tab: 'Plane',
    kw: ['plane', 'car', 'ship', 'train', 'map', 'compass', 'tent', 'castle', 'mountain', 'bike', 'bus', 'truck', 'rocket', 'anchor', 'sail', 'fuel', 'luggage', 'globe', 'navigation', 'route', 'traffic', 'tractor', 'caravan', 'footprints'],
  },
  {
    key: 'activity',
    label: 'Aktivität',
    tab: 'Gamepad2',
    kw: ['dumbbell', 'trophy', 'medal', 'gamepad', 'dice', 'target', 'football', 'volleyball', 'tennis', 'goal', 'award', 'puzzle', 'sword', 'joystick', 'guitar', 'music', 'drum', 'ticket', 'party', 'gift', 'bike'],
  },
  {
    key: 'tech',
    label: 'Technik',
    tab: 'Cpu',
    kw: ['cpu', 'server', 'database', 'laptop', 'monitor', 'phone', 'wifi', 'bluetooth', 'battery', 'plug', 'mouse', 'keyboard', 'printer', 'camera', 'tv', 'radio', 'disc', 'hard-drive', 'memory', 'router', 'usb', 'cable', 'chip', 'circuit', 'bot', 'code', 'terminal', 'smartphone', 'tablet'],
  },
  {
    key: 'tools',
    label: 'Werkzeuge',
    tab: 'Wrench',
    kw: ['hammer', 'wrench', 'axe', 'brush', 'scissors', 'pencil', 'pen', 'ruler', 'drill', 'saw', 'screwdriver', 'paint', 'pickaxe', 'shovel', 'magnet'],
  },
  {
    key: 'objects',
    label: 'Objekte',
    tab: 'Package',
    kw: ['box', 'package', 'gift', 'key', 'lock', 'book', 'file', 'folder', 'mail', 'clock', 'calendar', 'coins', 'wallet', 'briefcase', 'lightbulb', 'umbrella', 'glasses', 'shirt', 'crown', 'camera', 'watch', 'lamp'],
  },
];

function categoryIcons(cat: Category) {
  if (!cat.kw) return ICON_OPTIONS;
  return ICON_OPTIONS.filter((o) => {
    const n = o.value.toLowerCase();
    return cat.kw!.some((k) => n.includes(k));
  });
}

// ── Icon picker (categorised tabs + recent + search) ───────────────
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
  const [cat, setCat] = useState('all');
  const [recent, setRecent] = useState<string[]>([]);
  useOutsideClose(ref, () => setOpen(false));

  useEffect(() => {
    if (open) {
      const r = loadRecent();
      setRecent(r);
      setCat(r.length ? 'recent' : 'all');
      setQ('');
    }
  }, [open]);

  const Current = getIcon(value || 'Sparkles');

  const select = (name: string) => {
    onChange(name);
    setRecent(pushRecent(name));
    setOpen(false);
  };

  const list = q
    ? ICON_OPTIONS.filter((o) => o.value.toLowerCase().includes(q.toLowerCase()))
    : cat === 'recent'
      ? recent.map((n) => ({ value: n, label: n }))
      : categoryIcons(CATEGORIES.find((c) => c.key === cat) ?? CATEGORIES[1]);

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
        <div className="absolute z-50 mt-2 w-80 rounded-xl border border-border bg-surface p-3 shadow-xl">
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

          {/* Category tabs */}
          {!q && (
            <div className="mb-2 flex items-center gap-1 overflow-x-auto border-b border-border pb-2">
              {CATEGORIES.map((c) => {
                if (c.key === 'recent' && recent.length === 0) return null;
                const Tab = getIcon(c.tab);
                const active = cat === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    title={c.label}
                    onClick={() => setCat(c.key)}
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                      active
                        ? 'bg-brand/15 text-brand'
                        : 'text-text-secondary hover:bg-white/5 hover:text-white',
                    )}
                  >
                    <Tab className="size-4" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid max-h-56 grid-cols-6 gap-1 overflow-y-auto">
            {list.map((o) => {
              const Icon = getIcon(o.value);
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  title={o.value}
                  onClick={() => select(o.value)}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-lg border transition-colors [contain-intrinsic-size:36px] [content-visibility:auto]',
                    active
                      ? 'border-brand bg-brand/15 text-brand'
                      : 'border-transparent text-text-secondary hover:border-border hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Icon className="size-5" />
                </button>
              );
            })}
            {list.length === 0 && (
              <p className="col-span-6 py-4 text-center text-xs text-text-secondary">
                {q ? 'Kein Icon gefunden.' : 'Noch nichts hier.'}
              </p>
            )}
          </div>
          <p className="mt-2 text-center text-[11px] text-text-secondary">
            {q
              ? `${list.length} gefunden`
              : cat === 'all'
                ? `${list.length} Icons — tippe zum Suchen`
                : `${list.length} Icons`}
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
