import { LINKS } from '@/lib/constants';

// ────────────────────────────────────────────────────────────────
// Wiki service
//
// The wiki is an external GitBook. We only ever link out to it — there
// is intentionally no in-app wiki page.
// ────────────────────────────────────────────────────────────────

export interface WikiService {
  getUrl(): string;
}

export const wikiService: WikiService = {
  getUrl() {
    return LINKS.wiki;
  },
};
