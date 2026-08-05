"use client";

import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CanvasParticles } from "@/components/ui/CanvasParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Sparkles, Code2, Cpu, Cloud, ShieldCheck, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const ServicesHero: React.FC = () => {
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
    <section className="relative min-h-[70vh] flex items-center pt-16 pb-20 overflow-hidden bg-[#06060E]">
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
              FULL SERVICES CATALOG & CAPABILITIES
            </Pill>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans"
          >
            End-to-End Technology Capabilities.{" "}
            <span className="text-gradient">Engineered for Scale.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-xl text-text-secondary max-w-3xl leading-relaxed"
          >
            From custom full-stack software and mobile applications to cloud infrastructure, cybersecurity, and generative AI — we architect digital products that define industries.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <a href="#services-catalog">
                <Button variant="primary" size="lg" showArrow className="shadow-glow-purple">
                  Explore 16 Capabilities
                </Button>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="#scope-estimator">
                <Button variant="secondary" size="lg">
                  Calculate Project Scope
                </Button>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Service Category Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/10 w-full"
          >
            <div className="flex items-center gap-2 bg-surface/50 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-white">
              <Code2 className="w-3.5 h-3.5 text-accent-purple" />
              <span>Full-Stack Web & SaaS</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-white">
              <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Generative AI & Data</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-white">
              <Cloud className="w-3.5 h-3.5 text-accent-blue" />
              <span>Cloud & DevOps</span>
            </div>
            <div className="flex items-center gap-2 bg-surface/50 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cybersecurity & Audits</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
