"use client";

import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CanvasParticles } from "@/components/ui/CanvasParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { GlobalHubRadar } from "@/components/ui/GlobalHubRadar";
import { Sparkles, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const AboutHero: React.FC = () => {
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
    <section className="relative min-h-[80vh] flex items-center pt-12 pb-20 overflow-hidden bg-[#06060E]">
      {/* 60fps Interactive HTML5 Canvas Constellation Node Background */}
      <CanvasParticles />

      {/* Ambient Background Radial Glows */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial-purple opacity-40 pointer-events-none blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-radial-blue opacity-30 pointer-events-none blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Copy, Magnetic CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.div variants={itemVariants}>
              <Pill variant="eyebrow" className="mb-6">
                ABOUT CORTEX CORE GROUP
              </Pill>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans text-left"
            >
              Engineering the Next Generation of{" "}
              <span className="text-gradient">Intelligent Digital Products.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed text-left"
            >
              We are Cortex Core Group — a technology studio bridging human strategy, software craft, and AI intelligence to architect, build, and scale enterprise digital systems worldwide.
            </motion.p>

            {/* Magnetic CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link href="/our-work">
                  <Button variant="primary" size="lg" showArrow className="shadow-glow-purple">
                    Explore Our Work
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Book a Free Consultation
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Trust Stats Bar */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full bg-surface/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="text-center p-2">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                  <AnimatedStat value={50} suffix="+" />
                </span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  Projects Shipped
                </span>
              </div>

              <div className="text-center p-2 border-l border-white/10">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                  <AnimatedStat value={30} suffix="+" />
                </span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  Global Clients
                </span>
              </div>

              <div className="text-center p-2 border-l border-white/10">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                  <AnimatedStat value={99.9} suffix="%" decimals={1} />
                </span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  Satisfaction
                </span>
              </div>

              <div className="text-center p-2 border-l border-white/10">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono block">
                  <AnimatedStat value={15} prefix="<" suffix="ms" />
                </span>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
                  Edge Latency
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Global Hub Radar Widget */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative"
          >
            <GlobalHubRadar />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
