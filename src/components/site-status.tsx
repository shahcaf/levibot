"use client";

import { useEffect, useState } from "react";

type SiteStatusProps = {
  commandCount: number;
};

export function SiteStatus({ commandCount }: SiteStatusProps) {
  const [discordOnline, setDiscordOnline] = useState<boolean | null>(null);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const checkStatus = async () => {
      try {
        const response = await fetch("/api/discord", { cache: "no-store" });
        if (active) {
          setDiscordOnline(response.ok);
          setCheckedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
      } catch {
        if (active) setDiscordOnline(false);
      }
    };

    void checkStatus();
    const interval = window.setInterval(checkStatus, 60000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const statusLabel = discordOnline === null ? "Checking" : discordOnline ? "Operational" : "Limited";
  const statusColor = discordOnline === false ? "text-amber-300" : "text-emerald-300";

  return (
    <section className="mt-16 rounded-[2rem] border border-white/10 bg-[#0d1220]/90 p-5 shadow-2xl shadow-black/20 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${discordOnline === false ? "bg-amber-400" : "bg-emerald-400"}`} />
            <p className={`text-sm font-semibold ${statusColor}`}>{statusLabel}</p>
            {checkedAt ? <span className="text-xs text-slate-500">Checked {checkedAt}</span> : null}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">Everything your server needs, in one place.</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-2xl font-bold text-white">{commandCount}</p>
            <p className="text-xs text-slate-400">Commands listed</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-xs text-slate-400">Community access</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-1">
            <p className="text-2xl font-bold text-white">Fast</p>
            <p className="text-xs text-slate-400">Setup workflow</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5 text-sm">
        <a href="#commands" className="text-violet-200 hover:text-white">Explore commands</a>
        <a href="/faq" className="text-violet-200 hover:text-white">Read FAQ</a>
        <a href="/support" className="text-violet-200 hover:text-white">Get support</a>
      </div>
    </section>
  );
}
