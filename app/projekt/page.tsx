import type { Metadata } from 'next';
import Link from 'next/link';
import { Hammer, Rocket, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Aktuelles Projekt',
  description:
    'Das aktuelle CLOUDZ™ Projekt — temporäre Spielwelten, Events und mehr. Bald verfügbar.',
};

export default function ProjektPage() {
  return (
    <>
      <PageHeader
        eyebrow="Akt. Projekt"
        title="Unser aktuelles Projekt"
        description="CLOUDZ™ lebt von temporären Projekten — einzigartige Spielwelten auf Zeit. Das nächste Kapitel wird gerade gebaut."
      >
        <Badge className="mx-auto">
          <Sparkles className="size-3.5" />
          Demnächst verfügbar
        </Badge>
      </PageHeader>

      <Section>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Card className="p-8 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 text-brand">
                <Hammer className="size-7" />
              </div>
              <h2 className="mt-6 text-lg font-semibold text-white">
                In Arbeit
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Wir feilen gerade an einem neuen temporären Projekt. Sobald es
                losgeht, findest du hier alle Infos zum Konzept, zum Start und
                zu den Belohnungen.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-text-secondary">
              <Rocket className="size-4 text-brand" />
              Bleib auf dem Laufenden im{' '}
              <Link
                href="/blog"
                className="text-brand underline underline-offset-4 hover:text-brand-300"
              >
                Blog
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
