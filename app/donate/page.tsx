import type { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Sparkles, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DonationProgress } from '@/components/donate/donation-progress';

export const metadata: Metadata = {
  title: 'Spenden',
  description:
    'Unterstütze CLOUDZ™ mit einer Spende. Die Spendenfunktion ist bald verfügbar.',
};

const providers = [
  { name: 'PayPal', icon: Wallet },
  { name: 'Stripe', icon: CreditCard },
  { name: 'Weitere', icon: Sparkles },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Spenden"
        title="Unterstütze CLOUDZ™"
        description="Deine Unterstützung hält das Netzwerk am Leben. Die Spendenfunktion befindet sich gerade im Aufbau."
      >
        <Badge className="mx-auto">
          <Sparkles className="size-3.5" />
          Demnächst verfügbar
        </Badge>
      </PageHeader>

      <Section>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Card className="p-8">
              <h2 className="text-lg font-semibold text-white">
                Spendenziel dieses Monats
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Server, Entwicklung und Events — so setzen wir deine Spenden ein.
              </p>
              <div className="mt-8">
                <DonationProgress current={640} goal={1000} />
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-text-secondary">
                Geplante Zahlungsanbieter
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-text-secondary">
                      <provider.icon className="size-6" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {provider.name}
                    </span>
                    <Badge variant="outline">Bald</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-text-secondary">
              Bis die Spendenfunktion live geht, kannst du uns über den{' '}
              <Link
                href="/shop"
                className="text-brand underline underline-offset-4 hover:text-brand-300"
              >
                Shop
              </Link>{' '}
              unterstützen.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
