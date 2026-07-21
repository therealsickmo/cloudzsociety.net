'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PublicSettings, SiteContent } from '@/types';

// ────────────────────────────────────────────────────────────────
// Provides editable settings + text content to client components. The
// values are read on the server (root layout) and passed down, so the
// navbar, hero, footer etc. always reflect what was saved in /admin.
// ────────────────────────────────────────────────────────────────

interface ProviderValue {
  settings: PublicSettings;
  content: SiteContent;
}

const SettingsContext = createContext<ProviderValue | null>(null);

export function SettingsProvider({
  settings,
  content,
  children,
}: {
  settings: PublicSettings;
  content: SiteContent;
  children: ReactNode;
}) {
  return (
    <SettingsContext.Provider value={{ settings, content }}>
      {children}
    </SettingsContext.Provider>
  );
}

function useProvider(): ProviderValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings/useContent must be used within a SettingsProvider');
  }
  return ctx;
}

export function useSettings(): PublicSettings {
  return useProvider().settings;
}

export function useContent(): SiteContent {
  return useProvider().content;
}
