import { Section, SectionHeading } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Card } from '@/components/ui/card';
import { getContent } from '@/lib/content-store';
import { getIcon } from '@/lib/icons';

export function About() {
  const { eyebrow, title, description, points } = getContent().about;

  return (
    <Section id="about">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point, i) => {
          const Icon = getIcon(point.icon);
          return (
            <Reveal key={`${point.title}-${i}`} delay={i * 0.08}>
              <Card className="h-full p-6 transition-colors duration-300 hover:border-brand/40">
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand shadow-glow-sm">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
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
