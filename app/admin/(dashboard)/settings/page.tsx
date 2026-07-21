import { SettingsEditor } from '@/components/admin/settings-editor';

export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Einstellungen</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Markenname, Server-IP, Links und die (mock) Serverstatistik.
      </p>
      <SettingsEditor />
    </div>
  );
}
