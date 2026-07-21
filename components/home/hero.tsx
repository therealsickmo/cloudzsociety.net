'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookText, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JoinServer } from '@/components/home/join-server';
import { HeroBackground } from '@/components/home/hero-background';
import { HorizonsLabel } from '@/components/home/horizons-label';
import { DiscordIcon } from '@/components/icons/discord-icon';
import {
  useContent,
  useSettings,
} from '@/components/providers/settings-provider';
import { getIcon } from '@/lib/icons';
import { staggerContainer, slideUp } from '@/lib/animations';

const LOGO_SIZE: Record<string, string> = {
  klein: 'h-48 sm:h-60 md:h-72',
  mittel: 'h-56 sm:h-72 md:h-[24rem]',
  gross: 'h-72 sm:h-96 md:h-[30rem]',
  riesig: 'h-80 sm:h-[28rem] md:h-[38rem]',
};

export function Hero() {
  const { links, layout } = useSettings();
  const hero = useContent().hero;
  const [logoOk, setLogoOk] = useState(true);
  const logoSize = LOGO_SIZE[layout.heroLogoSize] ?? LOGO_SIZE.gross;

  return (
    <section className="relative overflow-hidden pb-20 pt-14 md:pt-20">
      <HeroBackground />
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <motion.div variants={slideUp}>
            {logoOk ? (
              <motion.div
                animate={{ scale: [1, 1.06, 1], y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto w-fit"
              >
                <Image
                  src="/logo/cloudz-logo.png"
                  alt={hero.title}
                  width={720}
                  height={720}
                  priority
                  unoptimized
                  onError={() => setLogoOk(false)}
                  className={`mx-auto w-auto drop-shadow-[0_0_70px_rgba(0,102,255,0.55)] ${logoSize}`}
                />
              </motion.div>
            ) : (
              <span className="text-gradient-brand text-7xl font-extrabold tracking-tight drop-shadow-[0_0_40px_rgba(0,102,255,0.35)] md:text-8xl">
                {hero.title || 'CLOUDZ™'}
              </span>
            )}
          </motion.div>
          <span className="sr-only">{hero.title}</span>

          {/* Subtitle — normal font, bold */}
          <motion.p
            variants={slideUp}
            className="mt-6 max-w-2xl text-balance text-lg font-bold text-text-secondary md:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
          >
            <JoinServer>
              <Button
                size="xl"
                variant="secondary"
                className="w-full sm:w-auto sm:min-w-[190px]"
              >
                <HorizonsLabel />
              </Button>
            </JoinServer>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <a href={links.discord} target="_blank" rel="noopener noreferrer">
                <DiscordIcon className="text-[#5865F2]" />
                DISCORD
              </a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link href="/apply">
                <UserPlus />
                BEWERBEN
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Link href="/blog">
                <BookText />
                REGELN
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Liquid-glass info bar (transparent, same style as buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl backdrop-saturate-150">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {hero.stats.map((stat, i) => {
                const Icon = getIcon(stat.icon ?? 'Sparkles');
                return (
                  <div
                    key={`${stat.label}-${i}`}
                    className="group flex items-center justify-center gap-3 px-4 py-8"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand transition-transform duration-300 group-hover:scale-125">
                      <Icon className="size-5" />
                    </div>
                    <div className="text-left transition-transform duration-300 group-hover:scale-110">
                      <div className="whitespace-nowrap text-sm font-bold leading-tight text-white md:text-base">
                        {stat.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-widest text-text-secondary">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
