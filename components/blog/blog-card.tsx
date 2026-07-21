'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogVisual } from '@/components/blog/blog-visual';
import { formatDate } from '@/lib/utils';
import { slideUp } from '@/lib/animations';
import type { BlogPostMeta } from '@/types';

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article variants={slideUp} layout>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
      >
        <div className="relative overflow-hidden">
          <BlogVisual
            category={post.category}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute left-4 top-4">{post.category}</Badge>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-secondary">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-3">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.readingTime} Min
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
