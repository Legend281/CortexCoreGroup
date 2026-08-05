"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { Cpu, Users, Globe, Zap, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const CULTURE_PILLARS = [
  {
    number: "01",
    title: "Autonomous Feature Ownership",
    tagline: "End-to-End Responsibility",
    description:
      "Engineers at Cortex aren't ticket-takers. Every engineer owns complete micro-services and user journeys from architecture design to production monitoring.",
    icon: Zap,
    badge: "ENGINEERING FREEDOM",
  },
  {
    number: "02",
    title: "Continuous AI & Sandbox R&D",
    tagline: "Weekly Tech Talks & Open Source",
    description:
      "We allocate dedicated engineering time every week for fine-tuning LLMs, building custom RAG prototypes, and experimenting with 2026 web capabilities.",
    icon: Cpu,
    badge: "10% INNOVATION TIME",
  },
  {
    number: "03",
    title: "Async-First & GitHub Transparency",
    tagline: "Code Reviews & Bi-Weekly Demos",
    description:
      "Our communication is built on clean pull requests, thorough architecture design docs, and automated CI/CD checks — ensuring full client visibility.",
    icon: Terminal,
    badge: "TRANSPARENT SPRINT",
  },
  {
    number: "04",
    title: "Global Remote Hubs & Balance",
    tagline: "Douala HQ // London // New York",
    description:
      "We collaborate across continents with flexible working hours, clear boundaries, and a culture that prioritizes deep focus over constant meetings.",
    icon: Globe,
    badge: "24/7 GLOBAL COVERAGE",
  },
];

export const TeamCulture: React.FC = () => {
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
          eyebrow="ENGINEERING CULTURE"
          title="How We Work & Innovate Together"
          gradientWord="Innovate"
          description="Four culture pillars that enable our team to build high-performance software at scale."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {CULTURE_PILLARS.map((p) => {
            const IconComp = p.icon;
            return (
              <motion.div key={p.number} variants={itemVariants}>
                <SpotlightCard className="p-8 h-full bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 flex items-center justify-center text-white group-hover:bg-accent-purple/20 transition-all">
                        <IconComp className="w-6 h-6 text-accent-purple" />
                      </div>
                      <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                        {p.badge}
                      </Pill>
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
                    <span>Cortex Culture Standard</span>
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
