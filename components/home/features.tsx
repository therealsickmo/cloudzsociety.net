import { Gamepad2, Headphones, RefreshCw, Users } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';

const features = [
  {
    icon: Gamepad2,
    title: 'Eigene Spielmodi',
    text: 'Einzigartige Spielmodi, die wir selbst entwickeln — von rasantem PvP bis zu entspanntem Survival.',
  },
  {
    icon: Users,
    title: 'Aktive Community',
    text: 'Tausende Spieler auf Discord und im Spiel. Finde neue Freunde und erlebe Events gemeinsam.',
  },
  {
    icon: RefreshCw,
    title: 'Regelmäßige Updates',
    text: 'Neue Inhalte, Balance-Anpassungen und Features — wir liefern kontinuierlich frischen Content.',
  },
  {
    icon: Headphones,
    title: 'Schneller Support',
    text: 'Unser Support-Team ist rund um die Uhr für dich da und hilft bei jedem Anliegen zügig weiter.',
  },
];

export function Features() {
  return (
    <Section id="features" className="relative">
      <SectionHeading
        eyebrow="Features"
        title="Warum CLOUDZ™?"
        description="Vier Gründe, warum sich tausende Spieler für unser Netzwerk entscheiden."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
              {/* Hover glow */}
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-white shadow-glow-sm">
                  <feature.icon className="size-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {feature.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
