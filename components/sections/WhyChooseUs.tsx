"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Lightbulb, Target, Award, Rocket, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const FEATURES = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We embrace new ideas and cutting-edge technologies to keep your products ahead.",
    iconStyle: "bg-gradient-accent text-white shadow-glow-purple",
    borderColor: "border-accent-purple/30",
  },
  {
    icon: Target,
    title: "Client Focused",
    description: "We build tailored solutions aligned with your unique business goals and strategy.",
    iconStyle: "bg-accent-blue/15 border border-accent-blue/40 text-accent-blue",
    borderColor: "border-accent-blue/30",
  },
  {
    icon: Award,
    title: "Quality Driven",
    description: "We deliver excellence in every detail with rigorous testing and design standards.",
    iconStyle: "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: Rocket,
    title: "Future Ready",
    description: "We create scalable architectures engineered for long-term sustainable growth.",
    iconStyle: "bg-amber-500/15 border border-amber-500/40 text-amber-400",
    borderColor: "border-amber-500/30",
  },
];

export const WhyChooseUs: React.FC = () => {
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
    <section className="py-24 relative bg-[#070712] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="WHY CHOOSE US"
          title="We combine creativity, technology and strategy to build solutions that make an impact."
          gradientWord="impact."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <SpotlightCard
                className={`p-6 text-center flex flex-col items-center group bg-surface/50 backdrop-blur-md border ${feature.borderColor} hover:border-white/30 hover:-translate-y-1.5 transition-all duration-300 shadow-xl h-full justify-between`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 ${feature.iconStyle}`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-1.5 text-[11px] text-text-secondary font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Guaranteed Standard</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
