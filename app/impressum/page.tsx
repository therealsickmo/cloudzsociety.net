import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von CloudzSociety.net.',
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <Section>
        <div className="prose-cloudz mx-auto max-w-3xl">
          <p className="text-sm text-text-secondary">
            Dies ist ein Platzhalter-Impressum für das Demo-Projekt. Ersetze die
            Angaben vor einem Livegang durch deine echten Kontaktdaten gemäß § 5
            TMG.
          </p>

          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            CLOUDZ™ Society
            <br />
            Musterstraße 1<br />
            12345 Musterstadt
            <br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: kontakt@cloudzsociety.net
            <br />
            Discord: discord.gg/cloudz
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            CLOUDZ™ Team
            <br />
            Musterstraße 1, 12345 Musterstadt
          </p>

          <h2>Haftungsausschluss</h2>
          <p>
            CLOUDZ™ ist ein unabhängiges Community-Projekt und steht in keiner
            Verbindung zu Mojang Studios oder Microsoft. „Minecraft“ ist eine
            Marke von Mojang Studios.
          </p>
        </div>
      </Section>
    </>
  );
}
