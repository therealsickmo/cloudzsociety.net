'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/common/logo';

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!data.ok) {
        setError(data.message ?? 'Anmeldung fehlgeschlagen.');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Anmeldung fehlgeschlagen.');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center py-16">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Logo showText={false} className="scale-125" />
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-sm text-text-secondary">
          Melde dich an, um Inhalte zu bearbeiten.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-border bg-card p-6"
      >
        <div className="space-y-1.5">
          <Label htmlFor="password">Passwort</Label>
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
            <Input
              id="password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-11"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Anmelden…
            </>
          ) : (
            <>
              <LogIn className="size-4" /> Anmelden
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
