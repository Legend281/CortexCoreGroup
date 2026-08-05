"use client";

import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CanvasParticles } from "@/components/ui/CanvasParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { Sparkles, Users, Award, ShieldCheck, Globe, Cpu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const TeamHero: React.FC = () => {
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
              OUR ENGINEERING DIRECTORY
            </Pill>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans"
          >
            The Architects, Engineers &{" "}
            <span className="text-gradient">Designers Behind Cortex.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-xl text-text-secondary max-w-3xl leading-relaxed"
          >
            A multi-disciplinary team of senior software architects, AI researchers, cloud engineers, and UI/UX designers building high-performance digital products worldwide.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <a href="#team-directory">
                <Button variant="primary" size="lg" showArrow className="shadow-glow-purple">
                  Explore Team Directory
                </Button>
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Book a Team Consultation
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Team Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full bg-surface/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
          >
            <div className="text-center p-3">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono block">
                <AnimatedStat value={15} suffix="+" />
              </span>
              <span className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                Core Specialists
              </span>
            </div>

            <div className="text-center p-3 border-l border-white/10">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono block">
                <AnimatedStat value={5} suffix="+ Yrs" />
              </span>
              <span className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                Avg Experience
              </span>
            </div>

            <div className="text-center p-3 border-l border-white/10">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono block">
                <AnimatedStat value={3} suffix=" Hubs" />
              </span>
              <span className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                Global Network
              </span>
            </div>

            <div className="text-center p-3 border-l border-white/10">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono block">
                <AnimatedStat value={100} suffix="%" />
              </span>
              <span className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                TypeScript & AI First
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
