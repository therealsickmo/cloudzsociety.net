import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { Features } from '@/components/home/features';
import { Stats } from '@/components/home/stats';
import { CTA } from '@/components/home/cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Stats />
      <CTA />
    </>
  );
}
