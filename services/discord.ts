import { LINKS } from '@/lib/constants';

// ────────────────────────────────────────────────────────────────
// Discord service
//
// Only the public invite is wired today. When DISCORD_GUILD_ID and a
// bot token are provided, `getMemberCount` can call the Discord widget
// API (https://discord.com/api/guilds/{id}/widget.json).
// ────────────────────────────────────────────────────────────────

export interface DiscordService {
  getInviteUrl(): string;
  getMemberCount(): Promise<number>;
}

export const discordService: DiscordService = {
  getInviteUrl() {
    return LINKS.discord;
  },

  async getMemberCount() {
    // Mocked until the widget API is enabled.
    return 4820;
  },
};
