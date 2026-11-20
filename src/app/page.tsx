"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SoftButton } from "@/components/SoftButton";
import { SkyScene } from "@/components/SkyScene";
import { unlockSpeech } from "@/lib/speech";

const MODES = [
  {
    href: "/learn",
    title: "Learn Letters",
    blurb: "A to Z sounds with fun pictures",
    emoji: "📚",
    tint: "#FF8A3D",
  },
  {
    href: "/listen",
    title: "Listen & Tap",
    blurb: "Hear a sound, find the letter",
    emoji: "👂",
    tint: "#4ECDC4",
  },
  {
    href: "/match",
    title: "Picture Match",
    blurb: "See a picture, pick the first letter",
    emoji: "🎨",
    tint: "#FFD93D",
  },
] as const;

export default function HomePage() {
  const router = useRouter();

  return (
    <SkyScene>
      <main className="flex flex-1 flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
        <section className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 py-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
            <p className="mb-2 font-display text-lg font-bold tracking-wide text-[#2b3a4a]/70 animate-rise">
              For little learners · ages 3–6
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] text-[#2b3a4a] drop-shadow-sm sm:text-6xl md:text-7xl animate-rise-delayed">
              Sunny
              <span className="block text-[#ff8a3d]">ABC</span>
            </h1>
            <p className="mt-4 max-w-md font-display text-xl font-semibold text-[#2b3a4a]/80 sm:text-2xl animate-rise-delayed">
              Big letters, bright pictures, and happy sounds — tap to play phonics on your iPad.
            </p>
            <div className="mt-6 animate-rise-late">
              <SoftButton
                size="xl"
                className="min-w-[12rem]"
                onClick={() => {
                  unlockSpeech();
                  router.push("/learn");
                }}
              >
                🌞 Start learning
              </SoftButton>
            </div>
          </div>

          <div
            className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72 animate-float"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-[#ffe066]/85 shadow-[0_16px_0_rgba(217,150,20,0.35)]" />
            <div className="absolute -inset-3 rounded-full border-4 border-dashed border-white/70" />
            <span className="relative font-display text-8xl font-extrabold text-white drop-shadow-md sm:text-9xl">
              Aa
            </span>
            <span className="absolute -right-2 top-4 text-5xl">🍎</span>
            <span className="absolute -left-3 bottom-8 text-4xl">⭐</span>
          </div>
        </section>

        <section className="relative z-20 mx-auto grid w-full max-w-5xl gap-4 pb-4 sm:grid-cols-3">
          {MODES.map((mode) => (
            <Link
              key={mode.href}
              href={mode.href}
              onClick={() => unlockSpeech()}
              className="group relative z-20 touch-manipulation rounded-[1.8rem] border-4 border-white/75 bg-white/55 p-5 shadow-[0_10px_0_rgba(43,58,74,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75 active:translate-y-1 active:shadow-[0_4px_0_rgba(43,58,74,0.12)]"
              style={{ boxShadow: `0 10px 0 rgba(43,58,74,0.12), inset 0 0 0 3px ${mode.tint}55` }}
            >
              <div
                className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-inner"
                style={{ backgroundColor: mode.tint }}
              >
                {mode.emoji}
              </div>
              <h2 className="font-display text-2xl font-extrabold text-[#2b3a4a]">
                {mode.title}
              </h2>
              <p className="mt-1 font-display text-base font-semibold text-[#2b3a4a]/70">
                {mode.blurb}
              </p>
            </Link>
          ))}
        </section>
      </main>
    </SkyScene>
  );
}
