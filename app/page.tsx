import { Hero } from '@/components/home/hero';
import { Showcase } from '@/components/home/showcase';
import { About } from '@/components/home/about';
import { Features } from '@/components/home/features';
import { Stats } from '@/components/home/stats';
import { CTA } from '@/components/home/cta';
import { getSettings } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { sections } = getSettings().layout;
  return (
    <>
      <Hero />
      {sections.about && <About />}
      {sections.features && <Features />}
      <Showcase />
      {sections.stats && <Stats />}
      {sections.cta && <CTA />}
    </>
  );
}
