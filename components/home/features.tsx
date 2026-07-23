import { ShowcaseSection } from '@/components/home/showcase';
import { getContent } from '@/lib/content-store';

export function Features() {
  return <ShowcaseSection content={getContent().features} />;
}
