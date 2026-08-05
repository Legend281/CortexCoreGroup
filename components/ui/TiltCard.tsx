"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 12,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const pctX = (mouseX / width - 0.5) * 2;
    const pctY = (mouseY / height - 0.5) * 2;

    rotateX.set(-pctY * maxTilt);
    rotateY.set(pctX * maxTilt);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const isDisabled = shouldReduceMotion || isTouchDevice;

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isDisabled ? 0 : rotateX,
          rotateY: isDisabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        {/* Glare Overlay */}
        {!isDisabled && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
              opacity: glarePos.opacity,
            }}
          />
        )}
        <div style={{ transform: isDisabled ? "none" : "translateZ(10px)" }}>{children}</div>
      </motion.div>
    </div>
  );
};
