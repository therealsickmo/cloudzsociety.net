import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { CardSkin } from '@/components/home/skin-render';
import { getContent } from '@/lib/content-store';

export function Showcase() {
  const { sectionTitle, cards } = getContent().showcase;

  return (
    <Section>
      {/* Top heading with underline accent */}
      <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 className="max-w-3xl text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
          {sectionTitle}
        </h2>
        <span className="h-0.5 w-16 rounded-full bg-gradient-to-r from-brand-400 to-brand-300 shadow-[0_0_10px_rgb(var(--brand-500))]" />
      </Reveal>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const tags = card.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
          return (
            <Reveal key={`${card.title}-${i}`} delay={i * 0.1}>
              <div className="relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-brand-900/20 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
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

                {/* Skin on the left, smaller, anchored bottom */}
                <CardSkin src={card.image} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
