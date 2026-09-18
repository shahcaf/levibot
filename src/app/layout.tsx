import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { BrowserGuard } from "@/components/browser-guard";
import { ConsentBanner } from "@/components/consent-banner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "LeviBots | Premium Discord Bot Tools",
    template: "%s | LeviBots",
  },
  description: "Powerful moderation, automation, entertainment, and community tools for Discord servers.",
  applicationName: "LeviBots",
  keywords: ["Discord bot", "Discord moderation", "Discord automation", "LeviBots"],
  openGraph: {
    title: "LeviBots | Premium Discord Bot Tools",
    description: "Run a cleaner, faster Discord community with LeviBots.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        {children}
        <ConsentBanner />
        <Analytics />
        <BrowserGuard />
      </body>
    </html>
  );
}
