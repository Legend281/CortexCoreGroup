"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Cpu, Sparkles, UserCheck, Zap, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const AboutTeaser: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"craft" | "ai">("craft");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 relative bg-[#070712] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
          className="relative rounded-3xl bg-gradient-to-br from-surface/90 via-surface/40 to-surface/90 border border-accent-purple/30 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Ambient Radial Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial-purple opacity-40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial-blue opacity-30 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Content & Vision */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <Pill variant="eyebrow" className="mb-6">
                OUR PHILOSOPHY
              </Pill>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
                Human Craft Meets <span className="text-gradient">AI Intelligence</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
                Cortex Core Group bridges deep software engineering craft with cutting-edge AI acceleration. We don&apos;t just write code — we engineer intelligent digital platforms designed for enterprise scale and real-world impact.
              </p>

              {/* Tab Selector Buttons */}
              <div className="mt-8 flex items-center gap-3 p-1.5 bg-surface/80 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab("craft")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === "craft"
                      ? "bg-accent-purple text-white shadow-glow-purple"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Human Engineering Craft</span>
                </button>

                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === "ai"
                      ? "bg-accent-cyan text-black shadow"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>AI Engine Acceleration</span>
                </button>
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button variant="primary" size="lg" showArrow className="active:scale-95 transition-transform shadow-glow-purple">
                    Explore Our Story
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Dual-Core Interactive Showcase */}
            <div className="lg:col-span-6">
              <SpotlightCard className="p-8 bg-[#080A18]/90 border border-white/15 rounded-2xl shadow-2xl">
                {activeTab === "craft" ? (
                  <motion.div
                    key="craft"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-purple">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Human Engineering Craft</h4>
                        <span className="text-xs font-mono text-accent-purple">PRECISION & ARCHITECTURE</span>
                      </div>
                    </div>
                    <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                      <li className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Senior system architecture & zero-downtime database design</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Human-centric UI/UX design systems tuned for high conversion</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Strict code quality, security compliance & automated testing</span>
                      </li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">AI Engine Acceleration</h4>
                        <span className="text-xs font-mono text-accent-cyan">INTELLIGENCE & SPEED</span>
                      </div>
                    </div>
                    <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                      <li className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-accent-cyan shrink-0" />
                        <span>Custom LLM fine-tuning, RAG pipelines & agent orchestration</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-accent-cyan shrink-0" />
                        <span>Real-time predictive analytics & automated decision engines</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-accent-cyan shrink-0" />
                        <span>AI-assisted CI/CD code optimization & sub-15ms edge inference</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </SpotlightCard>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
