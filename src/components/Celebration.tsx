"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BITS = ["\u2b50", "\ud83c\udf1f", "\u2728", "\ud83c\udf88", "\ud83c\udf89", "\ud83d\udc9b", "\ud83e\udde1"];

type CelebrationProps = {
  show: boolean;
};

export function Celebration({ show }: CelebrationProps) {
  const [bits, setBits] = useState<{ id: number; emoji: string; left: string; delay: string }[]>(
    [],
  );

  useEffect(() => {
    if (!show) {
      setBits([]);
      return;
    }
    setBits(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        emoji: BITS[i % BITS.length],
        left: `${8 + ((i * 7) % 84)}%`,
        delay: `${i * 0.05}s`,
      })),
    );
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
    >
      {bits.map((b) => (
        <span
          key={b.id}
          className={cn("celebrate-bit absolute top-[35%] text-3xl md:text-4xl")}
          style={{ left: b.left, animationDelay: b.delay }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}
