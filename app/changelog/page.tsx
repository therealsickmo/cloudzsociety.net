import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { ChangelogTimeline } from '@/components/changelog/changelog-timeline';
import { getChangelog, getContent } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Alle Updates, Verbesserungen und Bugfixes von CLOUDZ™ in einer übersichtlichen Timeline.',
};

export default function ChangelogPage() {
  const changelog = getChangelog();
  const header = getContent().pages.changelog;
  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />
      <Section>
        <ChangelogTimeline entries={changelog} />
      </Section>
    </>
  );
}
