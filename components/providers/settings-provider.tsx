'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PublicSettings } from '@/types';

// ────────────────────────────────────────────────────────────────
// Provides editable site settings to client components. The value is
// read on the server (root layout) and passed down, so the navbar,
// hero, footer etc. always reflect what was saved in /admin.
// ────────────────────────────────────────────────────────────────

const SettingsContext = createContext<PublicSettings | null>(null);

export function SettingsProvider({
  value,
  children,
}: {
  value: PublicSettings;
  children: ReactNode;
}) {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): PublicSettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
