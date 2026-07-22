import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Gamepad2, ShieldCheck, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Melde dich bei CLOUDZ™ an — als Spieler für dein persönliches Dashboard oder als Teammitglied bzw. Administrator.',
};

const options = [
  {
    href: '/login/spieler',
    icon: Gamepad2,
    eyebrow: 'Spieler',
    title: 'Spieler-Login',
    text: 'Melde dich mit deinem Minecraft-Account an und verwalte dein persönliches Dashboard — Statistiken, Ränge und mehr.',
    cta: 'Als Spieler anmelden',
    soon: true,
  },
  {
    href: '/admin/login',
    icon: ShieldCheck,
    eyebrow: 'Team & Administration',
    title: 'Team-Login',
    text: 'Zugang für Teammitglieder und Administratoren — verwalte Inhalte, Bewerbungen und die Serverkonfiguration.',
    cta: 'Als Team anmelden',
    soon: false,
  },
];

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Login"
        title="Willkommen zurück"
        description="Wähle aus, wie du dich anmelden möchtest."
      />

      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {options.map((opt, i) => (
            <Reveal key={opt.href} delay={i * 0.1}>
              <Link href={opt.href} className="group block h-full">
                <Card className="card-hover flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 text-brand">
                      <opt.icon className="size-7" />
                    </div>
                    {opt.soon && (
                      <Badge variant="outline">
                        <Sparkles className="size-3.5" />
                        Bald
                      </Badge>
                    )}
                  </div>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand">
                    {opt.eyebrow}
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    {opt.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-text-secondary">
                    {opt.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    {opt.cta}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
