import { ContentEditor } from '@/components/admin/content-editor';

export const dynamic = 'force-dynamic';

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Inhalte & Texte</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Bearbeite alle Texte, Button-Beschriftungen, die Navigation, den Footer
        und die Startseiten-Blöcke.
      </p>
      <ContentEditor />
    </div>
  );
}
