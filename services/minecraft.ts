import { MINECRAFT } from '@/lib/constants';
import type { ServerStatus } from '@/types';

// ────────────────────────────────────────────────────────────────
// Minecraft server service
//
// Currently returns mock data. When the real server API is available,
// swap the body of `getServerStatus` for a fetch against e.g.
// `https://api.mcsrvstat.us/3/${MINECRAFT.ip}` and map the response.
// The public contract (ServerStatus) stays the same, so nothing
// downstream needs to change.
// ────────────────────────────────────────────────────────────────

const MOCK_STATUS: ServerStatus = {
  online: true,
  playersOnline: 137,
  playersMax: 500,
  registeredPlayers: 14238,
  discordMembers: 4820,
  version: '1.21.4',
  uptime: 60 * 60 * 24 * 42 + 60 * 60 * 7, // 42d 7h
};

export interface MinecraftService {
  getServerStatus(): Promise<ServerStatus>;
  getConnectAddress(): string;
}

export const minecraftService: MinecraftService = {
  async getServerStatus() {
    // Simulate network latency so loading states are exercised in dev.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return MOCK_STATUS;
  },

  getConnectAddress() {
    return MINECRAFT.port === '25565'
      ? MINECRAFT.ip
      : `${MINECRAFT.ip}:${MINECRAFT.port}`;
  },
};
