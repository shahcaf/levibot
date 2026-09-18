"use client";

import { useState } from "react";

type RequestRecord = {
  requestId: string;
  title: string;
  category: string;
  priority: string;
  details: string;
  contact: string;
  createdAt: string;
  status: "pending" | "accepted" | "declined";
};

const statusStyles = {
  pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  accepted: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  declined: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export default function AdminRequestsPage() {
  const [code, setCode] = useState("");
  const [requests, setRequests] = useState<RequestRecord[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadRequests(event?: React.FormEvent) {
    event?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/feature-requests", {
        headers: { "x-admin-code": code },
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Access denied.");
      setRequests(data.requests);
      setUnlocked(true);
    } catch (requestError) {
      setUnlocked(false);
      setError(requestError instanceof Error ? requestError.message : "Could not load requests.");
    } finally {
      setLoading(false);
    }
  }

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07070c] px-6 text-white">
        <form onSubmit={loadRequests} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Private area</p>
          <h1 className="mt-4 text-3xl font-semibold">Feature request history</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Enter the admin code to view submitted requests.</p>
          <input type="password" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Admin code" className="mt-6 w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-violet-400" required />
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
          <button type="submit" disabled={loading} className="mt-5 w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400 disabled:opacity-60">
            {loading ? "Checking..." : "Open admin panel"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-12 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Admin panel</p>
            <h1 className="mt-3 text-4xl font-semibold">Feature request history</h1>
          </div>
          <button type="button" onClick={() => loadRequests()} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Refresh</button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {(["pending", "accepted", "declined"] as const).map((status) => (
            <div key={status} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{status}</p>
              <p className="mt-2 text-3xl font-bold text-white">{requests.filter((request) => request.status === status).length}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {requests.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-slate-400">No requests have been submitted yet.</div> : null}
          {requests.map((request) => (
            <article key={request.requestId} className="rounded-2xl border border-white/10 bg-[#0d1220] p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold text-white">{request.title}</h2>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[request.status]}`}>{request.status}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">#{request.requestId} · {new Date(request.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 text-xs text-slate-300"><span className="rounded-full bg-violet-400/10 px-2.5 py-1">{request.category}</span><span className="rounded-full bg-amber-400/10 px-2.5 py-1">{request.priority}</span></div>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-300">{request.details}</p>
              <p className="mt-4 text-xs text-slate-500">Contact: {request.contact || "Not provided"}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
