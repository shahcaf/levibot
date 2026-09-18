import Link from "next/link";

const roadmap = [
  {
    status: "Shipped",
    color: "emerald",
    title: "Command explorer",
    description: "Search, filter, inspect, and copy LeviBots commands with permission guidance.",
  },
  {
    status: "Building",
    color: "violet",
    title: "Community feedback loop",
    description: "Feature requests now flow into Discord review with visible accept and decline states.",
  },
  {
    status: "Exploring",
    color: "sky",
    title: "More server automation",
    description: "Smarter workflows for welcome systems, support channels, events, and moderation.",
  },
];

const colorStyles = {
  emerald: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  violet: "border-violet-400/25 bg-violet-400/10 text-violet-200",
  sky: "border-sky-400/25 bg-sky-400/10 text-sky-200",
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-slate-400 transition hover:text-white">← Back to LeviBots</Link>
        <div className="mt-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Product roadmap</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">Built in public, shaped by communities.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">See what has shipped, what is being built, and where LeviBots is heading next.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {roadmap.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${colorStyles[item.color as keyof typeof colorStyles]}`}>{item.status}</span>
              <h2 className="mt-7 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-violet-300/20 bg-violet-500/10 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">Have an idea for the next milestone?</h2>
            <p className="mt-2 text-slate-300">Send it to the LeviBots feature queue and help shape the roadmap.</p>
          </div>
          <Link href="/features" className="mt-5 inline-flex rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 sm:mt-0">Request a feature</Link>
        </div>
      </div>
    </main>
  );
}
