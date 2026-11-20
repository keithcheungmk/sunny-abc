"use client";

import Link from "next/link";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
      <Link
        href="/"
        className="inline-flex min-h-14 shrink-0 touch-manipulation items-center justify-center rounded-[1.4rem] bg-white/35 px-4 text-lg font-display font-bold text-[#2b3a4a] shadow-[0_4px_0_rgba(43,58,74,0.12)] backdrop-blur-sm transition active:translate-y-1 active:shadow-[0_1px_0_rgba(43,58,74,0.12)]"
        aria-label="Back home"
      >
        ← Home
      </Link>
      <div className="min-w-0 flex-1 text-center">
        <h1 className="truncate font-display text-2xl font-extrabold text-[#2b3a4a] drop-shadow-sm sm:text-3xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-sm font-semibold text-[#2b3a4a]/70 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="w-[5.5rem] shrink-0 sm:w-[6.5rem]" aria-hidden />
    </header>
  );
}
