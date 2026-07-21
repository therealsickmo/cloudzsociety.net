import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { TeamGrid } from '@/components/team/team-grid';
import { team } from '@/content/team';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Lerne das Team hinter CLOUDZ™ kennen — von Founder über Administration bis zu Support, Development und Design.',
};

export default function TeamPage() {
  const available = team.filter((m) => m.available).length;

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Die Köpfe hinter CLOUDZ™"
        description={`Ein engagiertes Team sorgt Tag und Nacht für ein reibungsloses Erlebnis. Aktuell sind ${available} von ${team.length} Mitgliedern verfügbar.`}
      />
      <Section>
        <TeamGrid members={team} />
      </Section>
    </>
  );
}
