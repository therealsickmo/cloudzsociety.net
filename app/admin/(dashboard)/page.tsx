import Link from 'next/link';
import {
  ArrowRight,
  GitBranch,
  Newspaper,
  Settings,
  ShoppingBag,
  Type,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  getChangelog,
  getProducts,
  getRoles,
  getTeam,
} from '@/lib/content-store';
import { getAllDrafts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default function AdminOverviewPage() {
  const cards = [
    {
      href: '/admin/content',
      icon: Type,
      title: 'Inhalte & Texte',
      desc: 'Alle Texte, Buttons, Navigation & Footer',
      count: null as number | null,
    },
    {
      href: '/admin/settings',
      icon: Settings,
      title: 'Einstellungen & Design',
      desc: 'Name, IP, Links, Farben & Serverstatistik',
      count: null as number | null,
    },
    {
      href: '/admin/products',
      icon: ShoppingBag,
      title: 'Shop-Produkte',
      desc: 'Ränge, Keys, Coins, Bundles, Cosmetics',
      count: getProducts().length,
    },
    {
      href: '/admin/team',
      icon: Users,
      title: 'Team',
      desc: 'Mitglieder, Rollen & Verfügbarkeit',
      count: getTeam().length,
    },
    {
      href: '/admin/blog',
      icon: Newspaper,
      title: 'Blog',
      desc: 'Artikel schreiben & verwalten',
      count: getAllDrafts().length,
    },
    {
      href: '/admin/changelog',
      icon: GitBranch,
      title: 'Changelog',
      desc: 'Versionen, Features, Bugfixes',
      count: getChangelog().length,
    },
    {
      href: '/admin/roles',
      icon: UserPlus,
      title: 'Bewerber-Rollen',
      desc: 'Offene & geschlossene Rollen',
      count: getRoles().length,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Willkommen zurück 👋</h1>
      <p className="mt-2 text-text-secondary">
        Verwalte hier alle Inhalte deiner Website. Änderungen werden sofort
        übernommen.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <card.icon className="size-5" />
              </div>
              {card.count !== null && (
                <span className="text-2xl font-bold text-white">
                  {card.count}
                </span>
              )}
            </div>
            <h2 className="mt-4 flex items-center gap-1.5 font-semibold text-white">
              {card.title}
              <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </h2>
            <p className="mt-1 text-sm text-text-secondary">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
