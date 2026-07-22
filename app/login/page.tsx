import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, ShieldCheck, TriangleAlert } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DiscordIcon } from '@/components/icons/discord-icon';
import { discordConfigured } from '@/lib/auth/discord';
import { getSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Melde dich bei CLOUDZ™ über Discord an — als Spieler oder Teammitglied — und verwalte dein persönliches Dashboard.',
};

const ERRORS: Record<string, string> = {
  discord_not_configured:
    'Der Discord-Login ist noch nicht eingerichtet. Bitte nutze vorerst den Team-Login.',
  oauth_state: 'Die Anmeldung ist abgelaufen. Bitte versuche es erneut.',
  oauth_failed: 'Die Anmeldung mit Discord ist fehlgeschlagen.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getSession();
  if (user) redirect('/dashboard');

  const { error } = await searchParams;
  const configured = discordConfigured();

  return (
    <>
      <PageHeader
        eyebrow="Login"
        title="Willkommen zurück"
        description="Melde dich mit Discord an. Spieler landen im persönlichen Dashboard, Teammitglieder im Team-Dashboard."
      />

      <Section>
        <div className="mx-auto max-w-md space-y-5">
          {error && ERRORS[error] && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <span>{ERRORS[error]}</span>
            </div>
          )}

          <Reveal>
            <Card className="p-8 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#5865F2]/15">
                <DiscordIcon className="size-7 text-[#5865F2]" />
              </div>
              <h2 className="mt-6 text-lg font-semibold text-white">
                Mit Discord anmelden
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-text-secondary">
                Schnell und sicher über deinen Discord-Account. Deine Rolle
                erkennen wir automatisch.
              </p>
              <Button asChild size="lg" className="mt-6 w-full">
                <a href="/api/auth/discord">
                  <DiscordIcon className="size-5" />
                  Mit Discord fortfahren
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              {!configured && (
                <p className="mt-3 text-xs text-text-secondary">
                  Discord-Login wird gerade eingerichtet.
                </p>
              )}
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="/admin/login"
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-4 text-sm transition-colors hover:border-brand/40"
            >
              <ShieldCheck className="size-5 shrink-0 text-brand" />
              <span className="flex-1 text-text-secondary">
                <span className="font-semibold text-white">Team & Admin</span> —
                Login mit Passwort
              </span>
              <ArrowRight className="size-4 text-text-secondary" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
