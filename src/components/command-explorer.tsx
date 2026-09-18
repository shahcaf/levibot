"use client";

import { useState } from "react";

type CommandGroup = {
  icon: string;
  title: string;
  description?: string;
  commands: string[];
};

type CommandExplorerProps = {
  groups: CommandGroup[];
};

const categoryDetails: Record<string, { permission: string; description: string }> = {
  Moderazione: {
    permission: "Moderate Members",
    description: "Keep conversations safe with fast member actions and warning tools.",
  },
  Purge: {
    permission: "Manage Messages",
    description: "Remove unwanted messages in seconds.",
  },
  Lockdown: {
    permission: "Manage Channels",
    description: "Lock or reopen channels during incidents and events.",
  },
  Ticket: {
    permission: "Manage Channels",
    description: "Give members a clear path to private support.",
  },
  AutoMod: {
    permission: "Manage Guild",
    description: "Block bad words and unwanted behavior automatically.",
  },
  Musica: {
    permission: "Connect",
    description: "Control music playback, queues, and voice sessions.",
  },
  "Minigiochi (slash)": {
    permission: "Use Application Commands",
    description: "Add quick games, coins, rankings, and daily rewards.",
  },
};

const defaultDetails = {
  permission: "Use Application Commands",
  description: "A LeviBots utility for smoother community management.",
};

function commandKind(command: string) {
  return command.startsWith("/") ? "Slash command" : "Prefix command";
}

export function CommandExplorer({ groups }: CommandExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const categories = ["All", ...groups.map((group) => group.title)];
  const normalizedQuery = query.trim().toLowerCase();
  const visibleGroups = groups
    .filter((group) => activeCategory === "All" || group.title === activeCategory)
    .map((group) => ({
      ...group,
      commands: group.commands.filter((command) => {
        if (!normalizedQuery) return true;
        return `${command} ${group.title} ${group.description ?? ""}`
          .toLowerCase()
          .includes(normalizedQuery);
      }),
    }))
    .filter((group) => group.commands.length > 0);
  const visibleCommandCount = visibleGroups.reduce(
    (total, group) => total + group.commands.length,
    0,
  );

  const copyCommand = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    window.setTimeout(() => setCopiedCommand(null), 1400);
  };

  const askAssistant = (question: string) => {
    window.dispatchEvent(new CustomEvent("levibots:ask-assistant", { detail: question }));
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1220] px-4 text-slate-400 focus-within:border-violet-400/60">
          <span aria-hidden="true" className="text-lg">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands, categories, or features..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
          <span className="hidden whitespace-nowrap text-xs text-slate-500 sm:block">
            {visibleCommandCount} results
          </span>
        </label>
        <a
          href="#assistant"
          onClick={() => askAssistant("Can you help me choose a LeviBots command?")}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 text-sm font-semibold text-violet-100 transition hover:border-violet-300/60 hover:bg-violet-500/20"
        >
          Need help? Ask LeviBots
        </a>
      </div>

      <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeCategory === category
                ? "border-violet-300 bg-violet-500 text-white"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/40 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {visibleGroups.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-[#0d1220]/70 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-white">No commands found</p>
          <p className="mt-2 text-sm text-slate-400">Try another command or reset the category filter.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="mt-5 rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400"
          >
            Reset explorer
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map((group) => {
            const details = categoryDetails[group.title] ?? defaultDetails;

            return (
              <div
                key={group.title}
                className="rounded-[1.5rem] border border-violet-400/20 bg-[#0d1220]/80 p-4 shadow-[0_14px_35px_rgba(106,92,255,0.12)]"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-lg">
                    {group.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {group.description ?? details.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {group.commands.map((command) => {
                    const commandKey = `${group.title}-${command}`;
                    const isExpanded = expandedCommand === commandKey;

                    return (
                      <div key={commandKey} className="rounded-2xl border border-white/10 bg-black/20">
                        <button
                          type="button"
                          onClick={() => setExpandedCommand(isExpanded ? null : commandKey)}
                          className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
                        >
                          <code className="text-xs font-medium text-violet-100">{command}</code>
                          <span className="text-xs text-slate-500">{isExpanded ? "−" : "+"}</span>
                        </button>

                        {isExpanded ? (
                          <div className="border-t border-white/10 px-3 pb-3 pt-2.5">
                            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em]">
                              <span className="rounded-full bg-sky-400/10 px-2 py-1 text-sky-200">
                                {commandKind(command)}
                              </span>
                              <span className="rounded-full bg-amber-300/10 px-2 py-1 text-amber-200">
                                {details.permission}
                              </span>
                            </div>
                            <p className="mt-3 text-xs leading-5 text-slate-400">
                              {details.description}
                            </p>
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() => copyCommand(command)}
                                className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-violet-400/50 hover:text-white"
                              >
                                {copiedCommand === command ? "Copied" : "Copy command"}
                              </button>
                              <a
                                href="#assistant"
                                onClick={() => askAssistant(`What does ${command} do?`)}
                                className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-violet-400/50 hover:text-white"
                              >
                                Ask assistant
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
