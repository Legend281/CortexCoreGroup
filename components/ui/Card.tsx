import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  bordered?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, glowOnHover = true, bordered = true, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
          bordered && "border border-white/10",
          glowOnHover &&
            "hover:border-accent-purple/50 hover:shadow-card-hover hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
