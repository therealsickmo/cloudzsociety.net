'use client';

import { CollectionEditor } from '@/components/admin/collection-editor';
import { ROLE_OPTIONS } from '@/components/admin/options';
import type { Field } from '@/components/admin/schema';
import type { TeamMember } from '@/types';

const FIELDS: Field[] = [
  { key: 'name', label: 'Anzeigename', type: 'text' },
  { key: 'minecraft', label: 'Minecraft-Name', type: 'text', hint: 'Für den Skin-Kopf' },
  { key: 'role', label: 'Rolle', type: 'select', options: ROLE_OPTIONS },
  { key: 'memberSince', label: 'Mitglied seit', type: 'date' },
  { key: 'available', label: 'Verfügbar', type: 'boolean' },
];

function newMember(): TeamMember {
  return {
    name: '',
    minecraft: 'Steve',
    role: 'Supporter',
    memberSince: new Date().toISOString().slice(0, 10),
    available: true,
  };
}

export default function AdminTeamPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Team</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Verwalte die Teammitglieder und ihre Rollen.
      </p>
      <CollectionEditor<TeamMember>
        resource="team"
        fields={FIELDS}
        newItem={newMember}
        itemLabel={(m) => m.name}
        itemMeta={(m) => m.role}
      />
    </div>
  );
}
