"use client";

import { useEffect, useMemo, useState } from "react";

import { siteConfig } from "../../config/site";
import type { DiscordGuildWidget } from "@/lib/discord";

function getMemberAvatar(member: { avatar_url?: string | null; avatar?: string | null; id: string; username: string }) {
  if (member.avatar_url) {
    return member.avatar_url;
  }

  if (member.avatar) {
    return `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`;
  }

  return `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(member.id.slice(-1), 10) % 5}.png`;
}

export function DiscordCommunitySection() {
  const [data, setData] = useState<DiscordGuildWidget | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadDiscordData() {
      try {
        const response = await fetch("/api/discord", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Discord unavailable");
        }

        const payload = (await response.json()) as DiscordGuildWidget;
        if (!ignore) {
          setData(payload);
        }
      } catch {
        if (!ignore) {
          setData(null);
        }
      }
    }

    void loadDiscordData();

    return () => {
      ignore = true;
    };
  }, []);

  const visibleMembers = useMemo(
    () => (data?.members ?? []).filter((member) => Boolean(member.avatar || member.avatar_url)).slice(0, 5),
    [data],
  );

  const onlineCount = data?.presence_count ?? 0;

  return (
    <section id="community" className="relative mt-28">
      <div className="mx-auto max-w-[760px] rounded-[2rem] border border-[#4a5ae8]/50 bg-[#0b1120] p-5 shadow-[0_0_0_1px_rgba(98,113,255,0.15),0_18px_55px_rgba(11,17,32,0.9)] sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7fbff] text-lg text-[#5865f2] shadow-lg shadow-[#5865f2]/20">
              💬
            </div>
            <span className="text-xl font-semibold uppercase tracking-[0.18em] text-white/90">LeviBots</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            Live
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-3">
          <h3 className="text-4xl font-semibold tracking-tight text-white">
            {Math.max(onlineCount, 4)} Online
          </h3>
        </div>

        <div className="mt-7 rounded-[1.25rem] border border-white/10 bg-[#101827] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 text-[#bac3d7]">
            <span className="text-xs uppercase tracking-[0.22em]">Online members</span>
            <span className="text-lg font-semibold text-white">{Math.max(onlineCount, 4)}</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {visibleMembers.length > 0 ? (
              <>
                {visibleMembers.map((member) => (
                  <div
                    key={member.id}
                    className="member-avatar relative -ml-2 first:ml-0 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-900 bg-slate-800 shadow-lg shadow-black/30"
                    title={member.username}
                  >
                    <img
                      src={getMemberAvatar(member)}
                      alt={member.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                {onlineCount > visibleMembers.length ? (
                  <span className="ml-1 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-slate-200">
                    +{Math.max(onlineCount - visibleMembers.length, 0)}
                  </span>
                ) : null}
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Community is online 24/7
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-300">Hangout with people who get it</p>
          <a
            href={siteConfig.discord.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#5d6af5] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(93,106,245,0.35)] transition hover:bg-[#5362ef]"
          >
            Join Discord
          </a>
        </div>
      </div>
    </section>
  );
}
