'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookText, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroBackground } from '@/components/home/hero-background';
import {
  useContent,
  useSettings,
} from '@/components/providers/settings-provider';
import { staggerContainer, slideUp } from '@/lib/animations';

const LOGO_SIZE: Record<string, string> = {
  klein: 'h-36 sm:h-44 md:h-56',
  mittel: 'h-44 sm:h-56 md:h-72',
  gross: 'h-56 sm:h-72 md:h-[22rem]',
  riesig: 'h-64 sm:h-80 md:h-[27rem]',
};

export function Hero() {
  const { layout } = useSettings();
  const hero = useContent().hero;
  const [logoOk, setLogoOk] = useState(true);
  const logoSize = LOGO_SIZE[layout.heroLogoSize] ?? LOGO_SIZE.gross;

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
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
            className="mt-5 max-w-2xl text-balance text-base font-bold text-text-secondary md:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs — bigger buttons with a lift-on-hover effect */}
          <motion.div
            variants={slideUp}
            className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="h-[4.5rem] w-full px-12 text-xl transition-transform duration-200 hover:scale-105 [&_svg]:size-7 sm:w-auto sm:min-w-[230px]"
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
              className="h-[4.5rem] w-full px-12 text-xl transition-transform duration-200 hover:scale-105 [&_svg]:size-7 sm:w-auto sm:min-w-[230px]"
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
