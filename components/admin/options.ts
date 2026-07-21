import { ROLE_ORDER } from '@/lib/roles';

/** Select options for team / application roles. */
export const ROLE_OPTIONS = ROLE_ORDER.map((role) => ({
  value: role,
  label: role,
}));

export const CATEGORY_OPTIONS = [
  { value: 'ranks', label: 'Ränge' },
  { value: 'keys', label: 'Keys' },
  { value: 'coins', label: 'Coins' },
  { value: 'bundles', label: 'Bundles' },
  { value: 'cosmetics', label: 'Cosmetics' },
];

export const CURRENCY_OPTIONS = [
  { value: 'eur', label: 'Euro (€)' },
  { value: 'goon', label: 'Goon Coins' },
  { value: 'premium', label: 'Premium Coins' },
];

export const STATUS_OPTIONS = [
  { value: 'open', label: 'Offen' },
  { value: 'closed', label: 'Geschlossen' },
];
