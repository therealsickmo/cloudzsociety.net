import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { BlogList } from '@/components/blog/blog-list';
import { getAllPosts, getCategories } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'News, Guides und Community-Updates rund um CLOUDZ™ — bleib immer auf dem neuesten Stand.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="News & Updates"
        description="Alles Wichtige aus dem Netzwerk — von neuen Spielmodi über Guides bis zu Community-Highlights."
      />
      <Section>
        <BlogList posts={posts} categories={categories} />
      </Section>
    </>
  );
}
