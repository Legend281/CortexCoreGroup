"use client";

import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CanvasParticles } from "@/components/ui/CanvasParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { BookOpen, Cpu, Code2, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const BlogHero: React.FC = () => {
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
              TECHNICAL PUBLICATIONS & RESEARCH
            </Pill>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans"
          >
            Engineering Insights, System Design &{" "}
            <span className="text-gradient">AI Research.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-xl text-text-secondary max-w-3xl leading-relaxed"
          >
            Deep dives into sub-15ms edge architectures, RAG memory pipelines, cloud cost optimization, and modern product design written by our studio engineers.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <a href="#blog-grid">
                <Button variant="primary" size="lg" showArrow className="shadow-glow-purple">
                  Explore Articles
                </Button>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="#newsletter">
                <Button variant="secondary" size="lg">
                  Subscribe to Monthly Notes
                </Button>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Reader Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-3 gap-6 w-full max-w-xl bg-surface/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="text-center p-2">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                <AnimatedStat value={6} suffix=" Active" />
              </span>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                Technical Guides
              </span>
            </div>

            <div className="text-center p-2 border-l border-white/10">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                <AnimatedStat value={15} suffix="K+" />
              </span>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                Monthly Readers
              </span>
            </div>

            <div className="text-center p-2 border-l border-white/10">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                <AnimatedStat value={100} suffix="%" />
              </span>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                Production Code
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
