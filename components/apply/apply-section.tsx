'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brush,
  Code2,
  Hammer,
  Headphones,
  Lock,
  Palette,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ApplicationForm } from '@/components/apply/application-form';
import { cn } from '@/lib/utils';
import { staggerContainer, slideUp } from '@/lib/animations';
import type { ApplicationRole, TeamRole } from '@/types';

const ROLE_ICON: Partial<Record<TeamRole, LucideIcon>> = {
  Moderator: Shield,
  'Jr. Moderator': Shield,
  Supporter: Headphones,
  'Jr. Supporter': Headphones,
  Developer: Code2,
  'Jr. Developer': Code2,
  Builder: Hammer,
  'Jr. Builder': Brush,
  Designer: Palette,
  'Jr. Designer': Palette,
};

interface ApplySectionProps {
  roles: ApplicationRole[];
}

export function ApplySection({ roles }: ApplySectionProps) {
  const [selected, setSelected] = useState<ApplicationRole | null>(null);

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {roles.map((entry) => {
          const Icon = ROLE_ICON[entry.role] ?? Shield;
          const open = entry.status === 'open';
          return (
            <motion.button
              key={entry.role}
              variants={slideUp}
              type="button"
              disabled={!open}
              onClick={() => open && setSelected(entry)}
              className={cn(
                'group flex flex-col items-start gap-3 rounded-2xl border p-6 text-left transition-all duration-300',
                open
                  ? 'border-border bg-card hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow'
                  : 'cursor-not-allowed border-border bg-card/50 opacity-70',
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div
                  className={cn(
                    'flex size-11 items-center justify-center rounded-xl transition-colors',
                    open
                      ? 'bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white'
                      : 'bg-white/5 text-text-secondary',
                  )}
                >
                  {open ? (
                    <Icon className="size-5" />
                  ) : (
                    <Lock className="size-5" />
                  )}
                </div>
                <span
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                    open
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-red-500/15 text-red-400',
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 rounded-full',
                      open ? 'bg-emerald-400' : 'bg-red-400',
                    )}
                  />
                  {open ? 'Verfügbar' : 'Geschlossen'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{entry.role}</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {entry.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader className="text-left">
            <DialogTitle>Bewerbung als {selected?.role}</DialogTitle>
            <DialogDescription>
              Fülle das Formular aus. Deine Daten werden an unser Team
              übermittelt.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="mt-2">
              <ApplicationForm
                role={selected.role}
                onDone={() => setSelected(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
