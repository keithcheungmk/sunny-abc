import {
  PHONICS,
  randomOtherLetters,
  shuffle,
  type PhonicsLetter,
} from "@/lib/phonics";

export type Round = {
  answer: PhonicsLetter;
  choices: PhonicsLetter[];
};

/** Deterministic first round so SSR + first paint never stick on a loading screen. */
export function makeRound(seed?: number): Round {
  const index =
    seed === undefined
      ? Math.floor(Math.random() * PHONICS.length)
      : ((seed % PHONICS.length) + PHONICS.length) % PHONICS.length;
  const answer = PHONICS[index];
  const others =
    seed === undefined
      ? randomOtherLetters(answer.letter, 2)
      : PHONICS.filter((p) => p.letter !== answer.letter).slice(0, 2);
  const choices =
    seed === undefined ? shuffle([answer, ...others]) : [others[0], answer, others[1]];
  return { answer, choices };
}
