"use client";

import { useCallback, useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { SoftButton } from "@/components/SoftButton";
import { SkyScene } from "@/components/SkyScene";
import { PHONICS } from "@/lib/phonics";
import { speakLetterSound, speakWord, unlockSpeech } from "@/lib/speech";

export function LearnClient() {
  const [index, setIndex] = useState(0);
  const item = PHONICS[index];

  const play = useCallback(() => {
    unlockSpeech();
    speakLetterSound(item.sound, item.letter, item.word);
  }, [item]);

  useEffect(() => {
    const t = window.setTimeout(play, 350);
    return () => window.clearTimeout(t);
  }, [index, play]);

  const prev = () => setIndex((i) => (i === 0 ? PHONICS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === PHONICS.length - 1 ? 0 : i + 1));

  return (
    <SkyScene>
      <AppHeader title="Learn Letters" subtitle="Tap the speaker, say it with me!" />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <p className="font-display text-lg font-bold text-[#2b3a4a]/75">
          {index + 1} / {PHONICS.length}
        </p>

        <div
          className="relative flex w-full max-w-xl flex-col items-center rounded-[2rem] border-4 border-white/80 bg-white/55 px-6 py-8 shadow-[0_12px_0_rgba(43,58,74,0.12)] backdrop-blur-md animate-rise"
          style={{ boxShadow: `0 12px 0 rgba(43,58,74,0.12), 0 0 0 6px ${item.hue}33` }}
        >
          <div
            className="mb-4 flex h-36 w-36 items-center justify-center rounded-[2rem] text-7xl shadow-inner sm:h-44 sm:w-44 sm:text-8xl"
            style={{ backgroundColor: item.hue }}
          >
            <span className="font-display font-extrabold text-white drop-shadow-md">
              {item.letter}
            </span>
          </div>

          <div className="mb-2 text-7xl sm:text-8xl" aria-hidden>
            {item.emoji}
          </div>
          <p className="font-display text-3xl font-extrabold capitalize text-[#2b3a4a] sm:text-4xl">
            {item.word}
          </p>
          <p className="mt-1 font-display text-xl font-bold text-[#2b3a4a]/65">
            /{item.sound}/
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <SoftButton onClick={play} size="xl" className="min-w-[10rem]">
              🔊 Hear sound
            </SoftButton>
            <SoftButton
              variant="secondary"
              size="xl"
              onClick={() => {
                unlockSpeech();
                speakWord(item.word);
              }}
            >
              📣 Say word
            </SoftButton>
          </div>
        </div>

        <div className="flex w-full max-w-xl items-center justify-between gap-4">
          <SoftButton variant="ghost" size="xl" onClick={prev} aria-label="Previous letter">
            ← Prev
          </SoftButton>
          <SoftButton variant="success" size="xl" onClick={next} aria-label="Next letter">
            Next →
          </SoftButton>
        </div>

        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2">
          {PHONICS.map((p, i) => (
            <button
              key={p.letter}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${p.letter}`}
              className={`flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl font-display text-base font-extrabold text-white shadow-sm transition sm:h-12 sm:w-12 ${
                i === index ? "scale-110 ring-2 ring-white" : "opacity-85"
              }`}
              style={{ backgroundColor: p.hue }}
            >
              {p.letter}
            </button>
          ))}
        </div>
      </main>
    </SkyScene>
  );
}
