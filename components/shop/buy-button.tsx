'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, ShoppingCart } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { shopService } from '@/services/shop';

interface BuyButtonProps extends Omit<ButtonProps, 'onClick'> {
  slug: string;
  disabled?: boolean;
}

/**
 * Frontend-only buy action. Calls the (stubbed) shop service and shows a
 * transient confirmation. Real checkout is wired later.
 */
export function BuyButton({ slug, disabled, ...props }: BuyButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [message, setMessage] = useState('');

  async function handleBuy() {
    setState('loading');
    const result = await shopService.checkout(slug);
    setMessage(result.message);
    setState('done');
    window.setTimeout(() => setState('idle'), 2600);
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleBuy}
        disabled={disabled || state === 'loading'}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === 'loading' ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="size-4 animate-spin" />
              Lädt…
            </motion.span>
          ) : state === 'done' ? (
            <motion.span
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="size-4" />
              Bald verfügbar
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="size-4" />
              Kaufen
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      <AnimatePresence>
        {state === 'done' && message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-xs text-text-secondary"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
