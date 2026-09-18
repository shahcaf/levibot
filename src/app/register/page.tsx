"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, displayName, website }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Registration failed. Please try again.");
      return;
    }

    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Create your profile</h1>
        <p className="mt-2 text-sm text-slate-400">Register a protected account with a unique username and public profile.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-violet-400"
              required
            />
          </label>
          <label className="block text-sm text-slate-300">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-violet-400"
              required
            />
          </label>
          <label className="block text-sm text-slate-300">
            Display name (optional)
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-violet-400"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-violet-400"
              required
              minLength={8}
              maxLength={128}
            />
          </label>
          <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            Website
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <Button type="submit" className="w-full">Create account</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already a member? <Link href="/login" className="text-white underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
