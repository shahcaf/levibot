import Link from "next/link";
import { FeatureRequestForm } from "@/components/feature-request-form";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#07070c] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-slate-400 transition hover:text-white">← Back to LeviBots</Link>
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">Shape the roadmap</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Request a feature</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Tell us what would make your Discord community better. Every request is sent to the LeviBots feature channel for review.
          </p>
          <FeatureRequestForm />
        </div>
      </div>
    </main>
  );
}
