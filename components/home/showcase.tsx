import type { ReactNode } from 'react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { CardSkin } from '@/components/home/skin-render';
import { getContent } from '@/lib/content-store';

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
  const { title, subtitle, cards } = getContent().showcase;

  return (
    <Section>
      {/* Big title + subtitle with underline accent */}
      <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
        <h2 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
          {highlightBrand(title)}
        </h2>
        <span className="h-0.5 w-20 rounded-full bg-gradient-to-r from-brand-400 to-brand-300 shadow-[0_0_10px_rgb(var(--brand-500))]" />
        {subtitle && (
          <p className="max-w-2xl text-pretty text-base font-semibold text-text-secondary md:text-lg">
            {subtitle}
          </p>
        )}
      </Reveal>

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const tags = card.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
          return (
            <Reveal key={`${card.title}-${i}`} delay={i * 0.1}>
              <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-brand-900/20 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {card.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag, t) => (
                    <span
                      key={`${tag}-${t}`}
                      className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
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
