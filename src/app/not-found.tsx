import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07070c] px-6 text-white">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-300">404 error</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-slate-300">
          That LeviBots page does not exist or may have moved. Head back to the command center.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-400">
          Return home
        </Link>
      </div>
    </main>
  );
}
