"use client";

import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { CanvasParticles } from "@/components/ui/CanvasParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InteractiveSystemSandbox } from "@/components/ui/InteractiveSystemSandbox";
import { Lightbulb, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const HeroVariantA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center pt-4 sm:pt-8 pb-12 sm:pb-16 overflow-hidden bg-[#06060E]">
      {/* 60fps Interactive Canvas Constellation Background */}
      <CanvasParticles />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-radial-purple opacity-40 pointer-events-none blur-[100px] sm:blur-[120px]" />
      <div className="absolute top-1/2 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-radial-blue opacity-25 pointer-events-none blur-[80px] sm:blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Content + Magnetic CTAs + Trust Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col items-start"
        >
          <motion.div variants={itemVariants}>
            <Pill variant="eyebrow" className="mb-4 sm:mb-6 text-[10px] sm:text-xs">
              INTELLIGENT TECHNOLOGY & CONSULTING
            </Pill>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.08] font-sans"
          >
            Smart <span className="text-gradient">Solutions.</span>
            <br />
            Real <span className="text-gradient">Impact.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-sm sm:text-lg text-text-secondary max-w-xl leading-relaxed"
          >
            We architect, build and scale custom software platforms, AI systems, and cloud infrastructure that drive enterprise innovation and measurable growth.
          </motion.p>

          {/* CTAs - Stacked full-width on mobile, side-by-side on tablet/desktop */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <div className="w-full sm:w-auto">
              <Link href="/contact" className="block w-full">
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full sm:w-auto text-xs sm:text-base shadow-glow-purple font-bold py-3.5 sm:py-4 active:scale-95"
                >
                  Book a Free Consultation
                </Button>
              </Link>
            </div>

            <div className="w-full sm:w-auto">
              <Link href="/our-work" className="block w-full">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-xs sm:text-base py-3.5 sm:py-4 active:scale-95">
                  Explore Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 3 Inline Feature Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-5 pt-5 sm:pt-6 border-t border-white/10 w-full"
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-purple shrink-0">
                <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span>AI-First Architecture</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center text-accent-blue shrink-0">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span>High Scalability</span>
            </div>
          </motion.div>

          {/* Trust Stats Strip */}
          <motion.div
            variants={itemVariants}
            className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md bg-surface/40 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10"
          >
            <div className="text-center">
              <span className="text-lg sm:text-2xl font-bold text-white font-mono block">
                <AnimatedStat value={50} suffix="+" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                Projects
              </span>
            </div>
            <div className="text-center border-x border-white/10">
              <span className="text-lg sm:text-2xl font-bold text-white font-mono block">
                <AnimatedStat value={30} suffix="+" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                Clients
              </span>
            </div>
            <div className="text-center">
              <span className="text-lg sm:text-2xl font-bold text-white font-mono block">
                <AnimatedStat value={99.9} suffix="%" decimals={1} />
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                Satisfaction
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive System Sandbox (Primary Hero Visual) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-6 relative w-full"
        >
          <InteractiveSystemSandbox />
        </motion.div>
      </div>
    </section>
  );
};
