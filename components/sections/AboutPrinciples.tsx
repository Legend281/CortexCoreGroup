"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { Cpu, ShieldCheck, UserCheck, Zap, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const PRINCIPLES = [
  {
    number: "01",
    title: "AI-First Architecture",
    tagline: "Intelligent Systems from Day One",
    description:
      "We design software architectures that natively leverage generative AI, RAG memory pipelines, and machine learning models — embedding intelligence directly into business workflows.",
    icon: Cpu,
    color: "accent-purple",
    borderColor: "border-accent-purple/30",
    bgGradient: "from-accent-purple/15 to-transparent",
  },
  {
    number: "02",
    title: "Uncompromising Security & SLAs",
    tagline: "Sub-15ms Speed & Zero Downtime",
    description:
      "Every system we engineer is built on SOC2/HIPAA-ready security foundations, automated CI/CD deployment pipelines, and high-availability cloud infrastructure.",
    icon: ShieldCheck,
    color: "accent-blue",
    borderColor: "border-accent-blue/30",
    bgGradient: "from-accent-blue/15 to-transparent",
  },
  {
    number: "03",
    title: "Human-Centered Product Craft",
    tagline: "Intuitive UI & Micro-Animations",
    description:
      "We believe high-performance software must also be visually stunning and effortless to navigate. We combine 2026 design engineering principles with responsive micro-physics.",
    icon: UserCheck,
    color: "emerald-400",
    borderColor: "border-emerald-500/30",
    bgGradient: "from-emerald-500/15 to-transparent",
  },
  {
    number: "04",
    title: "Relentless Engineering Iteration",
    tagline: "Agile Sprints & Transparent Code",
    description:
      "We work in bi-weekly agile sprints with bi-weekly live demos, continuous code reviews, and transparent GitHub repositories — keeping our clients completely in sync.",
    icon: Zap,
    color: "amber-400",
    borderColor: "border-amber-500/30",
    bgGradient: "from-amber-500/15 to-transparent",
  },
];

export const AboutPrinciples: React.FC = () => {
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section className="py-24 relative bg-[#06060E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="OUR PILLARS"
          title="The Engineering Principles That Drive Us"
          gradientWord="Principles"
          description="Four non-negotiable standards behind every product, API, and platform we ship."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PRINCIPLES.map((p) => {
            const IconComp = p.icon;
            return (
              <motion.div key={p.number} variants={itemVariants}>
                <SpotlightCard
                  className={`p-8 h-full bg-gradient-to-br ${p.bgGradient} bg-surface/50 border ${p.borderColor} backdrop-blur-xl rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6 text-accent-purple" />
                      </div>
                      <span className="text-xl font-mono font-bold text-text-secondary">
                        {p.number}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent-purple transition-colors">
                      {p.title}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-accent-cyan uppercase tracking-wider block mb-4">
                      {p.tagline}
                    </span>

                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cortex Standard Verified</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
