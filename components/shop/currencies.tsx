import { Coins, Gem } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';
import { Card } from '@/components/ui/card';

const currencies = [
  {
    icon: Coins,
    name: 'Goon Coins',
    accent: 'text-amber-400',
    ring: 'bg-amber-500/10',
    obtain: 'Verdiene sie durch Spielzeit, Events und tägliche Belohnungen.',
    use: 'Nutze sie im Ingame-Shop für Items, Kits und kleine Cosmetics.',
  },
  {
    icon: Gem,
    name: 'Premium Coins',
    accent: 'text-brand',
    ring: 'bg-brand/10',
    obtain: 'Erhalte sie über den Shop oder als monatlichen Rang-Bonus.',
    use: 'Schalte exklusive Cosmetics, limitierte Ränge und besondere Crates frei.',
  },
];

export function Currencies() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {currencies.map((currency, i) => (
        <Reveal key={currency.name} delay={i * 0.1}>
          <Card className="h-full p-8">
            <div
              className={`flex size-14 items-center justify-center rounded-2xl ${currency.ring} ${currency.accent}`}
            >
              <currency.icon className="size-7" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">
              {currency.name}
            </h3>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Wie erhält man sie?
                </dt>
                <dd className="mt-1 text-sm text-text-secondary">
                  {currency.obtain}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Wofür nutzt man sie?
                </dt>
                <dd className="mt-1 text-sm text-text-secondary">
                  {currency.use}
                </dd>
              </div>
            </dl>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
