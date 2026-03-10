import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "purple" | "cyan" | "none";
}

export default function GlassmorphismCard({
  children,
  className,
  hover = false,
  glow = "none",
}: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        hover && "transition-all duration-300 hover:-translate-y-1",
        glow === "purple" && "hover:glow-purple",
        glow === "cyan" && "hover:glow-cyan",
        className,
      )}
    >
      {children}
    </div>
  );
}
