import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { ApplySection } from '@/components/apply/apply-section';
import { getContent, getRoles } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bewerben',
  description:
    'Werde Teil des CLOUDZ™ Teams. Bewirb dich als Moderator, Supporter, Developer, Builder oder Designer.',
};

export default function ApplyPage() {
  const applicationRoles = getRoles();
  const header = getContent().pages.apply;

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />
      <Section>
        <ApplySection roles={applicationRoles} />
      </Section>
    </>
  );
}
