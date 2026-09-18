import { siteConfig } from "../../../config/site";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold">Privacy & cookies</h1>

        <div className="mt-8 space-y-6 text-slate-300">
          <p>
            LeviBots may embed third-party content from Discord to show community updates and the official Discord
            server widget. This is optional and only loads after consent is granted in the site preferences.
          </p>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">External services</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Discord widget: {siteConfig.discord.widgetUrl}</li>
              <li>• Discord invite: {siteConfig.discord.inviteUrl}</li>
            </ul>
          </div>

          <p>
            The Discord widget is a third-party service provided by Discord and may use cookies, tracking, or other
            external content delivery mechanisms when loaded. If you do not consent, the widget remains blocked until
            you choose to load it.
          </p>

          <p>
            Discord-related content can be enabled or disabled at any time through the site settings or by clearing the
            widget consent preference in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}
