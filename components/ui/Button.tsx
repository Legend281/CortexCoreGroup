import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-accent text-white shadow-lg hover:shadow-glow-purple hover:brightness-110 border border-transparent",
        secondary:
          "bg-surface/80 text-white border border-white/10 hover:border-accent-purple/50 hover:bg-surface-hover hover:shadow-glow-purple",
        ghost:
          "bg-transparent text-text-secondary hover:text-white hover:bg-white/5",
        outline:
          "bg-transparent text-white border border-white/20 hover:border-accent-purple hover:bg-accent-purple/10",
      },
      size: {
        sm: "text-xs px-4 py-2 gap-1.5",
        md: "text-sm px-6 py-3 gap-2",
        lg: "text-base px-8 py-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  showArrow?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, showArrow = false, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
