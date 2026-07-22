import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { SkinRender } from '@/components/home/skin-render';
import { getContent } from '@/lib/content-store';

export function Showcase() {
  const { sectionTitle, cardTitle, description, image, tags } =
    getContent().showcase;

  return (
    <Section>
      {/* Top heading with underline accent */}
      <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 className="max-w-3xl text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
          {sectionTitle}
        </h2>
        <span className="h-0.5 w-16 rounded-full bg-gradient-to-r from-brand-400 to-brand-300 shadow-[0_0_10px_rgb(var(--brand-500))]" />
      </Reveal>

      {/* Card with the skin render breaking out on the right */}
      <Reveal>
        <div className="relative mx-auto max-w-5xl">
          <div className="relative min-h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-brand-900/20 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:p-12">
            <div className="relative z-10 flex h-full flex-col justify-center md:max-w-[54%]">
              <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {cardTitle}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                  <span
                    key={`${tag.label}-${i}`}
                    className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-white"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            <SkinRender src={image} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
