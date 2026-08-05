"use client";

import React, { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery & Strategy",
    subtitle: "Understand. Analyze. Plan.",
    description:
      "We start by deeply understanding your business goals, target audience, competitive landscape, and technical requirements. Through workshops, audits, and research, we build a strategic roadmap that aligns technology with your growth objectives.",
    icon: Search,
    deliverables: ["Requirements Document", "Competitive Audit", "Technical Roadmap", "Budget Estimate"],
    color: "accent-purple",
    gradient: "from-purple-600/20 to-indigo-600/20",
    borderColor: "border-purple-500/40",
    iconBg: "bg-purple-500/15",
  },
  {
    number: "02",
    title: "Architecture & Design",
    subtitle: "Design. Prototype. Validate.",
    description:
      "Our designers and architects craft pixel-perfect UI/UX experiences and robust system architectures. Interactive prototypes are shared early for feedback, ensuring alignment before a single line of production code is written.",
    icon: PenTool,
    deliverables: ["UI/UX Mockups", "Interactive Prototype", "System Architecture", "Design System"],
    color: "accent-blue",
    gradient: "from-blue-600/20 to-cyan-600/20",
    borderColor: "border-blue-500/40",
    iconBg: "bg-blue-500/15",
  },
  {
    number: "03",
    title: "Agile Engineering",
    subtitle: "Build. Test. Iterate.",
    description:
      "We engineer production-grade solutions in agile sprints with bi-weekly demos and continuous integration. Every component is rigorously tested, code-reviewed, and performance-optimized before it reaches your users.",
    icon: Code2,
    deliverables: ["Production Codebase", "CI/CD Pipeline", "Automated Testing", "Performance Reports"],
    color: "emerald",
    gradient: "from-emerald-600/20 to-teal-600/20",
    borderColor: "border-emerald-500/40",
    iconBg: "bg-emerald-500/15",
  },
  {
    number: "04",
    title: "Deployment & Scale",
    subtitle: "Launch. Monitor. Grow.",
    description:
      "We deploy to production with zero-downtime strategies, set up real-time monitoring, and provide ongoing optimization. As your user base grows, we scale infrastructure, refine performance, and ship new features continuously.",
    icon: Rocket,
    deliverables: ["Cloud Deployment", "Monitoring Dashboard", "Performance Optimization", "Growth Support"],
    color: "amber",
    gradient: "from-amber-600/20 to-orange-600/20",
    borderColor: "border-amber-500/40",
    iconBg: "bg-amber-500/15",
  },
];

export const HowWeWork: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const step = STEPS[activeStep];
  const StepIcon = step.icon;

  return (
    <section className="py-24 relative bg-[#070712] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial-purple opacity-30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <SectionHeader
          eyebrow="OUR PROCESS"
          title="How We Build World-Class Products"
          gradientWord="World-Class"
          description="A battle-tested 4-phase engineering process that transforms ideas into scalable, revenue-generating digital products."
          align="center"
        />

        {/* Step Navigation Timeline */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {STEPS.map((s, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <React.Fragment key={s.number}>
                <button
                  onClick={() => setActiveStep(i)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 active:scale-95 ${
                    isActive
                      ? `bg-${s.color}/15 ${s.borderColor} text-white shadow-lg`
                      : isPast
                      ? "bg-surface/60 border-white/15 text-white/80"
                      : "bg-surface/30 border-white/8 text-text-secondary hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className={`text-xs font-mono font-bold ${isActive ? `text-white` : "text-text-secondary"}`}>
                    {s.number}
                  </span>
                  <span className="text-sm font-semibold hidden sm:inline">{s.title}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeProcessStep"
                      className={`absolute inset-0 rounded-full ${s.borderColor} border`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>

                {/* Connector Line */}
                {i < STEPS.length - 1 && (
                  <div className={`hidden sm:block w-8 h-px transition-colors duration-300 ${
                    i < activeStep ? "bg-accent-purple" : "bg-white/10"
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Step Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={`relative rounded-3xl bg-gradient-to-br ${step.gradient} border ${step.borderColor} backdrop-blur-xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden`}
          >
            {/* Background Number Watermark */}
            <span className="absolute top-6 right-8 text-[120px] font-mono font-black text-white/[0.03] leading-none select-none pointer-events-none">
              {step.number}
            </span>

            {/* Left: Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${step.iconBg} border ${step.borderColor} flex items-center justify-center`}>
                  <StepIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-text-secondary">{step.number}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{step.title}</h3>
                </div>
              </div>

              <p className="text-sm font-semibold text-accent-purple mb-3 uppercase tracking-wider">
                {step.subtitle}
              </p>

              <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-lg">
                {step.description}
              </p>
            </div>

            {/* Right: Deliverables Checklist */}
            <div className="lg:col-span-5">
              <div className="bg-[#0A0A16]/80 rounded-2xl border border-white/10 p-6">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-4">
                  Key Deliverables
                </h4>
                <ul className="space-y-3">
                  {step.deliverables.map((d, idx) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm text-white font-medium">{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
