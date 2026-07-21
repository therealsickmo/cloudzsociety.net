'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookText, UserPlus } from 'lucide-react';
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

export function Hero() {
  const { links } = useSettings();
  const hero = useContent().hero;
  const [logoOk, setLogoOk] = useState(true);
  return (
    <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
      <HeroBackground />
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={slideUp}>
            <Link
              href="/changelog"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/5 py-1.5 pl-2 pr-4 text-sm text-text-secondary backdrop-blur transition-colors hover:border-brand/40 hover:text-white"
            >
              <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
                Neu
              </span>
              {hero.badge}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Logo (with title text as accessible fallback) */}
          <motion.h1 variants={slideUp} className="mt-6">
            <span className="sr-only">{hero.title}</span>
            {logoOk ? (
              <motion.div
                animate={{ scale: [1, 1.06, 1], y: [0, -6, 0] }}
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
                  width={640}
                  height={640}
                  priority
                  unoptimized
                  onError={() => setLogoOk(false)}
                  className="mx-auto h-52 w-auto drop-shadow-[0_0_65px_rgba(0,102,255,0.5)] sm:h-64 md:h-80"
                />
              </motion.div>
            ) : (
              <span className="text-gradient-brand text-6xl font-extrabold tracking-tight drop-shadow-[0_0_40px_rgba(0,102,255,0.35)] sm:text-7xl md:text-8xl">
                {hero.title}
              </span>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="mt-6 max-w-xl text-balance text-lg text-text-secondary md:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
          >
            <JoinServer>
              <Button size="xl" className="w-full sm:w-auto">
                <MinecraftBlock />
                {hero.joinLabel}
              </Button>
            </JoinServer>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <a href={links.discord} target="_blank" rel="noopener noreferrer">
                <DiscordIcon />
                {hero.discordLabel}
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
                Jetzt bewerben
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              <Link href="/blog">
                <BookText />
                {hero.rulesLabel}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating brand glow card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 w-full max-w-4xl"
        >
          <div className="absolute inset-x-10 -top-6 h-40 rounded-full bg-brand/30 blur-[100px]" />
          <div className="glass relative overflow-hidden rounded-3xl p-1.5 shadow-glow-lg transition-shadow duration-500 hover:shadow-glow-lg">
            <div className="rounded-[1.35rem] bg-gradient-to-b from-surface/80 to-background/80 backdrop-blur-xl">
              <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {hero.stats.map((stat, i) => {
                  const Icon = getIcon(stat.icon ?? 'Sparkles');
                  return (
                    <div
                      key={`${stat.label}-${i}`}
                      className="group flex flex-col items-center gap-2.5 px-6 py-8 text-center transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-6" />
                      </div>
                      <div className="text-lg font-bold text-white md:text-xl">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-text-secondary">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
