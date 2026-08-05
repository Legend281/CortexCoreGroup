"use client";

import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroVariantB: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-accent-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-purple/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & Buttons */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <Pill variant="eyebrow" className="mb-6">
            INNOVATE. AUTOMATE. ELEVATE
          </Pill>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans">
            We Build Smart Tech Solutions for a{" "}
            <span className="text-gradient">Smarter Future</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
            Cortex Core Group helps businesses transform ideas into intelligent digital experiences through innovation, creativity, and the power of AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/our-work">
              <Button variant="primary" size="lg" showArrow>
                Explore Our Work
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg" showArrow>
                Our Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Abstract 3D Cloud Network Visualization */}
        <div className="lg:col-span-5 relative flex justify-center z-10">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* Outer Glowing Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-accent-purple/40"
            />
            {/* Middle Glowing Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-accent-blue/30"
            />

            {/* Central Cloud / Network Node Icon */}
            <div className="relative w-36 h-36 rounded-full bg-surface border border-accent-purple/50 shadow-glow-purple flex items-center justify-center">
              <Cpu className="w-16 h-16 text-accent-purple animate-pulse" />
            </div>

            {/* Orbiting Tech Nodes */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 bg-surface/90 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-magenta" />
              <span>AI Driven</span>
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-2 bg-surface/90 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
              <span>Cloud Native</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
