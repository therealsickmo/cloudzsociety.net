'use client';

import { motion } from 'framer-motion';
import { TeamCard } from '@/components/team/team-card';
import { staggerContainer } from '@/lib/animations';
import { byRole } from '@/lib/roles';
import type { TeamMember } from '@/types';

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const sorted = [...members].sort(byRole);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {sorted.map((member) => (
        <TeamCard key={`${member.name}-${member.role}`} member={member} />
      ))}
    </motion.div>
  );
}
