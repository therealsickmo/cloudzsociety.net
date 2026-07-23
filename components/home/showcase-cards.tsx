import { CardSkin } from '@/components/home/skin-render';
import { RevealCard } from '@/components/home/reveal-card';
import { getIcon } from '@/lib/icons';
import { iconStyle, pillStyle } from '@/lib/tag-colors';
import { cn } from '@/lib/utils';
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

function TagPill({ tag, big }: { tag: Tag; big?: boolean }) {
  const TagIcon = getIcon(tag.icon);
  return (
    <span
      style={pillStyle(tag.color)}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border font-bold',
        big ? 'gap-2 px-3.5 py-1.5 text-sm' : 'gap-1.5 px-2.5 py-1 text-[11px]',
      )}
    >
      <TagIcon
        className={cn('shrink-0', big ? 'size-4' : 'size-3.5')}
        style={iconStyle(tag.iconColor)}
      />
      {tag.label}
    </span>
  );
}

export function ShowcaseCards({
  cards,
  emphasis = false,
}: {
  cards: ShowcaseCard[];
  emphasis?: boolean;
}) {
  // ── Showcase: 3 compact square boxes in a row, skin on top-right (in front)
  if (emphasis) {
    return (
      <div className="mx-auto grid max-w-[1600px] gap-x-28 gap-y-16 md:grid-cols-3">
        {cards.map((c, i) => {
          const CardIcon = getIcon(c.icon);
          const tags = normalizeTags(c.tags);
          const box = (
            <div className="group relative flex min-h-[480px] flex-col items-center justify-start overflow-visible rounded-3xl border border-white/10 bg-white/[0.03] p-8 pt-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_40px_-10px_rgb(var(--brand-500)/0.15)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-brand/40 hover:shadow-[0_0_50px_rgb(var(--brand-500)/0.3)]">
              {/* Glass glow sheen */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_80%_at_50%_-10%,rgb(var(--brand-500)/0.12),transparent_60%)]" />

              {/* Skin — small, stands at the bottom-left corner, peeking out of
                  the box. Fixed frame so all skins render the same size. */}
              <div className="pointer-events-none absolute bottom-0 left-[-18%] z-20 h-[46%] w-[40%]">
                <CardSkin src={c.image} />
              </div>

              {/* Content — up top, left-aligned */}
              <div className="relative z-10 flex w-full flex-col items-start gap-3.5 text-left">
                <div className="flex items-center gap-2.5">
                  <CardIcon className="size-9 shrink-0 text-brand drop-shadow-[0_0_10px_rgb(var(--brand-500)/0.7)]" />
                  <h3 className="title-fill inline-block text-[1.7rem] font-extrabold tracking-tight">
                    {c.title}
                  </h3>
                </div>
                <p className="whitespace-pre-line text-[0.95rem] font-bold leading-relaxed text-text-secondary">
                  {c.description}
                </p>
                <div className="flex flex-wrap justify-start gap-2">
                  {tags.map((tag, t) => (
                    <TagPill key={`${tag.label}-${t}`} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          );
          return (
            <RevealCard key={`${c.title}-${i}`} index={i} total={cards.length}>
              {box}
            </RevealCard>
          );
        })}
      </div>
    );
  }

  // ── Features: wide stacked rows, skin on the side (alternating)
  return (
    <div className="mx-auto flex max-w-[1300px] flex-col gap-8">
      {cards.map((c, i) => {
        const CardIcon = getIcon(c.icon);
        const tags = normalizeTags(c.tags);
        const skinRight = i % 2 === 1;
        return (
          <div
            key={`${c.title}-${i}`}
            className={cn(
              'group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-brand/40 hover:shadow-[0_0_40px_rgb(var(--brand-500)/0.25)] md:flex-row',
              skinRight && 'md:flex-row-reverse',
            )}
          >
            <div className="relative h-64 w-full shrink-0 md:h-auto md:w-[34%]">
              <CardSkin src={c.image} />
            </div>
            <div
              className={cn(
                'relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12',
                skinRight ? 'items-start' : 'items-end',
              )}
            >
              <div className="flex max-w-md flex-col gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <CardIcon className="size-7 shrink-0 text-brand drop-shadow-[0_0_10px_rgb(var(--brand-500)/0.7)]" />
                  <h3 className="title-fill inline-block text-2xl font-extrabold tracking-tight">
                    {c.title}
                  </h3>
                </div>
                <div className="flex min-h-[104px] w-full items-center rounded-2xl border border-white/[0.07] bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow] duration-300 group-hover:border-brand/40 group-hover:shadow-[0_0_20px_rgb(var(--brand-500)/0.28),inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <p className="whitespace-pre-line text-sm font-bold leading-relaxed text-text-secondary">
                    {c.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, t) => (
                    <TagPill key={`${tag.label}-${t}`} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
