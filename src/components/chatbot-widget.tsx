"use client";

import { useEffect, useState } from "react";

const quickQuestions = [
  "What is LeviBots?",
  "How do I join the community?",
  "How do I invite the bot?",
  "Where do I get support?",
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me about LeviBots, commands, support, or the community.",
    },
  ] as { sender: "bot" | "user"; text: string }[]);

  useEffect(() => {
    const handleAssistantRequest = (event: Event) => {
      const question = (event as CustomEvent<string>).detail;
      setOpen(true);
      setInput(question);
    };

    window.addEventListener("levibots:ask-assistant", handleAssistantRequest);
    return () => window.removeEventListener("levibots:ask-assistant", handleAssistantRequest);
  }, []);

  const handleSend = async (text?: string) => {
    const question = (text ?? input).trim();
    if (!question) return;

    setLoading(true);

    setMessages((current) => [
      ...current,
      { sender: "user", text: question },
    ]);

    setInput("");

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "The assistant is temporarily unavailable.");
      }

      const reply = data.reply;

      setMessages((current) => [
        ...current,
        { sender: "bot", text: reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          sender: "bot",
          text: "I hit a temporary issue. Please try again or use the support links on the page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[340px] overflow-hidden rounded-[1.5rem] border border-violet-400/40 bg-[#0d1322] shadow-[0_20px_50px_rgba(18,24,38,0.8)]">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#131d2f] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-xs font-bold text-white">
                L
              </div>
              <span className="text-sm font-semibold text-white">LeviBots Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="max-h-[320px] space-y-3 overflow-y-auto bg-[#0b1220] p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                  message.sender === "user"
                    ? "ml-auto bg-violet-500 text-white"
                    : "bg-white/5 text-slate-200"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-300">
                Thinking...
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-[#0d1322] p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSend(question)}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-slate-200 transition hover:border-violet-400/40 hover:bg-violet-500/10"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask a question..."
                className="flex-1 rounded-full border border-white/10 bg-[#101827] px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-violet-400/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={loading}
                className="rounded-full bg-violet-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full border border-violet-400/50 bg-[#101827] px-4 py-3 text-left shadow-[0_15px_35px_rgba(95,99,255,0.25)] transition hover:-translate-y-0.5 hover:border-violet-300/60"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-sm font-bold text-white">
            L
          </span>
          <span className="text-sm font-medium text-white">Ask LeviBots</span>
        </button>
      )}
    </div>
  );
}
