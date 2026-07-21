import {
  Crown,
  KeyRound,
  Coins,
  Package,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShopCategory } from '@/types';

const CATEGORY_VISUALS: Record<
  ShopCategory,
  { icon: LucideIcon; from: string; to: string }
> = {
  ranks: { icon: Crown, from: 'from-brand', to: 'to-brand-700' },
  keys: { icon: KeyRound, from: 'from-amber-500', to: 'to-amber-700' },
  coins: { icon: Coins, from: 'from-yellow-400', to: 'to-amber-600' },
  bundles: { icon: Package, from: 'from-violet-500', to: 'to-brand-600' },
  cosmetics: { icon: Sparkles, from: 'from-fuchsia-500', to: 'to-brand-500' },
};

interface ProductVisualProps {
  category: ShopCategory;
  className?: string;
}

/**
 * Generated product artwork keyed by category. Kept as code so the shop
 * renders without external image assets; swap for real `product.image`
 * files once available.
 */
export function ProductVisual({ category, className }: ProductVisualProps) {
  const { icon: Icon, from, to } = CATEGORY_VISUALS[category];
  return (
    <div
      className={cn(
        'relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br',
        from,
        to,
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-20" />
      <div className="absolute -right-8 -top-8 size-28 rounded-full bg-white/20 blur-2xl" />
      <Icon className="relative size-16 text-white drop-shadow-lg" strokeWidth={1.5} />
    </div>
  );
}
