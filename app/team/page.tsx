import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { TeamGrid } from '@/components/team/team-grid';
import { getContent, getTeam } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Lerne das Team hinter CLOUDZ™ kennen — von Founder über Administration bis zu Support, Development und Design.',
};

export default function TeamPage() {
  const team = getTeam();
  const header = getContent().pages.team;

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />
      <Section>
        <TeamGrid members={team} />
      </Section>
    </>
  );
}
