import { siteConfig } from "../../config/site";

export interface DiscordMember {
  id: string;
  username: string;
  discriminator?: string;
  avatar?: string | null;
  avatar_url?: string | null;
  status?: string;
}

export interface DiscordVoiceChannel {
  id: string;
  name: string;
  users?: string[];
}

export interface DiscordGuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
  members: DiscordMember[];
  voice_channels?: DiscordVoiceChannel[];
}

function getMemberAvatarUrl(member: DiscordMember): string | null {
  if (member.avatar_url) {
    return member.avatar_url;
  }

  if (member.avatar) {
    return `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`;
  }

  return null;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

export function normalizeDiscordGuildWidget(payload: unknown): DiscordGuildWidget | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const data = payload as Record<string, unknown>;
  const members = Array.isArray(data.members) ? data.members : [];
  const voiceChannels = Array.isArray(data.voice_channels) ? data.voice_channels : [];

  const normalizedMembers: DiscordMember[] = members
    .filter((member): member is Record<string, unknown> => typeof member === "object" && member !== null)
    .map((member) => {
      const username = typeof member.username === "string" ? member.username : "Discord member";
      const id = typeof member.id === "string" ? member.id : `${username}-${Math.random()}`;
      const avatar = typeof member.avatar === "string" || member.avatar === null ? member.avatar : undefined;
      const avatarUrl = typeof member.avatar_url === "string" || member.avatar_url === null ? member.avatar_url : undefined;
      const status = typeof member.status === "string" ? member.status : undefined;

      return {
        id,
        username,
        discriminator: typeof member.discriminator === "string" ? member.discriminator : undefined,
        avatar: avatar ?? undefined,
        avatar_url: avatarUrl ?? getMemberAvatarUrl({
          id,
          username,
          discriminator: typeof member.discriminator === "string" ? member.discriminator : undefined,
          avatar: avatar ?? undefined,
          avatar_url: avatarUrl ?? undefined,
          status,
        }),
        status,
      };
    })
    .filter((member) => member.username !== "")
    .slice(0, 12);

  const normalizedVoiceChannels: DiscordVoiceChannel[] = voiceChannels
    .filter((channel): channel is Record<string, unknown> => typeof channel === "object" && channel !== null)
    .map((channel) => ({
      id: typeof channel.id === "string" ? channel.id : "unknown",
      name: typeof channel.name === "string" ? channel.name : "Voice Channel",
      users: Array.isArray(channel.users) ? channel.users.filter((user): user is string => typeof user === "string") : [],
    }));

  return {
    id: typeof data.id === "string" ? data.id : siteConfig.discord.guildId,
    name: typeof data.name === "string" ? data.name : siteConfig.name,
    instant_invite:
      typeof data.instant_invite === "string" ? data.instant_invite : siteConfig.discord.inviteUrl,
    presence_count: Math.max(toNumber(data.presence_count), 0),
    members: normalizedMembers,
    voice_channels: normalizedVoiceChannels,
  };
}

export async function fetchDiscordGuildWidget(): Promise<DiscordGuildWidget | null> {
  try {
    const response = await fetch(siteConfig.discord.widgetApi, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "LeviBotsWebsite/1.0",
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    return normalizeDiscordGuildWidget(payload);
  } catch {
    return null;
  }
}
