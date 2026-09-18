"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "levibots-consent";

type ConsentState = "accepted" | "declined" | null;

export function ConsentBanner() {
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("levibots:consent", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("levibots:consent", onStoreChange);
      };
    },
    () => window.localStorage.getItem(CONSENT_KEY) as ConsentState,
    () => null,
  );

  const chooseConsent = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.localStorage.setItem("levibots-discord-widget-consent", String(value === "accepted"));
    window.dispatchEvent(new CustomEvent("levibots:consent", { detail: value }));
  };

  if (consent) return null;

  return (
    <aside className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#101827]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-6 sm:flex sm:items-center sm:gap-6 sm:p-5">
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Privacy choices</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">
          LeviBots uses essential storage for preferences. Optional analytics and the Discord widget load only after you allow them. Read our <a href="/privacy" className="text-violet-200 underline">Privacy Policy</a>.
        </p>
      </div>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button type="button" onClick={() => chooseConsent("declined")} className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">Decline</button>
        <button type="button" onClick={() => chooseConsent("accepted")} className="rounded-xl bg-violet-500 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-400">Allow optional</button>
      </div>
    </aside>
  );
}
