import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';
import { BlogVisual } from '@/components/blog/blog-visual';
import { formatDate } from '@/lib/utils';
import { getAllPosts, getPost, getPostSlugs } from '@/lib/blog';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Artikel nicht gefunden' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} description={post.excerpt} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Zurück zum Blog
            </Link>
            <div className="flex items-center gap-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" />
                {post.author}
              </span>
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readingTime} Min
              </span>
            </div>
          </div>

          <Reveal>
            <BlogVisual category={post.category} className="rounded-2xl" />
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="prose-cloudz mt-10"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
            <h2 className="mb-6 text-lg font-semibold text-white">
              Weitere Artikel
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
                >
                  <BlogVisual
                    category={rel.category}
                    className="aspect-square w-16 shrink-0 rounded-lg"
                  />
                  <div>
                    <Badge variant="outline" className="mb-1.5">
                      {rel.category}
                    </Badge>
                    <p className="text-sm font-medium text-white group-hover:text-brand">
                      {rel.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
