import React from "react";
import { Pill } from "./Pill";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  gradientWord?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  gradientWord,
  description,
  align = "left",
  className,
  action,
}) => {
  // Render title with optional gradient accent on highlighted word
  const renderTitle = () => {
    if (!gradientWord) return title;
    const parts = title.split(gradientWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{gradientWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        align === "left" && "items-start text-left",
        action && "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <div className="mb-4">
            <Pill variant="eyebrow">{eyebrow}</Pill>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans leading-tight">
          {renderTitle()}
        </h2>
        {description && (
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-6 sm:mt-0 flex-shrink-0">{action}</div>}
    </div>
  );
};
