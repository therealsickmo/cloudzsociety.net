import { MessageCircle, Play } from 'lucide-react';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Button } from '@/components/ui/button';
import { JoinServer } from '@/components/home/join-server';
import { LINKS } from '@/lib/constants';

export function CTA() {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card to-surface p-10 text-center md:p-16">
          <div className="absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-brand/25 blur-[120px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              Bereit, Teil der{' '}
              <span className="text-gradient-brand">CLOUDZ™</span> Community zu
              werden?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Verbinde dich mit dem Server, tritt unserem Discord bei und
              erlebe Minecraft neu.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <JoinServer>
                <Button size="lg">
                  <Play className="size-4 fill-current" />
                  Server beitreten
                </Button>
              </JoinServer>
              <Button asChild size="lg" variant="outline">
                <a
                  href={LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" />
                  Discord beitreten
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
