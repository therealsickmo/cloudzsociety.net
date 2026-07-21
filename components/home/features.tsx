import { Section, SectionHeading } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { getContent } from '@/lib/content-store';
import { getIcon } from '@/lib/icons';

export function Features() {
  const { eyebrow, title, description, items } = getContent().features;

  return (
    <Section id="features" className="relative">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((feature, i) => {
          const Icon = getIcon(feature.icon);
          return (
            <Reveal key={`${feature.title}-${i}`} delay={i * 0.08}>
              <div className="neon-hover group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-brand/40">
                {/* Hover glow */}
                <div className="absolute -right-16 -top-16 size-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-white shadow-glow-sm">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {feature.text}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
