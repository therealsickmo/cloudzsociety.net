import { BookOpen, Gamepad2, Newspaper, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORY_VISUAL: Record<
  string,
  { icon: LucideIcon; from: string; to: string }
> = {
  News: { icon: Newspaper, from: 'from-brand', to: 'to-brand-700' },
  Gameplay: { icon: Gamepad2, from: 'from-violet-500', to: 'to-brand-600' },
  Community: { icon: Users, from: 'from-emerald-500', to: 'to-brand-600' },
  Guide: { icon: BookOpen, from: 'from-amber-500', to: 'to-brand-600' },
};

interface BlogVisualProps {
  category: string;
  className?: string;
}

/** Generated cover art keyed by blog category. */
export function BlogVisual({ category, className }: BlogVisualProps) {
  const visual = CATEGORY_VISUAL[category] ?? CATEGORY_VISUAL.News;
  const Icon = visual.icon;
  return (
    <div
      className={cn(
        'relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br',
        visual.from,
        visual.to,
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] opacity-20" />
      <div className="absolute -left-8 -top-8 size-32 rounded-full bg-white/20 blur-2xl" />
      <Icon className="relative size-14 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
    </div>
  );
}
