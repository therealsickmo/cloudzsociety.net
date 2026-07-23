import type { ReactNode } from 'react';
import { Reveal } from '@/components/common/reveal';
import { ShowcaseCards } from '@/components/home/showcase-cards';
import { getContent } from '@/lib/content-store';
import type { ShowcaseContent } from '@/types';

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

/** Reusable showcase-style section: eyebrow + big title + subtitle + cards.
 *  Uses a wide max-width so the cards stretch across the page. */
export function ShowcaseSection({
  content,
  emphasis = false,
}: {
  content: ShowcaseContent;
  emphasis?: boolean;
}) {
  const { eyebrow, title, subtitle, cards } = content;
  return (
    <section className="relative py-20 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/15 after:to-transparent md:py-28">
      <div className={emphasis ? 'mx-auto max-w-[1600px] px-6' : 'mx-auto max-w-[1300px] px-6'}>
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

        <ShowcaseCards cards={cards} emphasis={emphasis} />
      </div>
    </section>
  );
}

export function Showcase() {
  return <ShowcaseSection content={getContent().showcase} emphasis />;
}
