import Link from 'next/link';
import { Github, Heart, MessageCircle } from 'lucide-react';
import { FOOTER_LINKS, LINKS, SITE } from '@/lib/constants';
import { Logo } from '@/components/common/logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface/40">
      <div className="container py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-text-secondary">
              {SITE.name} — made with{' '}
              <Heart className="inline size-4 fill-brand text-brand" /> für die
              Community.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-text-secondary transition-colors hover:border-brand/40 hover:text-white"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-text-secondary transition-colors hover:border-brand/40 hover:text-white"
              >
                <Github className="size-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Rechtliches</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Community</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Netzwerk</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/shop"
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apply"
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    Bewerben
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-text-secondary sm:flex-row">
          <p>
            © {year} {SITE.brand}. Alle Rechte vorbehalten.
          </p>
          <p>
            {SITE.domain} — nicht mit Mojang oder Microsoft verbunden.
          </p>
        </div>
      </div>
    </footer>
  );
}
