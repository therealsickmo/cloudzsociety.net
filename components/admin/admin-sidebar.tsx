'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ExternalLink,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Settings,
  ShoppingBag,
  UserPlus,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/common/logo';

const NAV = [
  { href: '/admin', label: 'Übersicht', icon: LayoutDashboard, exact: true },
  { href: '/admin/settings', label: 'Einstellungen', icon: Settings },
  { href: '/admin/products', label: 'Shop-Produkte', icon: ShoppingBag },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/changelog', label: 'Changelog', icon: GitBranch },
  { href: '/admin/roles', label: 'Bewerber-Rollen', icon: UserPlus },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface/60">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <Logo showText={false} />
        <span className="text-sm font-semibold text-white">Admin Panel</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-brand/15 text-white'
                  : 'text-text-secondary hover:bg-white/5 hover:text-white',
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-[18px]" />
          Website ansehen
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="size-[18px]" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
