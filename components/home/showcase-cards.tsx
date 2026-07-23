import { CardSkin } from '@/components/home/skin-render';
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

export function ShowcaseCards({
  cards,
  emphasis = false,
}: {
  cards: ShowcaseCard[];
  /** Larger title/icon/text/tags and no embed box (used by the showcase). */
  emphasis?: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-[1300px] flex-col gap-8">
      {cards.map((c, i) => {
        const CardIcon = getIcon(c.icon);
        const tags = normalizeTags(c.tags);
        const skinRight = i % 2 === 1; // box 1 left, box 2 right, box 3 left…
        return (
          <div
            key={`${c.title}-${i}`}
            className={cn(
              'group relative flex min-h-[360px] flex-col overflow-visible rounded-3xl border border-white/10 bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_45px_-8px_rgb(var(--brand-500)/0.15)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-brand/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_55px_rgb(var(--brand-500)/0.3)] md:flex-row',
              skinRight && 'md:flex-row-reverse',
            )}
          >
            {/* Glass glow sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_80%_at_50%_-10%,rgb(var(--brand-500)/0.12),transparent_60%)]" />

            {/* Skin column */}
            <div className="relative h-64 w-full shrink-0 md:h-auto md:w-[34%]">
              <CardSkin src={c.image} />
            </div>

            {/* Content column — left-aligned block sitting at the outer edge */}
            <div
              className={cn(
                'relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12',
                skinRight ? 'items-start' : 'items-end',
              )}
            >
              <div
                className={cn(
                  'flex flex-col gap-4 text-left',
                  emphasis ? 'max-w-lg' : 'max-w-md',
                )}
              >
              <div className={cn('flex items-center', emphasis ? 'gap-3.5' : 'gap-2.5')}>
                <CardIcon
                  className={cn(
                    'shrink-0 text-brand drop-shadow-[0_0_10px_rgb(var(--brand-500)/0.7)]',
                    emphasis ? 'size-10' : 'size-7',
                  )}
                />
                <h3
                  className={cn(
                    'title-fill inline-block font-bold tracking-tight',
                    emphasis ? 'text-3xl md:text-4xl' : 'text-2xl',
                  )}
                >
                  {c.title}
                </h3>
              </div>

              {emphasis ? (
                /* No embed box — larger text directly */
                <p className="whitespace-pre-line text-lg font-bold leading-relaxed text-text-secondary">
                  {c.description}
                </p>
              ) : (
                /* Embedded description panel — glow on hover */
                <div className="flex min-h-[104px] w-full items-center rounded-2xl border border-white/[0.07] bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow] duration-300 group-hover:border-brand/40 group-hover:shadow-[0_0_20px_rgb(var(--brand-500)/0.28),inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <p className="whitespace-pre-line text-sm font-bold leading-relaxed text-text-secondary">
                    {c.description}
                  </p>
                </div>
              )}

              <div className={cn('flex flex-wrap', emphasis ? 'gap-3' : 'gap-2')}>
                {tags.map((tag, t) => {
                  const TagIcon = getIcon(tag.icon);
                  return (
                    <span
                      key={`${tag.label}-${t}`}
                      style={pillStyle(tag.color)}
                      className={cn(
                        'inline-flex items-center whitespace-nowrap rounded-full border font-bold',
                        emphasis
                          ? 'gap-2 px-4 py-2 text-sm'
                          : 'gap-1.5 px-2.5 py-1 text-[11px]',
                      )}
                    >
                      <TagIcon
                        className={cn('shrink-0', emphasis ? 'size-4' : 'size-3.5')}
                        style={iconStyle(tag.iconColor)}
                      />
                      {tag.label}
                    </span>
                  );
                })}
              </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
