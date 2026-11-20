import { cn } from "@/lib/utils";

type SkySceneProps = {
  children: React.ReactNode;
  className?: string;
};

export function SkyScene({ children, className }: SkySceneProps) {
  return (
    <div
      className={cn(
        "relative min-h-dvh overflow-hidden text-[#2b3a4a]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#7ec8f8_0%,#b8e4ff_42%,#ffe8a3_78%,#8fd48a_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="cloud cloud-a" />
        <span className="cloud cloud-b" />
        <span className="cloud cloud-c" />
        <span className="sun" />
        <span className="hill hill-left" />
        <span className="hill hill-right" />
      </div>
      <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
    </div>
  );
}
