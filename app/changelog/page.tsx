import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { ChangelogTimeline } from '@/components/changelog/changelog-timeline';
import { getChangelog } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Alle Updates, Verbesserungen und Bugfixes von CLOUDZ™ in einer übersichtlichen Timeline.',
};

export default function ChangelogPage() {
  const changelog = getChangelog();
  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="Was ist neu?"
        description="Verfolge die Entwicklung des Netzwerks — jede Version, jedes Feature und jeder Fix an einem Ort."
      />
      <Section>
        <ChangelogTimeline entries={changelog} />
      </Section>
    </>
  );
}
