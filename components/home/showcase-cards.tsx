'use client';

import { CardSkin } from '@/components/home/skin-render';
import { getIcon } from '@/lib/icons';
import type { ShowcaseCard } from '@/types';

type Tag = { icon: string; label: string };

/** Normalise tags to {icon,label}[], tolerating the old comma-string format. */
function normalizeTags(raw: unknown): Tag[] {
  if (Array.isArray(raw)) {
    return raw.map((t) => ({
      icon: String((t as Tag)?.icon ?? 'Sparkles'),
      label: String((t as Tag)?.label ?? ''),
    }));
  }
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [a, b] = s.split('|');
        return b !== undefined
          ? { icon: a.trim(), label: b.trim() }
          : { icon: 'Sparkles', label: a.trim() };
      });
  }
  return [];
}

export function ShowcaseCards({ cards }: { cards: ShowcaseCard[] }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
      {cards.map((c, i) => {
        const CardIcon = getIcon(c.icon);
        const tags = normalizeTags(c.tags);
        return (
          <div key={`${c.title}-${i}`}>
            <div className="group relative flex min-h-[640px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-brand-500/[0.06] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand/50 hover:shadow-[0_0_40px_rgb(var(--brand-500)/0.3)]">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand shadow-[0_0_16px_rgb(var(--brand-500)/0.25)] transition-transform duration-300 group-hover:scale-110">
                  <CardIcon className="size-6" />
                </span>
                <div className="w-fit">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {c.title}
                  </h3>
                  {/* Blue underline (title width) — ignites on hover */}
                  <span className="mt-2 block h-0.5 w-full origin-left scale-x-0 rounded-full bg-brand-500 shadow-[0_0_10px_rgb(var(--brand-500)),0_0_5px_rgb(var(--brand-400))] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </div>
              </div>

              <p className="mt-4 text-[15px] font-semibold leading-relaxed text-text-secondary">
                {c.description}
              </p>
              <div className="mt-5 flex flex-nowrap gap-2">
                {tags.map((tag, t) => {
                  const TagIcon = getIcon(tag.icon);
                  return (
                    <span
                      key={`${tag.label}-${t}`}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-white"
                    >
                      <TagIcon className="size-3.5 shrink-0 text-brand-200" />
                      {tag.label}
                    </span>
                  );
                })}
              </div>

              {/* Skin — large, on the left, anchored bottom */}
              <CardSkin src={c.image} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
