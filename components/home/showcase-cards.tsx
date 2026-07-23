import { CardSkin } from '@/components/home/skin-render';
import { getIcon } from '@/lib/icons';
import { iconStyle, pillStyle } from '@/lib/tag-colors';
import type { ShowcaseCard } from '@/types';

type Tag = { icon: string; label: string; color?: string; iconColor?: string };

/** Normalise tags, tolerating the old comma-string format. */
function normalizeTags(raw: unknown): Tag[] {
  if (Array.isArray(raw)) {
    return raw.map((t) => ({
      icon: String((t as Tag)?.icon ?? 'Sparkles'),
      label: String((t as Tag)?.label ?? ''),
      color: (t as Tag)?.color ?? 'blue',
      iconColor: (t as Tag)?.iconColor ?? 'blue',
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
          ? { icon: a.trim(), label: b.trim(), color: 'blue', iconColor: 'blue' }
          : { icon: 'Sparkles', label: a.trim(), color: 'blue', iconColor: 'blue' };
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
            <div className="group relative flex min-h-[640px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand/40 hover:shadow-[0_0_40px_rgb(var(--brand-500)/0.25)]">
              <div className="flex items-center gap-2.5">
                {/* Icon without background, subtle glow */}
                <CardIcon className="size-7 shrink-0 text-brand drop-shadow-[0_0_10px_rgb(var(--brand-500)/0.7)]" />
                {/* Title fills blue from left to right on hover, glow follows
                    the moving fill edge; stays blue while hovered */}
                <h3 className="relative inline-block text-2xl font-bold tracking-tight">
                  <span className="text-white">{c.title}</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 text-brand [clip-path:inset(0_100%_0_0)] drop-shadow-[0_0_8px_rgb(var(--brand-400))] transition-[clip-path] duration-700 ease-out group-hover:[clip-path:inset(0_0_0_0)]"
                  >
                    {c.title}
                  </span>
                </h3>
              </div>

              {/* Embedded description panel — uniform height; glow on hover */}
              <div className="mt-4 flex min-h-[132px] items-center rounded-2xl border border-white/[0.07] bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow] duration-300 group-hover:border-brand/40 group-hover:shadow-[0_0_20px_rgb(var(--brand-500)/0.28),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="whitespace-pre-line text-[13px] font-bold leading-relaxed text-text-secondary">
                  {c.description}
                </p>
              </div>
              <div className="mt-4 flex flex-nowrap gap-2">
                {tags.map((tag, t) => {
                  const TagIcon = getIcon(tag.icon);
                  return (
                    <span
                      key={`${tag.label}-${t}`}
                      style={pillStyle(tag.color)}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold"
                    >
                      <TagIcon
                        className="size-3.5 shrink-0"
                        style={iconStyle(tag.iconColor)}
                      />
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
