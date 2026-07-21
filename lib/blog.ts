import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { BlogPost, BlogPostMeta } from '@/types';

/** Editable representation of a blog post (frontmatter + raw body). */
export interface BlogDraft {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  image: string;
  body: string;
}

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

// ── Admin: editable drafts (server only) ───────────────────────────

/** Normalise a title/slug string into a filesystem-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** All posts as editable drafts, newest first. */
export function getAllDrafts(): BlogDraft[] {
  return getPostSlugs()
    .map((slug) => getDraft(slug))
    .filter((d): d is BlogDraft => d !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post as an editable draft. */
export function getDraft(slug: string): BlogDraft | null {
  try {
    const { data, content } = readPostFile(slug);
    return {
      slug,
      title: String(data.title ?? ''),
      excerpt: String(data.excerpt ?? ''),
      author: String(data.author ?? ''),
      category: String(data.category ?? 'News'),
      date: String(data.date ?? new Date().toISOString().slice(0, 10)),
      image: String(data.image ?? ''),
      body: content.trim(),
    };
  } catch {
    return null;
  }
}

/** Create or update a post. Returns the (possibly new) slug. */
export function saveDraft(draft: BlogDraft, originalSlug?: string): string {
  const slug = draft.slug ? slugify(draft.slug) : slugify(draft.title);
  const frontmatter = {
    title: draft.title,
    excerpt: draft.excerpt,
    author: draft.author,
    category: draft.category,
    date: draft.date,
    image: draft.image || '/images/blog/default.svg',
  };
  const file = matter.stringify(`\n${draft.body.trim()}\n`, frontmatter);
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  // If the slug changed, remove the old file.
  if (originalSlug && originalSlug !== slug) {
    deleteDraft(originalSlug);
  }
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), file, 'utf8');
  return slug;
}

/** Delete a post by slug. */
export function deleteDraft(slug: string): void {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(file)) fs.unlinkSync(file);
}
