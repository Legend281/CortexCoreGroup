"use client";

import React, { useState, useEffect } from "react";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CanvasParticles } from "@/components/ui/CanvasParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Clock, ShieldCheck, Mail, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const ContactHero: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(" ")[4] + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section className="relative min-h-[65vh] flex items-center pt-16 pb-16 overflow-hidden bg-[#06060E]">
      {/* 60fps Interactive HTML5 Canvas Constellation Background */}
      <CanvasParticles />

      {/* Ambient Background Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-radial-purple opacity-40 pointer-events-none blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-radial-blue opacity-30 pointer-events-none blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div variants={itemVariants}>
            <Pill variant="eyebrow" className="mb-6">
              START A CONVERSATION
            </Pill>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans"
          >
            Let&apos;s Build Something{" "}
            <span className="text-gradient">Industry-Defining.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-xl text-text-secondary max-w-3xl leading-relaxed"
          >
            Have an ambitious product vision, system architecture query, or team scope request? Our technical leads respond within 12–24 hours guaranteed.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <a href="#inquiry-form">
                <Button variant="primary" size="lg" showArrow className="shadow-glow-purple">
                  Submit Project Scope
                </Button>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="#hubs">
                <Button variant="secondary" size="lg">
                  View Global Office Hubs
                </Button>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Operational Status Ticker */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 bg-surface/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-xs font-mono"
          >
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Studio Status: Accepting New Projects</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Clock className="w-3.5 h-3.5 text-accent-purple" />
              <span>{utcTime || "16:47:00 UTC"}</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-accent-cyan">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SLA Response: &lt;12 Hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
