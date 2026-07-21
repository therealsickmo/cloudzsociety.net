import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names, resolving conflicts sensibly. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with locale-aware thousands separators. */
export function formatNumber(value: number, locale = 'de-DE') {
  return new Intl.NumberFormat(locale).format(value);
}

/** Format an ISO date string to a readable German date. */
export function formatDate(iso: string, locale = 'de-DE') {
  return new Date(iso).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/** Format a duration in seconds as a human-readable uptime string. */
export function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  return `${days}d ${hours}h`;
}
