"use client";

const founderId = "1447642752287379456";
const fallbackAvatar = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#7db3ff"/><stop offset="1" stop-color="#4f5de8"/></linearGradient></defs>
    <rect width="128" height="128" rx="64" fill="#0d1220"/><circle cx="64" cy="64" r="48" fill="url(#g)"/>
    <circle cx="64" cy="49" r="16" fill="#f5fbff"/><path d="M35 91c5-14 18-22 29-22s24 8 29 22" fill="#f5fbff"/>
    <circle cx="58" cy="49" r="2.5" fill="#2d3b6b"/><circle cx="70" cy="49" r="2.5" fill="#2d3b6b"/>
  </svg>
`)}`;
const founderAvatar = "/founder-pfp.png";

export function FounderBadge() {
  return (
    <a
      href={`https://discord.com/users/${founderId}`}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-violet-400/50 bg-[#0f1a2f] px-3 py-2 shadow-[0_0_0_1px_rgba(138,123,255,0.16)] transition hover:brightness-110"
    >
      <img
        src={founderAvatar}
        alt="Founder avatar"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackAvatar;
        }}
        className="h-8 w-8 rounded-full border border-[#8a7bff]/60 object-cover bg-[#101827] shadow-lg shadow-violet-500/20 transition group-hover:scale-[1.03]"
      />
      <span className="text-base font-medium text-white">Founder: @{founderId}</span>
    </a>
  );
}
