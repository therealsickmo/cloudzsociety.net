'use client';

import { CollectionEditor } from '@/components/admin/collection-editor';
import { ROLE_OPTIONS, STATUS_OPTIONS } from '@/components/admin/options';
import type { Field } from '@/components/admin/schema';
import type { ApplicationRole } from '@/types';

const FIELDS: Field[] = [
  { key: 'role', label: 'Rolle', type: 'select', options: ROLE_OPTIONS },
  { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS },
  { key: 'description', label: 'Beschreibung', type: 'textarea', wide: true },
];

function newRole(): ApplicationRole {
  return {
    role: 'Moderator',
    status: 'open',
    description: '',
  };
}

export default function AdminRolesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Bewerber-Rollen</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Lege fest, für welche Rollen man sich bewerben kann.
      </p>
      <CollectionEditor<ApplicationRole>
        resource="roles"
        fields={FIELDS}
        newItem={newRole}
        itemLabel={(r) => r.role}
        itemMeta={(r) => (r.status === 'open' ? 'Offen' : 'Geschlossen')}
      />
    </div>
  );
}
