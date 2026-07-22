import type { ReactNode } from 'react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { ShowcaseCards } from '@/components/home/showcase-cards';
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

      <ShowcaseCards cards={cards} />
    </Section>
  );
}
