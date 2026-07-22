import type { ReactNode } from 'react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Card } from '@/components/ui/card';
import { getContent } from '@/lib/content-store';
import { getIcon } from '@/lib/icons';

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

export function About() {
  const { eyebrow, title, description, points } = getContent().about;

  return (
    <Section id="about">
      <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
        {eyebrow && (
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </span>
        )}
        <h2 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
          {highlightBrand(title)}
        </h2>
        {description && (
          <p className="max-w-xl text-pretty text-sm text-text-secondary md:text-base">
            {description}
          </p>
        )}
      </Reveal>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point, i) => {
          const Icon = getIcon(point.icon);
          return (
            <Reveal key={`${point.title}-${i}`} delay={i * 0.08}>
              <Card className="h-full p-8 transition-colors duration-300 hover:border-brand/40">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-glow-sm">
                  <Icon className="size-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {point.text}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
