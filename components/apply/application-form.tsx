'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { applicationService } from '@/services/application';
import type { ApplicationPayload } from '@/types';

interface ApplicationFormProps {
  role: string;
  onDone?: () => void;
}

const EMPTY: Omit<ApplicationPayload, 'role'> = {
  minecraftName: '',
  discordName: '',
  age: '',
  experience: '',
  motivation: '',
};

export function ApplicationForm({ role, onDone }: ApplicationFormProps) {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');

  function update<K extends keyof typeof EMPTY>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('loading');
    const result = await applicationService.submit({ role, ...values });
    setMessage(result.message);
    setStatus(result.ok ? 'success' : 'error');
    if (result.ok) {
      window.setTimeout(() => onDone?.(), 2200);
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-8 text-center"
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="text-lg font-semibold text-white">Bewerbung gesendet!</h3>
        <p className="max-w-sm text-sm text-text-secondary">{message}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="minecraftName">Minecraft Name</Label>
          <Input
            id="minecraftName"
            required
            value={values.minecraftName}
            onChange={(e) => update('minecraftName', e.target.value)}
            placeholder="z. B. Steve"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discordName">Discord Name</Label>
          <Input
            id="discordName"
            required
            value={values.discordName}
            onChange={(e) => update('discordName', e.target.value)}
            placeholder="z. B. steve#0001"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="age">Alter</Label>
        <Input
          id="age"
          type="number"
          min={10}
          max={99}
          required
          value={values.age}
          onChange={(e) => update('age', e.target.value)}
          placeholder="z. B. 16"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="experience">Erfahrung</Label>
        <Textarea
          id="experience"
          required
          value={values.experience}
          onChange={(e) => update('experience', e.target.value)}
          placeholder="Welche relevante Erfahrung bringst du mit?"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="motivation">Motivation</Label>
        <Textarea
          id="motivation"
          required
          value={values.motivation}
          onChange={(e) => update('motivation', e.target.value)}
          placeholder="Warum möchtest du Teil des Teams werden?"
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        className="w-full"
        disabled={status === 'loading'}
        size="lg"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            <Send className="size-4" />
            Bewerbung absenden
          </>
        )}
      </Button>
    </form>
  );
}
