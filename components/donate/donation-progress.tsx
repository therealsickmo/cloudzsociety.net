'use client';

import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface DonationProgressProps {
  current: number;
  goal: number;
}

/** Animated fundraising progress bar (mock data). */
export function DonationProgress({ current, goal }: DonationProgressProps) {
  const percent = Math.min(100, Math.round((current / goal) * 100));

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-white">
            {formatNumber(current)} €
          </span>
          <span className="ml-2 text-sm text-text-secondary">
            von {formatNumber(goal)} €
          </span>
        </div>
        <span className="text-lg font-semibold text-brand">{percent}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full rounded-full bg-brand-gradient shadow-glow-sm"
        >
          <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
      <p className="mt-3 text-xs text-text-secondary">
        Beispieldaten — die Spendenfunktion wird bald aktiviert.
      </p>
    </div>
  );
}
