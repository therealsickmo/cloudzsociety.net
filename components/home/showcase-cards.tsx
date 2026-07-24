import type { ReactNode } from 'react';
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

/** Card title: white base with a blue flowing overlay that wipes in on hover. */
function FlowTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        'title-flow-wrap font-extrabold tracking-tight',
        className,
      )}
    >
      <span className="title-base">{children}</span>
      <span className="title-flow" aria-hidden="true">
        {children}
      </span>
    </h3>
  );
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
            <div className="group relative rounded-[1.75rem] transition-transform duration-300 hover:scale-[1.02]">
              {/* Soft multi-blue glow — only on hover, behind the skin */}
              <div className="card-glow" aria-hidden="true" />

              {/* Frosted 3D glass — visible thickness, blue lit top, receding depth */}
              <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-start overflow-visible rounded-[1.75rem] border border-[rgba(147,197,253,0.32)] bg-gradient-to-b from-[rgba(46,80,140,0.6)] via-[rgba(33,60,110,0.5)] to-[rgba(23,44,84,0.55)] p-8 pt-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_4px_11px_rgba(147,197,253,0.3),inset_0_-26px_44px_-20px_rgba(3,9,26,0.75),0_42px_82px_-16px_rgba(0,0,0,0.6),0_18px_46px_-12px_rgba(37,99,235,0.38)] backdrop-blur-2xl">
                {/* Inner bevel ring → the glass reads as having real thickness */}
                <div className="pointer-events-none absolute inset-[5px] rounded-[1.5rem] border border-[rgba(173,206,255,0.16)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-10px_20px_-10px_rgba(0,0,0,0.45)]" />
                {/* Glossy reflection: bluish top sheen + soft diagonal light streak */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[rgba(173,206,255,0.2)] via-[rgba(96,165,250,0.05)] to-transparent" />
                  <div className="absolute -left-1/3 top-[-20%] h-[140%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-[rgba(191,219,254,0.14)] to-transparent blur-md" />
                  <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(147,197,253,0.3)] to-transparent" />
                </div>

                {/* Skin — small, stands at the bottom-left corner, peeking out
                    of the box. Fixed frame so all skins render the same size. */}
                <div className="pointer-events-none absolute bottom-0 left-[-18%] z-30 h-[46%] w-[40%]">
                  <CardSkin src={c.image} />
                </div>

                {/* Content — up top, left-aligned */}
                <div className="relative z-10 flex w-full flex-col items-start gap-3.5 text-left">
                  <div className="flex items-center gap-2.5">
                    <CardIcon className="size-9 shrink-0 text-brand drop-shadow-[0_0_10px_rgb(var(--brand-500)/0.7)]" />
                    <FlowTitle className="text-[1.7rem]">{c.title}</FlowTitle>
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
            className="group relative rounded-[1.75rem] transition-transform duration-300"
          >
            {/* Soft multi-blue glow — only on hover, behind the skin */}
            <div className="card-glow" aria-hidden="true" />
            <div
              className={cn(
                'relative z-10 flex min-h-[340px] flex-col overflow-hidden rounded-[1.75rem] border border-[rgba(147,197,253,0.32)] bg-gradient-to-b from-[rgba(46,80,140,0.55)] via-[rgba(33,60,110,0.48)] to-[rgba(23,44,84,0.52)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_4px_11px_rgba(147,197,253,0.28),inset_0_-26px_44px_-20px_rgba(3,9,26,0.7),0_42px_82px_-16px_rgba(0,0,0,0.6),0_18px_46px_-12px_rgba(37,99,235,0.34)] backdrop-blur-2xl md:flex-row',
                skinRight && 'md:flex-row-reverse',
              )}
            >
            {/* Inner bevel ring → real glass thickness */}
            <div className="pointer-events-none absolute inset-[5px] z-[1] rounded-[1.5rem] border border-[rgba(173,206,255,0.16)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-10px_20px_-10px_rgba(0,0,0,0.45)]" />
            {/* Glossy reflection: top sheen + soft diagonal light streak */}
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[1.75rem]">
              <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[rgba(173,206,255,0.16)] via-[rgba(96,165,250,0.04)] to-transparent" />
              <div className="absolute -left-1/4 top-[-20%] h-[140%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-[rgba(191,219,254,0.12)] to-transparent blur-md" />
            </div>
            <div className="relative z-[2] h-64 w-full shrink-0 md:h-auto md:w-[34%]">
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
                  <FlowTitle className="text-2xl">{c.title}</FlowTitle>
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
          </div>
        );
      })}
    </div>
  );
}
