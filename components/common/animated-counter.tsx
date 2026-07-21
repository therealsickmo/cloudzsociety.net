'use client';

import { useCountUp } from '@/hooks/use-count-up';
import { formatNumber } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/** Counts up to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  suffix,
  prefix,
  className,
}: AnimatedCounterProps) {
  const { ref, value: current } = useCountUp(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(current)}
      {suffix}
    </span>
  );
}
