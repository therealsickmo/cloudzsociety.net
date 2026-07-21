'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookText, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JoinServer } from '@/components/home/join-server';
import { HeroBackground } from '@/components/home/hero-background';
import { DiscordIcon } from '@/components/icons/discord-icon';
import { MinecraftBlock } from '@/components/icons/minecraft-block';
import {
  useContent,
  useSettings,
} from '@/components/providers/settings-provider';
import { getIcon } from '@/lib/icons';
import { staggerContainer, slideUp } from '@/lib/animations';

const LOGO_SIZE: Record<string, string> = {
  klein: 'h-40 sm:h-52 md:h-64',
  mittel: 'h-52 sm:h-64 md:h-80',
  gross: 'h-64 sm:h-80 md:h-[26rem]',
  riesig: 'h-72 sm:h-96 md:h-[32rem]',
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
                {hero.title}
              </span>
            )}
          </motion.div>

          {/* Gradient title */}
          <motion.h1
            variants={slideUp}
            className="text-gradient-brand mt-2 text-4xl font-extrabold tracking-tight drop-shadow-[0_0_30px_rgba(0,102,255,0.35)] sm:text-5xl md:text-6xl"
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle in Minecraft-style pixel font */}
          <motion.p
            variants={slideUp}
            className="mt-5 max-w-2xl text-balance font-pixel text-lg font-semibold text-text-secondary md:text-xl"
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
                className="neon-hover h-16 w-full sm:w-auto sm:min-w-[200px]"
              >
                <MinecraftBlock className="!size-8" />
                <span className="flex flex-col items-start leading-none">
                  <span className="font-pixel text-base font-bold uppercase tracking-wide text-white">
                    Minecraft
                  </span>
                  <span className="text-gradient-brand font-pixel text-lg font-bold leading-tight">
                    Horizons
                  </span>
                </span>
              </Button>
            </JoinServer>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="neon-hover w-full sm:w-auto"
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
              className="neon-hover w-full sm:w-auto"
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
              className="neon-hover w-full sm:w-auto"
            >
              <Link href="/blog">
                <BookText />
                REGELN
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Flat liquid-glass info bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="neon-hover overflow-hidden rounded-2xl border border-white/12 bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl backdrop-saturate-150">
            <div className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {hero.stats.map((stat, i) => {
                const Icon = getIcon(stat.icon ?? 'Sparkles');
                return (
                  <div
                    key={`${stat.label}-${i}`}
                    className="flex items-center justify-center gap-3 px-5 py-5"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-brand">
                      <Icon className="size-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold leading-tight text-white md:text-base">
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
