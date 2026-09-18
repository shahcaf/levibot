import { siteConfig } from "../../../config/site";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Support</p>
        <h1 className="mt-4 text-4xl font-semibold">Support & help</h1>

        <div className="mt-8 space-y-6 text-slate-300">
          <p>
            Need help with LeviBots, setup, moderation tools, or server configuration? Join the official community and ask for assistance.
          </p>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">Quick links</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Discord community: {siteConfig.discord.inviteUrl}</li>
              <li>• Bot invite: {siteConfig.discord.botInviteUrl}</li>
              <li>• Privacy & cookies: /privacy</li>
            </ul>
          </div>

          <p>
            Common questions include command setup, moderation configuration, welcome systems, ticket flows, and custom server automation.
          </p>
        </div>
      </div>
    </main>
  );
}
