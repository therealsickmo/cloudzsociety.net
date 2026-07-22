'use client';

import { cn } from '@/lib/utils';
import { DiscordIcon } from '@/components/icons/discord-icon';

interface DiscordJoinButtonProps {
  href: string;
  className?: string;
}

/**
 * Outline-style Discord button that scales up on hover and reveals
 * "BEITRETEN!" — the "DISCORD" label slides up and out while the
 * call-to-action rises into view from below.
 */
export function DiscordJoinButton({ href, className }: DiscordJoinButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative inline-flex h-9 min-w-[190px] items-center justify-center overflow-hidden whitespace-nowrap rounded-[var(--btn-radius,0.9rem)] border border-white/15 bg-white/[0.08] px-4 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl backdrop-saturate-150 transition-[transform,background-color,border-color] duration-200 hover:scale-105 hover:border-white/25 hover:bg-white/[0.14]',
        className,
      )}
    >
      <span className="flex items-center gap-2 transition-all duration-300 ease-out group-hover:-translate-y-7 group-hover:opacity-0">
        <DiscordIcon className="size-4 text-[#5865F2]" />
        DISCORD
      </span>
      <span className="absolute inset-0 flex translate-y-7 items-center justify-center gap-2 text-[#5865F2] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        CLOUDZ™ BEITRETEN
      </span>
    </a>
  );
}
