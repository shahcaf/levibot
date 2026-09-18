import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "secondary";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200",
        variant === "primary" && "bg-violet-500 text-white shadow-lg shadow-violet-500/10 hover:bg-violet-400",
        variant === "secondary" && "border border-white/10 bg-white/5 text-white hover:bg-white/10",
        variant === "ghost" && "bg-transparent text-white hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
