import { Card } from "@/components/card";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { CommandExplorer } from "@/components/command-explorer";
import { DiscordCommunitySection } from "@/components/discord-community";
import { DiscordLiveBadge } from "@/components/discord-live-badge";
import { FounderBadge } from "@/components/founder-badge";
import { Levi3DScene } from "@/components/levi-3d-scene";
import { SiteStatus } from "@/components/site-status";
import Link from "next/link";
import { siteConfig } from "../../config/site";

const features = [
  {
    title: "Smart moderation",
    description: "Auto-moderation, warnings, filters, and role protection that keep communities safe without slowing down the conversation.",
  },
  {
    title: "Automation that scales",
    description: "Welcome flows, announcements, reminders, ticketing, and event triggers built to run smoothly at any community size.",
  },
  {
    title: "Community tools",
    description: "Give your members better engagement with polls, reactions, giveaways, leveling, and custom action systems.",
  },
  {
    title: "Premium dashboard",
    description: "Manage commands, logs, automations, and server settings from one clean control center built for speed.",
  },
];

const commandGroups = [
  {
    icon: "📚",
    title: "Comandi",
    description: "Prefisso: ? — Minigiochi: slash /",
    commands: ["?", "/"],
  },
  {
    icon: "🛡️",
    title: "Moderazione",
    commands: ["kick", "ban", "unban", "mute", "unmute", "warn", "warnings", "clearwarns", "slowmode"],
  },
  {
    icon: "🧹",
    title: "Purge",
    commands: ["?purge <n>"],
  },
  {
    icon: "🔒",
    title: "Lockdown",
    commands: ["lock", "unlock", "lockdown", "unlockdown"],
  },
  {
    icon: "⚙️",
    title: "Log",
    commands: ["?setlog <cat> #canale", "?logstatus"],
  },
  {
    icon: "👋",
    title: "Welcome/Goodbye",
    commands: ["?setupwelcome", "?testwelcome", "?testgoodbye", "?resetwelcome"],
  },
  {
    icon: "📋",
    title: "PEX / DepEx (slash)",
    commands: ["/pex @utente", "/depex @utente", "?setuppex", "?pexlist"],
  },
  {
    icon: "🤝",
    title: "Partnership",
    commands: ["?setuppartner", "/partner", "?partnerlist", "?partnerremove"],
  },
  {
    icon: "🎭",
    title: "Autorole",
    commands: ["?setupautorole", "?autorole"],
  },
  {
    icon: "✅",
    title: "Verify",
    commands: ["?setupverify", "?verifypanel"],
  },
  {
    icon: "🌴",
    title: "Ferie Staff",
    commands: ["?setupferie", "?feriestaff", "?feriepanel", "?ferielist", "?ferieend"],
  },
  {
    icon: "🎮",
    title: "Minigiochi (slash)",
    commands: ["/rps", "/dadi", "/freccette", "/coinflip", "/8ball", "/indovina", "/blackjack", "/stats", "/classifica", "/daily", "/coins", "/minigiochi"],
  },
  {
    icon: "🤝",
    title: "Sponsor",
    commands: ["createsponsor", "sponsorinfo", "sponsorlist", "deletesponsor"],
  },
  {
    icon: "🎫",
    title: "Ticket",
    commands: ["?ticketsetup", "?ticketpanel"],
  },
  {
    icon: "🚨",
    title: "AutoMod",
    commands: ["automod", "automodwhitelist", "addbadword", "removebadword"],
  },
  {
    icon: "💬",
    title: "Fake Profile",
    commands: ["say", "sayembed"],
  },
  {
    icon: "🔊",
    title: "TTS",
    commands: ["setuptts", "disabletts", "ttsstatus", "tts", "ttsstop", "join", "leave"],
  },
  {
    icon: "🎵",
    title: "Musica",
    commands: ["play", "skip", "pause", "resume", "stop", "queue", "volume", "nowplaying"],
  },
  {
    icon: "🔧",
    title: "Utility",
    commands: ["userinfo", "serverinfo", "avatar", "ping", "help"],
  },
];

export default function Home() {
  const commandCount = commandGroups.reduce((total, group) => total + group.commands.length, 0);

  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <div className="relative overflow-hidden px-6 py-10 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_15%_10%,rgba(124,92,255,0.22),transparent_38%),radial-gradient(circle_at_85%_18%,rgba(52,211,153,0.1),transparent_28%)]" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/[0.03] shadow-[0_0_140px_rgba(99,102,241,0.12)]" />
        <div className="relative mx-auto max-w-7xl">
          <header className="mb-16 flex items-center justify-between border-b border-white/10 pb-5">
            <Link href="/" className="flex items-center gap-3" aria-label="LeviBots home">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-bold text-white shadow-[0_8px_30px_rgba(99,102,241,0.25)]">L</span>
              <span className="text-lg font-semibold tracking-[0.18em] text-white">LEVIBOTS</span>
            </Link>
            <nav className="hidden items-center gap-5 text-sm text-slate-300 lg:flex xl:gap-7" aria-label="Primary navigation">
              <a href="#commands" className="transition hover:text-white">Commands</a>
              <a href="#community" className="transition hover:text-white">Community</a>
              <a href="/features" className="transition hover:text-white">Request a feature</a>
              <a href="/support" className="transition hover:text-white">Support</a>
            </nav>
            <a href={siteConfig.discord.botInviteUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-violet-300/30 bg-violet-500/15 px-3.5 py-2 text-xs font-semibold text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/25 sm:px-4 sm:text-sm">
              Add to Discord
            </a>
          </header>

          <div className="mb-12 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300 backdrop-blur-xl sm:px-5">
            <div className="flex items-center gap-2"><span className="status-dot h-2 w-2 rounded-full bg-emerald-400" /> LeviBots systems are online</div>
            <div className="flex items-center gap-3 text-slate-500"><span className="hidden sm:inline">Built for serious communities</span><span className="text-slate-300">v1.0</span></div>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <p className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-100 shadow-lg shadow-violet-500/10">
                  Premium bot tools for Discord communities
                </p>
              </div>
              <div className="mb-6">
                <DiscordLiveBadge />
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl">
                Powerful tools, smart automation, and a better Discord experience.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                LeviBots gives communities advanced moderation, entertainment, announcements, alerts, and automation that feels premium from the first message.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href={siteConfig.discord.botInviteUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:bg-violet-400 sm:w-auto">
                  Add LeviBots to Discord
                </a>
                <a href={siteConfig.discord.inviteUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                  Join the community
                </a>
              </div>
            </div>
            <Card className="w-full bg-white/5 p-6 shadow-2xl shadow-black/30 lg:max-w-xl">
              <div className="mb-5 overflow-hidden rounded-[1.75rem] border border-violet-300/15 bg-[#0b1020] shadow-[inset_0_0_60px_rgba(99,102,241,0.12)]">
                <Levi3DScene />
              </div>
              <div className="grid gap-4 rounded-[2rem] bg-slate-950/40 p-5 shadow-inner shadow-white/5">
                <div className="rounded-[1.8rem] border border-white/10 bg-zinc-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">LeviBots command system</p>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl bg-gradient-to-r from-violet-500/10 to-sky-400/10 p-4 backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <img src="/levibots-logo.png" alt="LeviBots logo" className="h-14 w-14 rounded-full object-cover drop-shadow-[0_10px_22px_rgba(96,191,255,0.45)]" />
                        <div>
                          <p className="text-sm text-slate-300">LeviBots</p>
                          <p className="text-xs text-slate-500">@levibots</p>
                        </div>
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-200">
                          Moderation, economy, announcements, and automation in one place.
                        </div>
                        <a href={siteConfig.discord.botInviteUrl} target="_blank" rel="noreferrer" className="block w-full rounded-3xl bg-violet-500/90 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-400">
                          Add LeviBots to Discord
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <section className="mt-20 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[2rem] border border-[#4ac7ff]/40 bg-[#0c1420] p-6 shadow-[0_0_0_1px_rgba(74,199,255,0.18)] sm:p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4ac7ff]/50 bg-[#0b1d2c] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#6ad8ff]">
                Founder spotlight
              </div>

              <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                Built by the LeviBots founder for real community growth.
              </h2>

              <p className="mt-6 max-w-4xl text-[1.1rem] leading-8 text-slate-300">
                LeviBots was created to give communities a cleaner, faster, and more premium experience instead of bloated Discord tools that feel unfinished.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <FounderBadge />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <Card className="bg-[#111827]/80 p-5">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="mt-2 text-sm text-slate-300">Automatic moderation and support tools</p>
              </Card>
              <Card className="bg-[#111827]/80 p-5">
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="mt-2 text-sm text-slate-300">Community-focused utility and engagement</p>
              </Card>
              <Card className="bg-[#111827]/80 p-5">
                <p className="text-3xl font-bold text-white">Fast</p>
                <p className="mt-2 text-sm text-slate-300">Custom workflows built around real server needs</p>
              </Card>
            </div>
          </section>

          <SiteStatus commandCount={commandCount} />

          <section className="mt-20 grid gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-white/5 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 text-lg text-violet-200">
                  ✦
                </div>
                <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                <p className="mt-3 text-slate-300">{feature.description}</p>
              </Card>
            ))}
          </section>

          <section id="commands" className="mt-20 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="mb-8 text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-violet-200/80">Command center</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built for fast community control
              </h2>
            </div>

            <CommandExplorer groups={commandGroups} />
          </section>

          <DiscordCommunitySection />

          <footer className="mt-20 border-t border-white/10 pt-10">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7db9ff] to-[#6975ff] text-lg font-bold text-white shadow-[0_10px_30px_rgba(100,140,255,0.4)]">
                    L
                  </div>
                  <span className="text-3xl font-semibold tracking-[0.06em] text-white">LEVIBOTS</span>
                </div>
                <p className="max-w-lg text-[1.05rem] leading-8 text-slate-300">
                  LeviBots helps Discord communities run cleaner, faster, and more engaging experiences with automation, moderation, support, and community tools.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Product</h3>
                <ul className="mt-5 space-y-4 text-xl text-slate-300">
                  <li><a href="#community" className="hover:text-white">Community</a></li>
                  <li><a href="#commands" className="hover:text-white">Commands</a></li>
                  <li><a href="/features" className="hover:text-white">Request a feature</a></li>
                  <li><a href="/roadmap" className="hover:text-white">Roadmap</a></li>
                  <li><a href="/admin/requests" className="hover:text-white">Admin panel</a></li>
                  <li><a href={siteConfig.discord.inviteUrl} target="_blank" rel="noreferrer" className="hover:text-white">Invite Bot</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Legal</h3>
                <ul className="mt-5 space-y-4 text-xl text-slate-300">
                  <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="/cookies" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[1.05rem] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 LeviBots. All rights reserved.</p>
              <div className="flex flex-wrap gap-6">
                <a href="/privacy" className="hover:text-white">Privacy</a>
                <a href="/terms" className="hover:text-white">Terms</a>
                <a href="/cookies" className="hover:text-white">Cookies</a>
                <a href="/support" className="hover:text-white">Support</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <ChatbotWidget />
    </main>
  );
}
