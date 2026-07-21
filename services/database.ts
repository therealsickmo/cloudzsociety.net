// ────────────────────────────────────────────────────────────────
// Database service (reserved)
//
// Placeholder for a future persistence layer (Prisma / Drizzle / …).
// Nothing connects to a database yet; this file documents the intended
// seam so DATABASE_URL can be consumed here without scattering DB code
// across the app.
// ────────────────────────────────────────────────────────────────

export interface DatabaseService {
  isConfigured(): boolean;
}

export const databaseService: DatabaseService = {
  isConfigured() {
    return Boolean(process.env.DATABASE_URL);
  },
};
