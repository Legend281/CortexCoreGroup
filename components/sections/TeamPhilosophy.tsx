"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const QUOTES = [
  {
    quote:
      "We don't ship minimum viable products. We ship sub-15ms enterprise platforms engineered for long-term scalability and security.",
    author: "Randy Ojong",
    role: "Founder & Lead Fullstack Dev",
    initials: "RO",
    color: "from-purple-600 to-indigo-600",
  },
  {
    quote:
      "Zero-downtime architecture and automated CI/CD aren't nice-to-have goals — they are our baseline requirement for every client deployment.",
    author: "Precious Acha",
    role: "CTO & Infrastructure Lead",
    initials: "PA",
    color: "from-blue-600 to-cyan-500",
  },
  {
    quote:
      "UI polish and micro-physics are invisible until they're missing. We obsess over every pixel, transition, and spring animation.",
    author: "Mai Randy",
    role: "Head of Product Design",
    initials: "MR",
    color: "from-pink-600 to-purple-600",
  },
  {
    quote:
      "Agile speed only works when paired with transparent communication. We keep our clients synchronized through bi-weekly live staging demos.",
    author: "Ngum Caleb",
    role: "Agile Delivery Lead",
    initials: "NC",
    color: "from-emerald-600 to-teal-500",
  },
];

export const TeamPhilosophy: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = QUOTES[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % QUOTES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  return (
    <section className="py-24 relative bg-[#070712] border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="OUR PHILOSOPHY"
          title="Insights From Our Engineering Leadership"
          gradientWord="Leadership"
          description="The core values and technical principles that guide how we build software."
          align="center"
        />

        <SpotlightCard className="p-8 sm:p-12 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
          <Quote className="w-16 h-16 text-accent-purple/20 absolute top-6 right-6 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -25 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0`}>
                  {current.initials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{current.author}</h4>
                  <p className="text-xs text-accent-purple font-mono font-semibold">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <div className="flex gap-2">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIdx ? "bg-accent-purple w-8" : "bg-white/20 w-2"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:border-accent-purple active:scale-95 transition-all"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white hover:border-accent-purple active:scale-95 transition-all"
                aria-label="Next quote"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
