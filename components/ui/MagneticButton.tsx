"use client";

import React, { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 35,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: shouldReduceMotion ? 0 : x, y: shouldReduceMotion ? 0 : y }}
      whileTap={{ scale: 0.96 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
