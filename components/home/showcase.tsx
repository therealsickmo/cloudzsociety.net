import type { ReactNode } from 'react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { CardSkin } from '@/components/home/skin-render';
import { getContent } from '@/lib/content-store';
import { getIcon } from '@/lib/icons';

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
          const tags = normalizeTags(card.tags);
          return (
            <Reveal key={`${card.title}-${i}`} delay={i * 0.1}>
              <div className="group relative flex min-h-[640px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-brand-500/[0.06] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand/50 hover:shadow-[0_0_40px_rgb(var(--brand-500)/0.3)]">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand shadow-[0_0_16px_rgb(var(--brand-500)/0.25)] transition-transform duration-300 group-hover:scale-110">
                    <CardIcon className="size-6" />
                  </span>
                  <div className="w-fit">
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {card.title}
                    </h3>
                    {/* Blue underline (title width) — ignites on hover */}
                    <span className="mt-2 block h-0.5 w-full origin-left scale-x-0 rounded-full bg-brand-500 shadow-[0_0_10px_rgb(var(--brand-500)),0_0_5px_rgb(var(--brand-400))] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  </div>
                </div>

                <p className="mt-4 text-[15px] font-semibold leading-relaxed text-text-secondary">
                  {card.description}
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
                <CardSkin src={card.image} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
