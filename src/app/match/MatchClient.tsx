"use client";

import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Celebration } from "@/components/Celebration";
import { LetterTile } from "@/components/LetterTile";
import { SoftButton } from "@/components/SoftButton";
import { SkyScene } from "@/components/SkyScene";
import { StarMeter } from "@/components/StarMeter";
import { makeRound, type Round } from "@/lib/rounds";
import {
  speakPraise,
  speakTryAgain,
  speakWord,
  unlockSpeech,
} from "@/lib/speech";

export function MatchClient() {
  const [round, setRound] = useState<Round>(() => makeRound(1));
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [locked, setLocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRound(makeRound());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      unlockSpeech();
      speakWord(round.answer.word);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, round.answer.word]);

  const statusFor = useMemo(() => {
    return (letter: string) => {
      if (!picked) return "idle" as const;
      if (letter === round.answer.letter && picked === letter) return "correct" as const;
      if (letter === picked && picked !== round.answer.letter) return "wrong" as const;
      return "idle" as const;
    };
  }, [picked, round.answer.letter]);

  const onPick = (letter: string) => {
    if (locked) return;
    setPicked(letter);
    setLocked(true);
    if (letter === round.answer.letter) {
      setScore((s) => s + 1);
      setCelebrate(true);
      speakPraise();
      window.setTimeout(() => {
        setCelebrate(false);
        setPicked(null);
        setLocked(false);
        setRound(makeRound());
      }, 1400);
    } else {
      speakTryAgain();
      window.setTimeout(() => {
        setPicked(null);
        setLocked(false);
      }, 900);
    }
  };

  return (
    <SkyScene>
      <Celebration show={celebrate} />
      <AppHeader title="Picture Match" subtitle="What letter does it start with?" />
      <main className="relative z-20 flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <StarMeter score={score} />

        <div className="relative z-20 flex w-full max-w-md flex-col items-center rounded-[2rem] border-4 border-white/80 bg-white/60 px-6 py-8 shadow-[0_12px_0_rgba(43,58,74,0.12)] backdrop-blur-md animate-rise">
          <div className="text-8xl sm:text-9xl" aria-hidden>
            {round.answer.emoji}
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold capitalize text-[#2b3a4a] sm:text-4xl">
            {round.answer.word}
          </p>
          <SoftButton
            className="mt-5"
            variant="secondary"
            size="lg"
            onClick={() => {
              unlockSpeech();
              speakWord(round.answer.word);
            }}
          >
            📣 Hear word
          </SoftButton>
        </div>

        <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {round.choices.map((c) => (
            <LetterTile
              key={c.letter}
              item={c}
              size="lg"
              state={statusFor(c.letter)}
              onClick={() => onPick(c.letter)}
            />
          ))}
        </div>
      </main>
    </SkyScene>
  );
}
