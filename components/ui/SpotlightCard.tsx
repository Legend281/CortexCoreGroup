"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  bordered?: boolean;
  innerClassName?: string;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  (
    { className, innerClassName, glowOnHover = true, bordered = true, children, ...props },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spotlight-x", `${x}px`);
      card.style.setProperty("--spotlight-y", `${y}px`);
    }, []);

    const handleMouseLeave = useCallback(() => {
      const card = cardRef.current;
      if (!card) return;
      card.style.removeProperty("--spotlight-x");
      card.style.removeProperty("--spotlight-y");
    }, []);

    return (
      <div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "spotlight-card bg-surface rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
          bordered && "border border-white/10",
          glowOnHover && "hover:border-accent-purple/50 hover:shadow-card-hover hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {/* Spotlight radial gradient overlay tracking cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(350px circle at var(--spotlight-x, -100px) var(--spotlight-y, -100px), rgba(139, 92, 246, 0.12), transparent 60%)",
          }}
        />
        <div className={cn("relative z-10 w-full h-full", innerClassName)}>{children}</div>
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";
