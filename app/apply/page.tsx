import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { ApplySection } from '@/components/apply/apply-section';
import { getRoles } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bewerben',
  description:
    'Werde Teil des CLOUDZ™ Teams. Bewirb dich als Moderator, Supporter, Developer, Builder oder Designer.',
};

export default function ApplyPage() {
  const applicationRoles = getRoles();
  const openRoles = applicationRoles.filter((r) => r.status === 'open').length;

  return (
    <>
      <PageHeader
        eyebrow="Bewerben"
        title="Werde Teil des Teams"
        description={`Wir suchen motivierte Leute, die das Netzwerk mitgestalten wollen. Aktuell sind ${openRoles} Rollen offen.`}
      />
      <Section>
        <ApplySection roles={applicationRoles} />
      </Section>
    </>
  );
}
