import { cn } from '@/lib/utils';
import type { Currency } from '@/types';

const CURRENCY_LABEL: Record<Currency, string> = {
  eur: '€',
  goon: 'Goon',
  premium: 'Premium',
};

interface PriceProps {
  value: number;
  currency: Currency;
  className?: string;
}

/** Formats a price with its currency symbol/label. */
export function Price({ value, currency, className }: PriceProps) {
  if (currency === 'eur') {
    return (
      <span className={cn('font-semibold text-white', className)}>
        {value.toFixed(2)} {CURRENCY_LABEL.eur}
      </span>
    );
  }
  return (
    <span className={cn('font-semibold text-white', className)}>
      {value.toLocaleString('de-DE')}{' '}
      <span className="text-text-secondary">{CURRENCY_LABEL[currency]}</span>
    </span>
  );
}
