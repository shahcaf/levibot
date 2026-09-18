import { siteConfig } from "../../../config/site";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold">Terms of Service</h1>

        <div className="mt-8 space-y-6 text-slate-300">
          <p>
            By using LeviBots, you agree to use the bot and related services in a lawful, respectful, and community-safe manner.
          </p>

          <p>
            LeviBots may be used for community moderation, automation, announcements, and engagement features. You are responsible for the configuration, use, and compliance of your server with Discord&apos;s own terms and platform rules.
          </p>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">Service use</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Do not abuse moderation features or exploit automation systems.</li>
              <li>• Do not use LeviBots for harassment, spam, or violations of Discord policies.</li>
              <li>• We may suspend or remove access if misuse is detected.</li>
            </ul>
          </div>

          <p>
            LeviBots is provided as-is, and we reserve the right to modify, suspend, or discontinue features at any time without prior notice.
          </p>

          <p>
            For support, questions, or issues relating to the bot, please contact the community or use the official Discord invite: {siteConfig.discord.inviteUrl}
          </p>
        </div>
      </div>
    </main>
  );
}
