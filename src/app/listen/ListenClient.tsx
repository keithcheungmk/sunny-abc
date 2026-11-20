"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Celebration } from "@/components/Celebration";
import { LetterTile } from "@/components/LetterTile";
import { SoftButton } from "@/components/SoftButton";
import { SkyScene } from "@/components/SkyScene";
import { StarMeter } from "@/components/StarMeter";
import { makeRound, type Round } from "@/lib/rounds";
import { speakPraise, speakSoundOnly, speakTryAgain, unlockSpeech } from "@/lib/speech";

export function ListenClient() {
  const [round, setRound] = useState<Round>(() => makeRound(0));
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [locked, setLocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRound(makeRound());
    setReady(true);
  }, []);

  const playSound = useCallback(() => {
    unlockSpeech();
    speakSoundOnly(round.answer.sound);
  }, [round]);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(playSound, 400);
    return () => window.clearTimeout(t);
  }, [ready, round.answer.letter, playSound]);

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
      <AppHeader title="Listen & Tap" subtitle="Hear the sound. Tap the letter!" />
      <main className="relative z-20 flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <StarMeter score={score} />

        <SoftButton onClick={playSound} size="xl" className="relative z-20 min-w-[12rem] animate-pulse-soft">
          🔊 Play sound
        </SoftButton>

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

        <p className="max-w-md text-center font-display text-lg font-semibold text-[#2b3a4a]/70">
          Tip: the speaker says the letter sound, not the letter name.
        </p>
      </main>
    </SkyScene>
  );
}
