'use client';

import { CollectionEditor } from '@/components/admin/collection-editor';
import type { Field } from '@/components/admin/schema';
import type { ChangelogEntry } from '@/types';

const FIELDS: Field[] = [
  { key: 'version', label: 'Version', type: 'text', hint: 'z. B. 2.4.0' },
  { key: 'date', label: 'Datum', type: 'date' },
  { key: 'category', label: 'Kategorie', type: 'text', hint: 'z. B. Update, Hotfix' },
  { key: 'features', label: 'Features', type: 'lines', wide: true },
  { key: 'improvements', label: 'Verbesserungen', type: 'lines', wide: true },
  { key: 'bugfixes', label: 'Bugfixes', type: 'lines', wide: true },
];

function newEntry(): ChangelogEntry {
  return {
    version: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Update',
    features: [],
    improvements: [],
    bugfixes: [],
  };
}

export default function AdminChangelogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Changelog</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Verwalte die Versionshistorie.
      </p>
      <CollectionEditor<ChangelogEntry>
        resource="changelog"
        fields={FIELDS}
        newItem={newEntry}
        itemLabel={(e) => `v${e.version}`}
        itemMeta={(e) => `${e.category} · ${e.date}`}
      />
    </div>
  );
}
