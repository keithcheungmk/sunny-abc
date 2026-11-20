export type PhonicsLetter = {
  letter: string;
  /** Short phoneme cue for speechSynthesis */
  sound: string;
  word: string;
  emoji: string;
  /** Accent color for the letter card */
  hue: string;
};

/** Short-vowel / hard-consonant first sounds — friendly for ages 3–6. */
export const PHONICS: PhonicsLetter[] = [
  { letter: "A", sound: "ah", word: "apple", emoji: "🍎", hue: "#FF6B6B" },
  { letter: "B", sound: "buh", word: "ball", emoji: "⚽", hue: "#4ECDC4" },
  { letter: "C", sound: "kuh", word: "cat", emoji: "🐱", hue: "#FFE66D" },
  { letter: "D", sound: "duh", word: "dog", emoji: "🐶", hue: "#95E1D3" },
  { letter: "E", sound: "eh", word: "egg", emoji: "🥚", hue: "#F38181" },
  { letter: "F", sound: "fff", word: "fish", emoji: "🐟", hue: "#AA96DA" },
  { letter: "G", sound: "guh", word: "goat", emoji: "🐐", hue: "#FCBAD3" },
  { letter: "H", sound: "hhh", word: "hat", emoji: "🎩", hue: "#A8D8EA" },
  { letter: "I", sound: "ih", word: "igloo", emoji: "🧊", hue: "#7FDBDA" },
  { letter: "J", sound: "juh", word: "jam", emoji: "🍓", hue: "#FF9A8B" },
  { letter: "K", sound: "kuh", word: "kite", emoji: "🪁", hue: "#88D8B0" },
  { letter: "L", sound: "lll", word: "lion", emoji: "🦁", hue: "#FFD93D" },
  { letter: "M", sound: "mmm", word: "moon", emoji: "🌙", hue: "#6BCB77" },
  { letter: "N", sound: "nnn", word: "nest", emoji: "🪹", hue: "#4D96FF" },
  { letter: "O", sound: "ah", word: "octopus", emoji: "🐙", hue: "#FF6B9D" },
  { letter: "P", sound: "puh", word: "pig", emoji: "🐷", hue: "#C9B1FF" },
  { letter: "Q", sound: "kwuh", word: "queen", emoji: "👑", hue: "#F7A072" },
  { letter: "R", sound: "rrr", word: "rabbit", emoji: "🐰", hue: "#84A59D" },
  { letter: "S", sound: "sss", word: "sun", emoji: "☀️", hue: "#F6BD60" },
  { letter: "T", sound: "tuh", word: "tiger", emoji: "🐯", hue: "#F28482" },
  { letter: "U", sound: "uh", word: "umbrella", emoji: "☂️", hue: "#90DBF4" },
  { letter: "V", sound: "vvv", word: "van", emoji: "🚐", hue: "#B5E48C" },
  { letter: "W", sound: "wuh", word: "whale", emoji: "🐋", hue: "#48CAE4" },
  { letter: "X", sound: "ks", word: "box", emoji: "📦", hue: "#DEB887" },
  { letter: "Y", sound: "yuh", word: "yo-yo", emoji: "🪀", hue: "#FFB4A2" },
  { letter: "Z", sound: "zzz", word: "zebra", emoji: "🦓", hue: "#CFBAF0" },
];

export function getLetter(letter: string): PhonicsLetter | undefined {
  return PHONICS.find((p) => p.letter === letter.toUpperCase());
}

export function randomOtherLetters(correct: string, count = 2): PhonicsLetter[] {
  const pool = PHONICS.filter((p) => p.letter !== correct);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}
