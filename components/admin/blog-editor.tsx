'use client';

import { useEffect, useState } from 'react';
import { FileText, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { BlogDraft } from '@/lib/blog';

type Status = 'idle' | 'loading' | 'saving' | 'error';

const CATEGORIES = ['News', 'Gameplay', 'Community', 'Guide'];

function emptyDraft(): BlogDraft {
  return {
    slug: '',
    title: '',
    excerpt: '',
    author: '',
    category: 'News',
    date: new Date().toISOString().slice(0, 10),
    image: '',
    body: '',
  };
}

export function BlogEditor() {
  const [list, setList] = useState<BlogDraft[]>([]);
  const [draft, setDraft] = useState<BlogDraft | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  async function loadList() {
    const res = await fetch('/api/admin/blog');
    const data = (await res.json()) as { data: BlogDraft[] };
    setList(data.data ?? []);
  }

  useEffect(() => {
    loadList()
      .then(() => setStatus('idle'))
      .catch(() => {
        setStatus('error');
        setMessage('Laden fehlgeschlagen.');
      });
  }, []);

  function selectDraft(d: BlogDraft) {
    setDraft({ ...d });
    setIsNew(false);
    setMessage('');
  }

  function newDraft() {
    setDraft(emptyDraft());
    setIsNew(true);
    setMessage('');
  }

  function update<K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function save() {
    if (!draft) return;
    if (!draft.title.trim()) {
      setMessage('Titel ist erforderlich.');
      return;
    }
    setStatus('saving');
    setMessage('');
    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${draft.slug}`;
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const data = (await res.json()) as {
        ok: boolean;
        slug?: string;
        message?: string;
      };
      if (!data.ok) throw new Error(data.message);
      await loadList();
      setStatus('idle');
      setMessage('Gespeichert ✓');
      setIsNew(false);
      if (data.slug) setDraft((prev) => (prev ? { ...prev, slug: data.slug! } : prev));
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Fehler beim Speichern.');
    }
  }

  async function remove() {
    if (!draft || isNew) {
      setDraft(null);
      return;
    }
    if (!confirm(`Artikel „${draft.title}" wirklich löschen?`)) return;
    setStatus('saving');
    await fetch(`/api/admin/blog/${draft.slug}`, { method: 'DELETE' });
    await loadList();
    setDraft(null);
    setStatus('idle');
    setMessage('Gelöscht.');
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 py-20 text-text-secondary">
        <Loader2 className="size-5 animate-spin" /> Lädt…
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* List */}
      <div className="flex flex-col gap-3">
        <Button onClick={newDraft} variant="secondary" className="w-full">
          <Plus className="size-4" /> Neuer Artikel
        </Button>
        <div className="flex max-h-[65vh] flex-col gap-1.5 overflow-y-auto rounded-2xl border border-border bg-surface/40 p-2">
          {list.map((d) => (
            <button
              key={d.slug}
              onClick={() => selectDraft(d)}
              className={cn(
                'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors',
                draft?.slug === d.slug && !isNew
                  ? 'border-brand/40 bg-brand/10'
                  : 'border-transparent hover:bg-white/5',
              )}
            >
              <FileText className="size-4 shrink-0 text-text-secondary" />
              <span className="truncate text-sm font-medium text-white">
                {d.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-2xl border border-border bg-card p-6">
        {!draft ? (
          <p className="py-16 text-center text-text-secondary">
            Wähle links einen Artikel oder erstelle einen neuen.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="b-title">Titel</Label>
                <Input
                  id="b-title"
                  value={draft.title}
                  onChange={(e) => update('title', e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="b-excerpt">Kurzbeschreibung</Label>
                <Input
                  id="b-excerpt"
                  value={draft.excerpt}
                  onChange={(e) => update('excerpt', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="b-author">Autor</Label>
                <Input
                  id="b-author"
                  value={draft.author}
                  onChange={(e) => update('author', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="b-category">Kategorie</Label>
                <select
                  id="b-category"
                  value={draft.category}
                  onChange={(e) => update('category', e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm text-white focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-surface">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="b-date">Datum</Label>
                <Input
                  id="b-date"
                  type="date"
                  value={draft.date}
                  onChange={(e) => update('date', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="b-slug">Slug (URL)</Label>
                <Input
                  id="b-slug"
                  value={draft.slug}
                  placeholder="wird aus Titel erzeugt"
                  onChange={(e) => update('slug', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="b-body">Inhalt (Markdown)</Label>
              <Textarea
                id="b-body"
                value={draft.body}
                onChange={(e) => update('body', e.target.value)}
                className="min-h-[320px] font-mono text-sm"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={remove}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="size-4" /> Löschen
              </Button>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'text-sm',
                    status === 'error' ? 'text-red-400' : 'text-text-secondary',
                  )}
                >
                  {message}
                </span>
                <Button onClick={save} disabled={status === 'saving'}>
                  {status === 'saving' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Speichert…
                    </>
                  ) : (
                    <>
                      <Save className="size-4" /> Speichern
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
