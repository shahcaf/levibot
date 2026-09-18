"use client";

import { useEffect, useState } from "react";

import type { DiscordGuildWidget } from "@/lib/discord";

export function DiscordLiveBadge() {
  const [data, setData] = useState<DiscordGuildWidget | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;

    async function loadDiscordStatus() {
      try {
        const response = await fetch("/api/discord", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Discord unavailable");
        }

        const payload = (await response.json()) as DiscordGuildWidget;
        if (!ignore) {
          setData(payload);
          setStatus("ready");
        }
      } catch {
        if (!ignore) {
          setData(null);
          setStatus("error");
        }
      }
    }

    void loadDiscordStatus();

    return () => {
      ignore = true;
    };
  }, []);

  if (status === "error" || !data || data.presence_count <= 0) {
    return null;
  }

  const scrollToCommunity = () => {
    document.getElementById("community")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={scrollToCommunity}
      className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200 shadow-lg shadow-emerald-500/10 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-500/15"
    >
      <span className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span>Live 24/7 · {data.presence_count} online</span>
    </button>
  );
}
