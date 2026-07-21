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
import { staggerContainer, slideUp } from '@/lib/animations';

const LOGO_SIZE: Record<string, string> = {
  klein: 'h-56 sm:h-72 md:h-[24rem]',
  mittel: 'h-72 sm:h-96 md:h-[30rem]',
  gross: 'h-80 sm:h-[28rem] md:h-[38rem]',
  riesig: 'h-96 sm:h-[32rem] md:h-[44rem]',
};

export function Hero() {
  const { links, layout } = useSettings();
  const hero = useContent().hero;
  const [logoOk, setLogoOk] = useState(true);
  const logoSize = LOGO_SIZE[layout.heroLogoSize] ?? LOGO_SIZE.gross;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
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
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mx-auto w-fit"
              >
                <Image
                  src="/logo/cloudz-logo.png"
                  alt={hero.title}
                  width={880}
                  height={880}
                  priority
                  unoptimized
                  onError={() => setLogoOk(false)}
                  className={`mx-auto w-auto drop-shadow-[0_0_80px_rgba(0,102,255,0.6)] ${logoSize}`}
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

          {/* CTAs — directly under the text */}
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
      </div>
    </section>
  );
}
