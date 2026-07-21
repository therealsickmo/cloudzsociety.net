'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BlogCard } from '@/components/blog/blog-card';
import { cn } from '@/lib/utils';
import { staggerContainer } from '@/lib/animations';
import type { BlogPostMeta } from '@/types';

interface BlogListProps {
  posts: BlogPostMeta[];
  categories: string[];
}

export function BlogList({ posts, categories }: BlogListProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Alle');

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === 'Alle' || post.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  const allCategories = ['Alle', ...categories];

  return (
    <div>
      {/* Controls */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artikel suchen…"
            className="pl-11"
            aria-label="Blog durchsuchen"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                category === cat
                  ? 'border-transparent bg-brand text-white shadow-glow-sm'
                  : 'border-border bg-surface/60 text-text-secondary hover:text-white',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card py-20 text-center text-text-secondary">
          Keine Artikel gefunden.
        </div>
      ) : (
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
