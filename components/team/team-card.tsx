'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { ROLE_COLOR } from '@/lib/roles';
import { slideUp } from '@/lib/animations';
import type { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.div variants={slideUp}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
        <div className="absolute -top-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative mx-auto w-fit">
          {/* Minecraft skin head */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-1 shadow-glow-sm">
            <Image
              src={`https://mc-heads.net/avatar/${member.minecraft}/96`}
              alt={`${member.name} Minecraft Skin`}
              width={96}
              height={96}
              className="size-24 rounded-xl [image-rendering:pixelated]"
              unoptimized
            />
          </div>
          {/* Availability dot */}
          <span
            className={cn(
              'absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-card',
              member.available ? 'bg-emerald-500' : 'bg-red-500',
            )}
            title={member.available ? 'Verfügbar' : 'Nicht verfügbar'}
          >
            {member.available && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
          </span>
        </div>

        <h3 className="relative mt-4 text-lg font-semibold text-white">
          {member.name}
        </h3>
        <span
          className={cn(
            'relative mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium',
            ROLE_COLOR[member.role],
          )}
        >
          {member.role}
        </span>
        <p className="relative mt-3 text-xs text-text-secondary">
          Mitglied seit {formatDate(member.memberSince)}
        </p>
      </div>
    </motion.div>
  );
}
