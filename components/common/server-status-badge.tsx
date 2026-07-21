'use client';

import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils';
import { useServerStatus } from '@/hooks/use-server-status';

interface ServerStatusBadgeProps {
  className?: string;
}

/** Compact live server-status pill for the navbar. */
export function ServerStatusBadge({ className }: ServerStatusBadgeProps) {
  const { status, loading } = useServerStatus();
  const online = status?.online ?? false;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium text-text-secondary backdrop-blur',
        className,
      )}
    >
      <span className="relative flex size-2.5">
        {online && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={cn(
            'relative inline-flex size-2.5 rounded-full',
            loading
              ? 'bg-text-secondary'
              : online
                ? 'bg-emerald-400'
                : 'bg-red-500',
          )}
        />
      </span>
      {loading ? (
        <span>Status…</span>
      ) : online ? (
        <span>
          <span className="text-white">
            {formatNumber(status?.playersOnline ?? 0)}
          </span>{' '}
          online
        </span>
      ) : (
        <span>Offline</span>
      )}
    </div>
  );
}
