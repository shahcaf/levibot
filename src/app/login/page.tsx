"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result?.ok) {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Sign in to LumenBio</h1>
        <p className="mt-2 text-sm text-slate-400">Secure access for your profile and analytics.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-violet-400"
              required
              maxLength={254}
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          New here? <Link href="/register" className="text-white underline">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
