'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Server } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useSettings } from '@/components/providers/settings-provider';
import { cn } from '@/lib/utils';

interface JoinServerProps {
  children: ReactNode;
}

/**
 * "Server beitreten" flow — a modal that blurs the page, reveals the
 * brand logo, shows the Minecraft IP and offers copy-to-clipboard with
 * a success animation.
 */
export function JoinServer({ children }: JoinServerProps) {
  const [open, setOpen] = useState(false);
  const { copied, copy } = useCopyToClipboard();
  const { connectAddress: address } = useSettings();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="mx-auto mb-2 flex size-20 items-center justify-center rounded-2xl bg-brand/15 shadow-glow"
          >
            <Logo showText={false} className="scale-[1.6]" />
          </motion.div>
          <DialogTitle>Server beitreten</DialogTitle>
          <DialogDescription>
            Verbinde dich in Minecraft mit unserer Server-IP und werde Teil der
            CLOUDZ™ Community.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-1.5 pl-4">
            <Server className="size-5 shrink-0 text-brand" />
            <code className="flex-1 truncate font-mono text-base font-semibold text-white">
              {address}
            </code>
            <Button
              size="sm"
              variant={copied ? 'secondary' : 'default'}
              onClick={() => copy(address)}
              className="shrink-0"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="size-4 text-emerald-400" />
                    Kopiert
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="size-4" />
                    Kopieren
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>

          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 py-2.5 text-sm font-medium text-emerald-400',
                )}
              >
                <Check className="size-4" />
                IP kopiert — viel Spaß auf dem Server!
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-text-secondary">
            Java Edition · Version 1.21.x
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
