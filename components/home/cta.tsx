import { MessageCircle, Play } from 'lucide-react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Button } from '@/components/ui/button';
import { JoinServer } from '@/components/home/join-server';
import { getContent, getPublicSettings } from '@/lib/content-store';

export function CTA() {
  const { links } = getPublicSettings();
  const cta = getContent().cta;
  return (
    <Section>
      <Reveal>
        <div className="neon-hover rounded-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card to-surface p-10 text-center md:p-16">
          <div className="absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-brand/25 blur-[120px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              {cta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <JoinServer>
                <Button size="lg">
                  <Play className="size-4 fill-current" />
                  {cta.joinLabel}
                </Button>
              </JoinServer>
              <Button asChild size="lg" variant="outline">
                <a
                  href={links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" />
                  {cta.discordLabel}
                </a>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </Reveal>
    </Section>
  );
}
