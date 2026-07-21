import type { ApplicationPayload } from '@/types';

// ────────────────────────────────────────────────────────────────
// Application service
//
// Handles staff applications. Posts to a local dummy API route
// (app/api/apply/route.ts) for now; later this can forward to Discord
// webhooks, a database, or an admin dashboard.
// ────────────────────────────────────────────────────────────────

export interface ApplicationResult {
  ok: boolean;
  message: string;
}

export interface ApplicationService {
  submit(payload: ApplicationPayload): Promise<ApplicationResult>;
}

export const applicationService: ApplicationService = {
  async submit(payload) {
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ApplicationResult;
      return data;
    } catch {
      return {
        ok: false,
        message: 'Bewerbung konnte nicht gesendet werden. Bitte erneut versuchen.',
      };
    }
  },
};
