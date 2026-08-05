"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>(
    shouldReduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals)
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value.toFixed(decimals));
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Easing cubic-bezier easeOut
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * value;

      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value.toFixed(decimals));
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, decimals, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
