import { siteConfig } from "../../../config/site";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Cookies</p>
        <h1 className="mt-4 text-4xl font-semibold">Cookie Policy</h1>

        <div className="mt-8 space-y-6 text-slate-300">
          <p>
            LeviBots may use browser storage to remember user preferences such as whether the Discord widget should be loaded.
          </p>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">What we use</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Local preference storage for consent and widget settings.</li>
              <li>• Optional third-party cookies when Discord content is explicitly enabled.</li>
            </ul>
          </div>

          <p>
            We do not sell personal data. If you do not consent to the Discord widget, the content remains blocked until you choose to enable it.
          </p>

          <p>
            For more details, see the privacy policy or contact the community via {siteConfig.discord.inviteUrl}.
          </p>
        </div>
      </div>
    </main>
  );
}
