import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Gamepad2, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Spieler-Login',
  description:
    'Der Spieler-Login und das persönliche Dashboard für CLOUDZ™ befinden sich gerade im Aufbau.',
};

export default function SpielerLoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Spieler"
        title="Dein Spieler-Dashboard"
        description="Bald kannst du dich mit deinem Minecraft-Account anmelden und dein persönliches Dashboard verwalten."
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
                <Gamepad2 className="size-7" />
              </div>
              <h2 className="mt-6 text-lg font-semibold text-white">
                In Arbeit
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Wir bauen gerade den Spieler-Login und dein persönliches
                Dashboard mit Statistiken, Rängen und Belohnungen. Sobald es so
                weit ist, kannst du dich hier mit deinem Minecraft-Account
                anmelden.
              </p>
              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
              >
                <ArrowLeft className="size-4" />
                Zurück zur Login-Auswahl
              </Link>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
