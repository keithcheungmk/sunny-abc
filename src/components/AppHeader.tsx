"use client";

import { useRouter } from "next/navigation";
import { SoftButton } from "@/components/SoftButton";
import { unlockSpeech } from "@/lib/speech";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative z-30 flex items-center justify-between gap-3 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
      <SoftButton
        variant="ghost"
        size="md"
        className="relative z-30 shrink-0 px-4"
        aria-label="Back home"
        onClick={() => {
          unlockSpeech();
          router.push("/");
        }}
      >
        ← Home
      </SoftButton>
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
