"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export const CortexHeroMark: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting reduced motion
  const pulseVariant = shouldReduceMotion
    ? { opacity: 1, scale: 1 }
    : {
        opacity: [0.7, 1, 0.7],
        scale: [0.98, 1.02, 0.98],
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const glowPulseVariant = shouldReduceMotion
    ? { opacity: 0.5 }
    : {
        opacity: [0.4, 0.8, 0.4],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-4">
      {/* Background Radial Glow Aura */}
      <motion.div
        animate={glowPulseVariant}
        className="absolute inset-0 bg-gradient-radial from-cyan-500/30 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Glass Container */}
      <div className="relative w-full h-full rounded-3xl bg-[#080B14]/80 backdrop-blur-2xl border border-blue-500/30 p-6 flex flex-col items-center justify-center shadow-2xl shadow-blue-900/30 overflow-hidden group">
        {/* Subtle Background Circuit Dot-Grid Texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 229, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Display Actual Brand Logo Image as Background Accent */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/images/cortex-logo.jpeg"
            alt="Cortex Core Group Official Brand Logo"
            width={500}
            height={500}
            priority
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(0,136,255,0.6)] group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Interactive Glowing Animated SVG Overlay Matching Logo Geometry */}
          <svg
            viewBox="0 0 500 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#0072FF" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left-Side Circuit Trace Light Pulses */}
            {!shouldReduceMotion && (
              <>
                <motion.circle
                  cx="120"
                  cy="170"
                  r="4"
                  fill="#00F0FF"
                  filter="url(#neonGlow)"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                  cx="100"
                  cy="200"
                  r="4"
                  fill="#00F0FF"
                  filter="url(#neonGlow)"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="110"
                  cy="235"
                  r="4"
                  fill="#00F0FF"
                  filter="url(#neonGlow)"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <motion.circle
                  cx="130"
                  cy="270"
                  r="4"
                  fill="#00F0FF"
                  filter="url(#neonGlow)"
                  animate={{ opacity: [0.8, 0.2, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />

                {/* Right-Side Network Constellation Node Glows */}
                <motion.circle
                  cx="375"
                  cy="135"
                  r="5"
                  fill="#00E5FF"
                  filter="url(#neonGlow)"
                  animate={pulseVariant}
                />
                <motion.circle
                  cx="410"
                  cy="190"
                  r="5"
                  fill="#0072FF"
                  filter="url(#neonGlow)"
                  animate={pulseVariant}
                />
                <motion.circle
                  cx="380"
                  cy="245"
                  r="5"
                  fill="#00F0FF"
                  filter="url(#neonGlow)"
                  animate={pulseVariant}
                />

                {/* Center Cloud Core Pulse */}
                <motion.circle
                  cx="250"
                  cy="200"
                  r="25"
                  fill="#00F0FF"
                  opacity="0.15"
                  filter="url(#neonGlow)"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "250px 200px" }}
                />
              </>
            )}
          </svg>
        </div>

        {/* Floating Glass Badges */}
        <div className="absolute top-4 left-4 bg-[#0A0D1A]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono font-semibold text-cyan-300">
            OFFICIAL BRAND LOGO
          </span>
        </div>

        <div className="absolute bottom-4 right-4 bg-[#0A0D1A]/90 backdrop-blur-md border border-blue-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
          <span className="text-[11px] font-mono font-semibold text-blue-300">
            POWERING INTELLIGENT INNOVATION
          </span>
        </div>
      </div>
    </div>
  );
};
