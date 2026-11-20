"use client";

import { useEffect, useState } from "react";
import { SoftButton } from "@/components/SoftButton";
import { isSpeechAvailable, speakSoundCheck, unlockSpeech } from "@/lib/speech";

const KEY = "sunny-abc-sound-on";

export function SoundEnable() {
  const [needsTap, setNeedsTap] = useState(true);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isSpeechAvailable());
    if (window.sessionStorage.getItem(KEY) === "1") {
      setNeedsTap(false);
    }
  }, []);

  if (!needsTap) return null;

  return (
    <div className="relative z-40 mx-auto mb-3 w-full max-w-5xl px-1">
      <div className="flex flex-col items-stretch gap-3 rounded-[1.6rem] border-4 border-white/80 bg-[#fff7e0]/95 px-4 py-4 shadow-[0_8px_0_rgba(43,58,74,0.12)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg font-bold text-[#2b3a4a] sm:text-xl">
          {supported
            ? "Mac / iPad: tap once to turn sound on (browsers block auto-play)."
            : "This browser has no speech voice — you'll still hear a chime."}
        </p>
        <SoftButton
          size="xl"
          className="shrink-0"
          onClick={() => {
            unlockSpeech();
            speakSoundCheck();
            window.sessionStorage.setItem(KEY, "1");
            setNeedsTap(false);
          }}
        >
          🔊 Turn sound on
        </SoftButton>
      </div>
    </div>
  );
}
