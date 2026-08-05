"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { Rocket, Users, ShieldAlert, CheckCircle2, Clock, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const MODELS = [
  {
    number: "01",
    title: "End-to-End Product Build",
    tagline: "0 to 1 Dedicated Product Squad",
    description:
      "A complete cross-functional team (Tech Lead, Senior Fullstack Devs, AI Engineer, UI/UX Designer) delivering your product from discovery to launch with 100% client IP ownership.",
    highlights: [
      "Bi-weekly sprint demos & live staging links",
      "Sub-15ms edge performance SLAs",
      "Full GitHub source code & documentation transfer",
    ],
    icon: Rocket,
    accentColor: "accent-purple",
    badge: "MOST POPULAR",
  },
  {
    number: "02",
    title: "Dedicated Team Augmentation",
    tagline: "Senior Engineers On-Demand in 48 Hours",
    description:
      "Scale your existing engineering organization instantly with senior TypeScript, Python, Go, and DevOps engineers who integrate seamlessly into your Jira & Slack workflows.",
    highlights: [
      "Onboarded within 48 hours of agreement",
      "Overlapping working hours & fluent English",
      "Zero recruitment overhead or long-term lock-in",
    ],
    icon: Users,
    accentColor: "accent-blue",
    badge: "AGILE FLEXIBILITY",
  },
  {
    number: "03",
    title: "Strategic Architecture Audit",
    tagline: "High-Impact Performance & Security Sprint",
    description:
      "A 2-week intensive diagnostic sprint where our principal architects audit your cloud infrastructure, database queries, security posture, and code bottlenecks.",
    highlights: [
      "Comprehensive benchmark & security vulnerability report",
      "Database index & API latency optimization plan",
      "Estimated 30-50% cloud cost reduction roadmap",
    ],
    icon: ShieldAlert,
    accentColor: "accent-cyan",
    badge: "2-WEEK SPRINT",
  },
];

export const ServicesProcess: React.FC = () => {
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
          eyebrow="ENGAGEMENT MODELS"
          title="Flexible Ways We Partner with Your Team"
          gradientWord="Partner"
          description="Select the delivery model that fits your product stage, timeline, and engineering bandwidth."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {MODELS.map((m) => {
            const IconComp = m.icon;
            return (
              <motion.div key={m.number} variants={itemVariants}>
                <SpotlightCard className="p-8 h-full bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 flex items-center justify-center text-white group-hover:bg-accent-purple/20 transition-all">
                        <IconComp className="w-6 h-6 text-accent-purple" />
                      </div>
                      <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                        {m.badge}
                      </Pill>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent-purple transition-colors">
                      {m.title}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-accent-cyan uppercase tracking-wider block mb-4">
                      {m.tagline}
                    </span>

                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {m.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-6">
                      {m.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-white font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Fast Onboarding
                    </span>
                    <span className="text-accent-purple font-semibold">100% IP Ownership</span>
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
