"use client";

import React from "react";
import { Pill } from "@/components/ui/Pill";
import { motion, useReducedMotion } from "framer-motion";

const BRANDS = [
  "Google",
  "Microsoft",
  "AWS",
  "IBM",
  "Oracle",
  "Meta",
  "Salesforce",
  "Stripe",
  "Vercel",
  "Figma",
];

export const TrustedBrands: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate for seamless loop
  const doubledBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="py-10 border-y border-white/5 bg-[#080810] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary font-semibold">
          Trusted by forward-thinking companies worldwide
        </span>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#080810] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#080810] to-transparent pointer-events-none" />

        <motion.div
          className="flex items-center gap-12 w-max"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {doubledBrands.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center justify-center px-8 py-3 rounded-xl border border-white/5 bg-surface/30 hover:border-white/15 hover:bg-surface/50 transition-all duration-300 select-none shrink-0"
            >
              <span className="text-base font-bold tracking-tight text-white/50 hover:text-white/80 transition-colors font-sans whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
