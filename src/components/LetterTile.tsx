"use client";

import { cn } from "@/lib/utils";
import type { PhonicsLetter } from "@/lib/phonics";

type LetterTileProps = {
  item: PhonicsLetter;
  selected?: boolean;
  state?: "idle" | "correct" | "wrong";
  onClick?: () => void;
  showEmoji?: boolean;
  size?: "sm" | "md" | "lg";
};

export function LetterTile({
  item,
  selected,
  state = "idle",
  onClick,
  showEmoji = false,
  size = "md",
}: LetterTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Letter ${item.letter}`}
      className={cn(
        "letter-tile group relative flex touch-manipulation flex-col items-center justify-center rounded-[1.6rem] border-4 border-white/70 font-display font-extrabold text-white transition duration-200 select-none",
        "shadow-[0_8px_0_rgba(43,58,74,0.18)] active:translate-y-1 active:shadow-[0_3px_0_rgba(43,58,74,0.18)]",
        size === "sm" && "min-h-[4.5rem] min-w-[4.5rem] text-3xl",
        size === "md" && "min-h-[5.5rem] min-w-[5.5rem] text-4xl sm:min-h-24 sm:min-w-24 sm:text-5xl",
        size === "lg" && "min-h-28 min-w-28 text-6xl sm:min-h-36 sm:min-w-36 sm:text-7xl",
        selected && "ring-4 ring-[#ff8a3d] ring-offset-2",
        state === "correct" && "animate-pop ring-4 ring-[#3ecf8e]",
        state === "wrong" && "animate-wiggle ring-4 ring-[#ff6b6b]",
      )}
      style={{ backgroundColor: item.hue }}
    >
      <span className="drop-shadow-md">{item.letter}</span>
      {showEmoji ? (
        <span className="mt-1 text-2xl sm:text-3xl" aria-hidden>
          {item.emoji}
        </span>
      ) : null}
    </button>
  );
}
