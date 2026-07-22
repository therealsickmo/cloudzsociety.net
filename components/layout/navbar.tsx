'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useContent,
  useSettings,
} from '@/components/providers/settings-provider';
import { HeaderBrand } from '@/components/layout/header-brand';
import { DiscordJoinButton } from '@/components/layout/discord-join-button';
import { DiscordIcon } from '@/components/icons/discord-icon';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const { links } = useSettings();
  const navItems = useContent().nav.items.filter((item) => item.enabled);
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <nav className="container flex h-20 items-center justify-between gap-4">
        {/* Brand (far left) */}
        <HeaderBrand />

        {/* Desktop nav — Liquid-Glass box appears on hover / active page,
            with a small brand-coloured underline accent. No animation. */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold transition-all duration-200 hover:scale-105',
                    active
                      ? 'border-white/15 bg-white/[0.08] text-white backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'border-transparent text-text-secondary hover:border-white/15 hover:bg-white/[0.08] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
                      {item.badge}
                    </span>
                  )}
                  {/* lightsaber underline — ignites from the centre outwards */}
                  <span
                    className={cn(
                      'pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-10 -translate-x-1/2 rounded-full bg-brand-300 shadow-[0_0_10px_rgb(var(--brand-400)),0_0_4px_rgb(var(--brand-200))] transition-transform duration-300 ease-out',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop actions (far right) */}
        <div className="hidden items-center gap-3 lg:flex">
          <DiscordJoinButton href={links.discord} />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-brand-400/40 bg-gradient-to-br from-white/[0.1] via-brand-500/[0.12] to-brand-400/[0.16] font-bold text-white backdrop-blur-xl backdrop-saturate-150 transition-transform duration-200 hover:scale-105 hover:border-brand-300/60"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="size-4 text-brand-200" />
              DASHBOARD
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-medium transition-colors',
                      active
                        ? 'border-brand/50 bg-brand/15 text-white'
                        : 'text-text-secondary hover:text-white',
                    )}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={links.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DiscordIcon className="size-4 text-[#5865F2]" />
                    DISCORD
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-brand-400/40 bg-gradient-to-br from-white/[0.1] via-brand-500/[0.12] to-brand-400/[0.16] font-bold text-white"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="size-4 text-brand-200" />
                    DASHBOARD
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
