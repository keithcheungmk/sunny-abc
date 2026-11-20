type StarMeterProps = {
  score: number;
  label?: string;
};

export function StarMeter({ score, label = "Stars" }: StarMeterProps) {
  const filled = Math.min(5, Math.max(0, Math.floor(score / 2)));
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full bg-white/55 px-3 py-2 shadow-sm backdrop-blur-sm"
      aria-label={`${label}: ${score}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-xl transition ${i < filled ? "scale-110 opacity-100" : "opacity-30 grayscale"}`}
          aria-hidden
        >
          ⭐
        </span>
      ))}
      <span className="ml-1 font-display text-sm font-bold text-[#2b3a4a]">{score}</span>
    </div>
  );
}
