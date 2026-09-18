export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold">Frequently asked questions</h1>

        <div className="mt-8 space-y-6 text-slate-300">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">What does LeviBots do?</h2>
            <p className="mt-3 text-sm text-slate-300">
              LeviBots provides moderation, automation, welcome flows, community tools, announcements, and management systems for Discord communities.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">Is the Discord widget optional?</h2>
            <p className="mt-3 text-sm text-slate-300">
              Yes. The widget only loads after you grant consent in the site preferences. It remains blocked otherwise.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1420] p-5">
            <h2 className="text-xl font-semibold text-white">Need help setting it up?</h2>
            <p className="mt-3 text-sm text-slate-300">
              Join the official community and ask in the support channels for configuration help, setup guidance, or feature requests.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
