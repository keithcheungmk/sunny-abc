"use client";

import { cn } from "@/lib/utils";

type SoftButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "success" | "danger";
  size?: "md" | "lg" | "xl";
};

const variants = {
  primary:
    "bg-[#ff8a3d] text-white shadow-[0_6px_0_#d96a1f] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#d96a1f]",
  secondary:
    "bg-white/90 text-[#2b3a4a] shadow-[0_6px_0_rgba(43,58,74,0.18)] hover:bg-white active:translate-y-1 active:shadow-[0_2px_0_rgba(43,58,74,0.18)]",
  ghost:
    "bg-white/35 text-[#2b3a4a] shadow-[0_4px_0_rgba(43,58,74,0.12)] backdrop-blur-sm hover:bg-white/55 active:translate-y-1 active:shadow-[0_1px_0_rgba(43,58,74,0.12)]",
  success:
    "bg-[#3ecf8e] text-white shadow-[0_6px_0_#2aa56e] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#2aa56e]",
  danger:
    "bg-[#ff6b6b] text-white shadow-[0_6px_0_#d94c4c] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#d94c4c]",
};

const sizes = {
  md: "min-h-14 min-w-14 px-5 text-lg",
  lg: "min-h-16 min-w-16 px-7 text-xl",
  xl: "min-h-20 min-w-20 px-8 text-2xl",
};

export function SoftButton({
  className,
  variant = "primary",
  size = "lg",
  type = "button",
  children,
  ...props
}: SoftButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex touch-manipulation items-center justify-center gap-2 rounded-[1.4rem] font-display font-bold tracking-wide transition-[transform,filter,box-shadow] duration-150 select-none disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
