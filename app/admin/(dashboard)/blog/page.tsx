import { BlogEditor } from '@/components/admin/blog-editor';

export const dynamic = 'force-dynamic';

export default function AdminBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Blog</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Schreibe und verwalte deine Blog-Artikel (Markdown).
      </p>
      <BlogEditor />
    </div>
  );
}
