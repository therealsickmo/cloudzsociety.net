import type { Metadata } from 'next';
import { HeartHandshake, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section, SectionHeading } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { ShopGrid } from '@/components/shop/shop-grid';
import { Currencies } from '@/components/shop/currencies';
import { getProducts } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Unterstütze CLOUDZ™ und sichere dir Ränge, Keys, Coins, Bundles und Cosmetics im offiziellen Shop.',
};

export default function ShopPage() {
  const products = getProducts();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Unterstütze das Netzwerk"
        description="Mit jedem Kauf hilfst du, die Server zu betreiben, neue Features zu entwickeln und die Community am Leben zu halten."
      />

      {/* Why the shop exists */}
      <Section className="!pb-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <HeartHandshake className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Warum gibt es den Shop?</h3>
                <p className="mt-1.5 text-sm text-text-secondary">
                  Der Betrieb eines Netzwerks kostet Geld — Server, Entwicklung
                  und Support. Der Shop finanziert all das, ohne das Gameplay
                  unfair zu machen.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Fair & transparent</h3>
                <p className="mt-1.5 text-sm text-text-secondary">
                  Alle Vorteile sind kosmetisch oder komfortabel — niemand
                  kauft sich einen unfairen Vorteil. Das Netzwerk bleibt für
                  alle fair.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Product grid */}
      <Section>
        <SectionHeading
          eyebrow="Sortiment"
          title="Unser Shop"
          description="Wähle eine Kategorie und entdecke unser modernes Inventar."
        />
        <ShopGrid products={products} />
      </Section>

      {/* Currencies */}
      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Währungen"
          title="Goon Coins & Premium Coins"
          description="Zwei Währungen mit unterschiedlichen Aufgaben. So funktionieren sie."
        />
        <Currencies />
      </Section>
    </>
  );
}
