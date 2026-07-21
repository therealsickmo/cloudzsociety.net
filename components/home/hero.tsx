'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookText, MessageCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JoinServer } from '@/components/home/join-server';
import { LINKS, SITE } from '@/lib/constants';
import { staggerContainer, slideUp } from '@/lib/animations';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28">
      <div className="container flex flex-col items-center text-center">
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
              Spielmodus „Skyfall“ ist live
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            className="mt-8 text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl"
          >
            <span className="text-gradient-brand drop-shadow-[0_0_40px_rgba(0,102,255,0.35)]">
              {SITE.name}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="mt-6 max-w-xl text-balance text-lg text-text-secondary md:text-xl"
          >
            {SITE.tagline} Eigene Spielmodi, eine aktive Community und
            regelmäßige Updates — willkommen im Netzwerk.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <JoinServer>
              <Button size="lg" className="w-full sm:w-auto">
                <Play className="size-4 fill-current" />
                Server beitreten
              </Button>
            </JoinServer>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <a href={LINKS.discord} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Discord
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              <Link href="/blog">
                <BookText className="size-4" />
                Regeln lesen
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
          <div className="glass relative overflow-hidden rounded-3xl p-1.5 shadow-glow-lg">
            <div className="rounded-[1.35rem] bg-gradient-to-b from-surface to-background">
              <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
                {[
                  { label: 'Spielmodi', value: '8+' },
                  { label: 'Community', value: '14K+' },
                  { label: 'Uptime', value: '99.9%' },
                  { label: 'Support', value: '24/7' },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-8 text-center">
                    <div className="text-2xl font-bold text-white md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
