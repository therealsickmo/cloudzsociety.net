import type { Metadata } from 'next';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von CloudzSociety.net.',
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <Section>
        <div className="prose-cloudz mx-auto max-w-3xl">
          <p className="text-sm text-text-secondary">
            Dies ist eine Platzhalter-Datenschutzerklärung für das Demo-Projekt.
            Passe sie vor einem Livegang an deine tatsächliche Datenverarbeitung
            an (DSGVO).
          </p>

          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist das
            CLOUDZ™ Team (siehe Impressum).
          </p>

          <h2>2. Erhebung und Verarbeitung von Daten</h2>
          <p>
            Diese Website erhebt in ihrer aktuellen Demo-Form keine
            personenbezogenen Daten dauerhaft. Über das Bewerbungsformular
            eingegebene Angaben werden ausschließlich zur Bearbeitung deiner
            Bewerbung genutzt.
          </p>

          <h2>3. Server-Log-Dateien</h2>
          <p>
            Beim Besuch der Website können technisch notwendige Daten (z. B.
            IP-Adresse, Browsertyp, Zugriffszeit) verarbeitet werden, um den
            sicheren Betrieb zu gewährleisten.
          </p>

          <h2>4. Externe Dienste</h2>
          <p>
            Wir verlinken auf externe Dienste wie Discord und ein GitBook-Wiki.
            Beim Aufruf dieser Links gelten die jeweiligen
            Datenschutzbestimmungen der Anbieter.
          </p>

          <h2>5. Deine Rechte</h2>
          <p>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung und
            Einschränkung der Verarbeitung deiner personenbezogenen Daten.
            Wende dich dazu an die im Impressum genannte Kontaktadresse.
          </p>
        </div>
      </Section>
    </>
  );
}
