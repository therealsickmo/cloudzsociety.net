import { Calendar, Compass, Rocket, Sparkles } from 'lucide-react';
import { Section, SectionHeading } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Card } from '@/components/ui/card';

const points = [
  {
    icon: Sparkles,
    title: 'Was ist Cloudz?',
    text: 'CLOUDZ™ ist eine moderne Minecraft Community mit eigenen Spielmodi, die du so nirgendwo sonst findest.',
  },
  {
    icon: Calendar,
    title: 'Seit 2021',
    text: 'Das Netzwerk existiert seit 2021 und wächst seitdem kontinuierlich mit einer aktiven, loyalen Community.',
  },
  {
    icon: Compass,
    title: 'Unsere Ziele',
    text: 'Ein faires, freundliches Miteinander und ein Spielerlebnis, das durch regelmäßige Updates niemals langweilig wird.',
  },
  {
    icon: Rocket,
    title: 'Unsere Vision',
    text: 'Die hochwertigste deutschsprachige Minecraft-Plattform zu bauen — technisch modern und mit echtem Community-Fokus.',
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="Über Cloudz"
        title="Mehr als nur ein Server"
        description="CLOUDZ™ verbindet moderne Technik mit einer Community, die zusammenhält. Das steckt hinter dem Netzwerk."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point, i) => (
          <Reveal key={point.title} delay={i * 0.08}>
            <Card className="card-hover h-full p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand shadow-glow-sm">
                <point.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {point.text}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
