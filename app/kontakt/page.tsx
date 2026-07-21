import type { Metadata } from 'next';
import { Github, Mail, MessageCircle } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { getPublicSettings } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Nimm Kontakt mit dem CLOUDZ™ Team auf — über Discord, E-Mail oder GitHub.',
};

export default function KontaktPage() {
  const { links } = getPublicSettings();

  const channels = [
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Der schnellste Weg zu uns. Tritt unserem Server bei.',
      action: 'Discord öffnen',
      href: links.discord,
      external: true,
    },
    {
      icon: Mail,
      title: 'E-Mail',
      description: 'Für offizielle Anfragen und Kooperationen.',
      action: 'kontakt@cloudzsociety.net',
      href: 'mailto:kontakt@cloudzsociety.net',
      external: false,
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Bugs melden oder das Projekt verfolgen.',
      action: 'Zum Repository',
      href: links.github,
      external: true,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="So erreichst du uns"
        description="Fragen, Feedback oder Kooperationsanfragen? Wähle einfach den Kanal, der dir am liebsten ist."
      />
      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.title} delay={i * 0.1}>
              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <channel.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {channel.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary">
                    {channel.description}
                  </p>
                </div>
                <span className="mt-auto text-sm font-medium text-brand">
                  {channel.action} →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
