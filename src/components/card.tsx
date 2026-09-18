import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-black/30",
        className,
      )}
      {...props}
    />
  );
}
