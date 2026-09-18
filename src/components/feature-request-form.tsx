"use client";

import { useState } from "react";

const categories = ["Moderation", "Community", "Music", "Games", "Utility", "Other"] as const;
const priorities = ["Nice to have", "Important", "Critical"] as const;

export function FeatureRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/feature-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "We could not send the request. Please try again.");
        return;
      }

      formElement.reset();
      setStatus("success");
      setMessage("Request sent. The LeviBots team will review it in Discord.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof DOMException && error.name === "AbortError"
        ? "The request timed out. Please try again."
        : "We could not connect to the request service. Please try again.");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="text-sm text-slate-300">
          Feature title
          <input name="title" required minLength={5} maxLength={100} placeholder="Example: Temporary voice channels" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-violet-400" />
        </label>
        <label className="text-sm text-slate-300">
          Category
          <select name="category" defaultValue="Community" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-violet-400">
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="text-sm text-slate-300">
          Priority
          <select name="priority" defaultValue="Nice to have" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-violet-400">
            {priorities.map((priority) => <option key={priority}>{priority}</option>)}
          </select>
        </label>
      </div>

      <label className="block text-sm text-slate-300">
        What should it do?
        <textarea name="details" required minLength={20} maxLength={2000} rows={6} placeholder="Explain the problem, how the feature should work, and who it helps..." className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-violet-400" />
      </label>

      <label className="block text-sm text-slate-300">
        Discord username or contact <span className="text-slate-500">(optional)</span>
        <input name="contact" maxLength={120} placeholder="@username" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-violet-400" />
      </label>

      <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {message ? <p className={status === "success" ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>{message}</p> : null}
      <button type="submit" disabled={status === "sending"} className="w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? "Sending request..." : "Submit feature request"}
      </button>
    </form>
  );
}
