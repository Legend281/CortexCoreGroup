"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { Zap, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const METRICS = [
  {
    value: 70,
    suffix: "%",
    label: "Faster Page Load Speed",
    subtext: "Avg optimization across client web apps",
    icon: Zap,
    color: "accent-purple",
  },
  {
    value: 99.99,
    suffix: "%",
    decimals: 2,
    label: "Cloud Uptime SLA",
    subtext: "Zero un-planned downtime benchmarks",
    icon: ShieldCheck,
    color: "emerald-400",
  },
  {
    value: 15,
    prefix: "<",
    suffix: "ms",
    label: "Edge API Latency",
    subtext: "Sub-second global response SLA",
    icon: Clock,
    color: "accent-cyan",
  },
  {
    value: 180,
    prefix: "+",
    suffix: "%",
    label: "Client Revenue Growth",
    subtext: "Average 12-month post-launch conversion",
    icon: TrendingUp,
    color: "amber-400",
  },
];

export const OurWorkMetrics: React.FC = () => {
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
          eyebrow="ENGINEERING BENCHMARKS"
          title="Measurable Business & Technological Impact"
          gradientWord="Impact"
          description="Proven performance metrics achieved across our digital product deliverables."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {METRICS.map((m) => {
            const IconComp = m.icon;
            return (
              <motion.div key={m.label} variants={itemVariants}>
                <SpotlightCard className="p-8 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl text-center group hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 flex items-center justify-center text-accent-purple mx-auto mb-6 group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-3xl sm:text-4xl font-bold font-mono text-white block mb-2">
                      <AnimatedStat
                        value={m.value}
                        prefix={m.prefix || ""}
                        suffix={m.suffix || ""}
                        decimals={m.decimals || 0}
                      />
                    </span>

                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-accent-purple transition-colors">
                      {m.label}
                    </h4>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      {m.subtext}
                    </p>
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
