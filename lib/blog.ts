import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { BlogPost, BlogPostMeta } from '@/types';

// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Markdown-based blog
// Reads .md files from content/blog at build/request time (server only).
// ────────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** Rough reading-time estimate at ~200 words per minute. */
function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(slug: string) {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return matter(raw);
}

function toMeta(slug: string): BlogPostMeta {
  const { data, content } = readPostFile(slug);
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ''),
    author: String(data.author ?? 'CLOUDZ™ Team'),
    category: String(data.category ?? 'News'),
    date: String(data.date ?? new Date().toISOString()),
    image: String(data.image ?? '/images/blog/default.svg'),
    readingTime: estimateReadingTime(content),
  };
}

/** All blog post slugs (filenames without extension). */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

/** All posts sorted newest first. */
export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Unique category list for filters. */
export function getCategories(): string[] {
  const set = new Set(getAllPosts().map((post) => post.category));
  return Array.from(set).sort();
}

/** A single post with rendered HTML content, or null if not found. */
export function getPost(slug: string): BlogPost | null {
  try {
    const { content } = readPostFile(slug);
    const meta = toMeta(slug);
    const contentHtml = marked.parse(content, { async: false }) as string;
    return { ...meta, contentHtml };
  } catch {
    return null;
  }
}
