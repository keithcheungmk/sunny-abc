"use client";

let unlocked = false;

/** iPad Safari needs a user-gesture unlock before speech works reliably. */
export function unlockSpeech(): void {
  if (typeof window === "undefined" || unlocked) return;
  try {
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    window.speechSynthesis.speak(u);
    window.speechSynthesis.cancel();
    unlocked = true;
  } catch {
    /* ignore */
  }
}

export type SpeakOptions = {
  rate?: number;
  pitch?: number;
  lang?: string;
};

export function speak(text: string, options: SpeakOptions = {}): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  unlockSpeech();
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = options.rate ?? 0.85;
  u.pitch = options.pitch ?? 1.15;
  u.lang = options.lang ?? "en-US";
  window.speechSynthesis.speak(u);
}

export function speakLetterSound(sound: string, letter: string, word: string): void {
  speak(`${sound}. ${letter} for ${word}.`, { rate: 0.8, pitch: 1.2 });
}

export function speakSoundOnly(sound: string): void {
  speak(sound, { rate: 0.7, pitch: 1.25 });
}

export function speakWord(word: string): void {
  speak(word, { rate: 0.9, pitch: 1.1 });
}

export function speakPraise(): void {
  const lines = ["Great job!", "Yes!", "Awesome!", "You did it!", "Wonderful!"];
  speak(lines[Math.floor(Math.random() * lines.length)], { rate: 1, pitch: 1.3 });
}

export function speakTryAgain(): void {
  speak("Try again!", { rate: 0.95, pitch: 1.05 });
}
