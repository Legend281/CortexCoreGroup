import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center text-xs font-semibold rounded-full tracking-wider transition-all duration-200",
  {
    variants: {
      variant: {
        eyebrow:
          "uppercase tracking-widest text-accent-purple bg-accent-purple/10 px-3.5 py-1.5 border border-accent-purple/20",
        tag: "text-text-secondary bg-white/5 px-3 py-1 border border-white/10 hover:border-white/20 hover:text-white",
        active:
          "text-white bg-gradient-accent px-4 py-1.5 shadow-glow-purple border border-transparent",
        filter:
          "text-text-secondary bg-surface px-4 py-2 border border-white/10 hover:border-accent-purple/40 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
      },
    },
    defaultVariants: {
      variant: "tag",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  active?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  className,
  variant,
  active,
  children,
  ...props
}) => {
  const finalVariant = active ? "active" : variant;
  return (
    <span className={cn(pillVariants({ variant: finalVariant, className }))} {...props}>
      {children}
    </span>
  );
};
