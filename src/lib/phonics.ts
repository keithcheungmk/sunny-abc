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
  { letter: "A", sound: "ah", word: "apple", emoji: "\ud83c\udf4e", hue: "#FF6B6B" },
  { letter: "B", sound: "buh", word: "ball", emoji: "\u26bd", hue: "#4ECDC4" },
  { letter: "C", sound: "kuh", word: "cat", emoji: "\ud83d\udc31", hue: "#FFE66D" },
  { letter: "D", sound: "duh", word: "dog", emoji: "\ud83d\udc36", hue: "#95E1D3" },
  { letter: "E", sound: "eh", word: "egg", emoji: "\ud83e\udd5a", hue: "#F38181" },
  { letter: "F", sound: "fff", word: "fish", emoji: "\ud83d\udc1f", hue: "#AA96DA" },
  { letter: "G", sound: "guh", word: "goat", emoji: "\ud83d\udc10", hue: "#FCBAD3" },
  { letter: "H", sound: "hhh", word: "hat", emoji: "\ud83c\udfa9", hue: "#A8D8EA" },
  { letter: "I", sound: "ih", word: "igloo", emoji: "\ud83e\uddca", hue: "#7FDBDA" },
  { letter: "J", sound: "juh", word: "jam", emoji: "\ud83c\udf53", hue: "#FF9A8B" },
  { letter: "K", sound: "kuh", word: "kite", emoji: "\ud83e\ude81", hue: "#88D8B0" },
  { letter: "L", sound: "lll", word: "lion", emoji: "\ud83e\udd81", hue: "#FFD93D" },
  { letter: "M", sound: "mmm", word: "moon", emoji: "\ud83c\udf19", hue: "#6BCB77" },
  { letter: "N", sound: "nnn", word: "nest", emoji: "\ud83e\udeb8", hue: "#4D96FF" },
  { letter: "O", sound: "ah", word: "octopus", emoji: "\ud83d\udc19", hue: "#FF6B9D" },
  { letter: "P", sound: "puh", word: "pig", emoji: "\ud83d\udc37", hue: "#C9B1FF" },
  { letter: "Q", sound: "kwuh", word: "queen", emoji: "\ud83d\udc51", hue: "#F7A072" },
  { letter: "R", sound: "rrr", word: "rabbit", emoji: "\ud83d\udc30", hue: "#84A59D" },
  { letter: "S", sound: "sss", word: "sun", emoji: "\u2600\ufe0f", hue: "#F6BD60" },
  { letter: "T", sound: "tuh", word: "tiger", emoji: "\ud83d\udc2f", hue: "#F28482" },
  { letter: "U", sound: "uh", word: "umbrella", emoji: "\u2602\ufe0f", hue: "#90DBF4" },
  { letter: "V", sound: "vvv", word: "van", emoji: "\ud83d\ude90", hue: "#B5E48C" },
  { letter: "W", sound: "wuh", word: "whale", emoji: "\ud83d\udc0b", hue: "#48CAE4" },
  { letter: "X", sound: "ks", word: "box", emoji: "\ud83d\udce6", hue: "#DEB887" },
  { letter: "Y", sound: "yuh", word: "yo-yo", emoji: "\ud83e\ude80", hue: "#FFB4A2" },
  { letter: "Z", sound: "zzz", word: "zebra", emoji: "\ud83e\udd93", hue: "#CFBAF0" },
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
