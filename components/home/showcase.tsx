import type { ReactNode } from 'react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { CardSkin } from '@/components/home/skin-render';
import { getContent } from '@/lib/content-store';
import { getIcon } from '@/lib/icons';

/** Parse a tag string that may be "IconName|Label" into { icon, label }. */
function parseTag(raw: string): { icon: string; label: string } {
  const [a, b] = raw.split('|');
  return b !== undefined
    ? { icon: a.trim(), label: b.trim() }
    : { icon: 'Sparkles', label: a.trim() };
}

/** Colour every "CLOUDZ" / "CLOUDZ™" occurrence in the brand blue. */
function highlightBrand(text: string): ReactNode {
  return text.split(/(CLOUDZ™|CLOUDZ)/g).map((part, i) =>
    part === 'CLOUDZ™' || part === 'CLOUDZ' ? (
      <span key={i} className="text-brand">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Showcase() {
  const { eyebrow, title, subtitle, cards } = getContent().showcase;

  return (
    <Section>
      {/* Eyebrow + big title + subtitle */}
      <Reveal className="mb-14 flex flex-col items-center gap-3 text-center">
        {eyebrow && (
          <span className="text-sm font-extrabold uppercase tracking-widest text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="max-w-4xl text-balance text-4xl font-black tracking-tight text-white md:text-5xl">
          {highlightBrand(title)}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-pretty text-base font-semibold text-text-secondary md:text-lg">
            {subtitle}
          </p>
        )}
      </Reveal>

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const CardIcon = getIcon(card.icon);
          const tags = card.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
            .map(parseTag);
          return (
            <Reveal key={`${card.title}-${i}`} delay={i * 0.1}>
              <div className="group relative flex min-h-[640px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-brand-900/20 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand/50 hover:shadow-[0_0_40px_rgb(var(--brand-500)/0.3)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand shadow-[0_0_16px_rgb(var(--brand-500)/0.25)] transition-transform duration-300 group-hover:scale-110">
                    <CardIcon className="size-6" />
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] font-semibold leading-relaxed text-text-secondary">
                  {card.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag, t) => {
                    const TagIcon = getIcon(tag.icon);
                    return (
                      <span
                        key={`${tag.label}-${t}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold text-white"
                      >
                        <TagIcon className="size-3.5 text-brand-200" />
                        {tag.label}
                      </span>
                    );
                  })}
                </div>

                {/* Skin — large, on the left, anchored bottom */}
                <CardSkin src={card.image} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
