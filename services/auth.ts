// ────────────────────────────────────────────────────────────────
// Auth service (reserved)
//
// Scaffolding for a future login system. No implementation yet — the
// interface is defined so pages/components can depend on a stable shape
// and a real provider (NextAuth, custom JWT, …) can be dropped in later.
// ────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  username: string;
  minecraft?: string;
  roles: string[];
}

export interface AuthService {
  getSession(): Promise<AuthUser | null>;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}

export const authService: AuthService = {
  async getSession() {
    return null;
  },
  async signIn() {
    throw new Error('Auth ist noch nicht implementiert.');
  },
  async signOut() {
    throw new Error('Auth ist noch nicht implementiert.');
  },
};
