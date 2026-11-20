"use client";

/**
 * Mac Chrome/Safari often need:
 * 1) a real user-gesture unlock
 * 2) an English system voice selected after voices load
 * 3) speechSynthesis.resume() — Chrome can stay paused and stay silent
 */

let unlocked = false;
let preferredVoice: SpeechSynthesisVoice | null = null;
let resumeTimer: number | null = null;

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

function pickVoice(): SpeechSynthesisVoice | null {
  const s = synth();
  if (!s) return null;
  const voices = s.getVoices();
  if (!voices.length) return null;

  const prefer = [
    /samantha/i,
    /karen/i,
    /moira/i,
    /google us english/i,
    /microsoft (aria|jenny|zira)/i,
    /en[-_]us/i,
    /^en/i,
  ];

  for (const re of prefer) {
    const hit = voices.find((v) => re.test(v.name) || re.test(v.lang));
    if (hit) return hit;
  }
  return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ?? voices[0] ?? null;
}

function refreshVoice(): void {
  preferredVoice = pickVoice();
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  refreshVoice();
  window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoice);
  // Some browsers only populate voices after getVoices() is poked.
  window.speechSynthesis.getVoices();
}

function clearResumeWatch(): void {
  if (resumeTimer !== null) {
    window.clearInterval(resumeTimer);
    resumeTimer = null;
  }
}

/** Chrome workaround: keep calling resume while an utterance is speaking. */
function watchResume(): void {
  const s = synth();
  if (!s) return;
  clearResumeWatch();
  resumeTimer = window.setInterval(() => {
    if (!s.speaking) {
      clearResumeWatch();
      return;
    }
    try {
      s.resume();
    } catch {
      /* ignore */
    }
  }, 250);
}

/** Soft chime so Mac users get audible feedback even if TTS is blocked. */
function playChime(): void {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.18);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.3);
    window.setTimeout(() => void ctx.close(), 500);
  } catch {
    /* ignore */
  }
}

/** Call from a click/tap. Returns true when speech API is available. */
export function unlockSpeech(): boolean {
  const s = synth();
  if (!s) return false;
  refreshVoice();
  try {
    s.cancel();
    s.resume();
  } catch {
    /* ignore */
  }

  if (!unlocked) {
    playChime();
    try {
      const warm = new SpeechSynthesisUtterance("hi");
      warm.volume = 0.01;
      warm.rate = 2;
      if (preferredVoice) warm.voice = preferredVoice;
      s.speak(warm);
      s.cancel();
    } catch {
      /* ignore */
    }
    unlocked = true;
  }
  return true;
}

export function isSpeechAvailable(): boolean {
  return Boolean(synth());
}

export type SpeakOptions = {
  rate?: number;
  pitch?: number;
  lang?: string;
  withChime?: boolean;
};

export function speak(text: string, options: SpeakOptions = {}): void {
  const s = synth();
  if (!s) {
    playChime();
    return;
  }

  unlockSpeech();
  refreshVoice();

  try {
    s.cancel();
    s.resume();
  } catch {
    /* ignore */
  }

  if (options.withChime) playChime();

  const u = new SpeechSynthesisUtterance(text);
  u.rate = options.rate ?? 0.9;
  u.pitch = options.pitch ?? 1.05;
  u.volume = 1;
  u.lang = options.lang ?? preferredVoice?.lang ?? "en-US";
  if (preferredVoice) u.voice = preferredVoice;

  u.onstart = () => watchResume();
  u.onend = () => clearResumeWatch();
  u.onerror = () => {
    clearResumeWatch();
    playChime();
  };

  s.speak(u);
  // Immediate kick — Chrome sometimes queues without starting.
  try {
    s.resume();
  } catch {
    /* ignore */
  }
}

/** Map phoneme cues to TTS-friendly syllables (Mac voices mumble "fff"/"sss"). */
function speakableSound(sound: string): string {
  const map: Record<string, string> = {
    ah: "ah",
    eh: "eh",
    ih: "ih",
    uh: "uh",
    buh: "buh",
    kuh: "kuh",
    duh: "duh",
    fff: "fuh",
    guh: "guh",
    hhh: "huh",
    juh: "juh",
    lll: "lll",
    mmm: "mmm",
    nnn: "nnn",
    puh: "puh",
    kwuh: "kwuh",
    rrr: "rrr",
    sss: "sss",
    tuh: "tuh",
    vvv: "vuh",
    wuh: "wuh",
    ks: "ks",
    yuh: "yuh",
    zzz: "zzz",
  };
  return map[sound] ?? sound;
}

export function speakLetterSound(sound: string, letter: string, word: string): void {
  const s = speakableSound(sound);
  speak(`${s}. ${letter} for ${word}.`, { rate: 0.85, pitch: 1.1, withChime: true });
}

export function speakSoundOnly(sound: string): void {
  speak(speakableSound(sound), { rate: 0.75, pitch: 1.15, withChime: true });
}

export function speakWord(word: string): void {
  speak(word, { rate: 0.95, pitch: 1.05, withChime: true });
}

export function speakPraise(): void {
  const lines = ["Great job!", "Yes!", "Awesome!", "You did it!", "Wonderful!"];
  speak(lines[Math.floor(Math.random() * lines.length)], { rate: 1, pitch: 1.15 });
}

export function speakTryAgain(): void {
  speak("Try again!", { rate: 0.95, pitch: 1.05 });
}

/** Loud audible test for the Turn sound on button. */
export function speakSoundCheck(): void {
  unlockSpeech();
  speak("Sound is on! Let's learn phonics.", { rate: 0.95, pitch: 1.1, withChime: true });
}
