"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { CheckCircle2, Rocket, Globe, Cpu, Layers, Terminal } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const MILESTONES = [
  {
    year: "2021",
    title: "Origin & Foundations",
    tagline: "Building the Software Engineering Core",
    description:
      "Cortex Core Group was founded as a high-end software development studio, focusing on modern React/Next.js architecture, custom API design, and full-stack engineering excellence.",
    highlights: [
      "Founded in Douala, Cameroon by Randy Ojong",
      "Shipped 10+ web and mobile platforms in Year 1",
      "Established 100% TypeScript codebase standard",
    ],
    icon: Rocket,
    terminalLog: [
      "$ git init cortex-core-group",
      "> Initialized empty Git repository",
      "$ git commit -m 'v1.0.0 Fullstack TypeScript Foundation'",
      "[main 0a1b2c3] 10+ Client Apps Deployed",
    ],
  },
  {
    year: "2023",
    title: "Enterprise & Cloud Expansion",
    tagline: "Scaling Infrastructure & Global Reach",
    description:
      "Expanded our technical capabilities into enterprise cloud infrastructure, DevOps automation, microservices, and cybersecurity audits for clients across Europe and North America.",
    highlights: [
      "Partnered with AWS and Google Cloud ecosystems",
      "Achieved sub-15ms edge API latency benchmarks",
      "Grew engineering team to 10+ full-stack experts",
    ],
    icon: Globe,
    terminalLog: [
      "$ terraform apply --auto-approve",
      "> AWS ECS & Global Edge CDN Provisioned",
      "> Benchmark: Sub-15ms Edge Latency",
      "[SUCCESS] Infrastructure Scaled to 100K+ Daily Requests",
    ],
  },
  {
    year: "2025",
    title: "AI-First Transformation",
    tagline: "Integrating LLMs, Vector Search & RAG",
    description:
      "Pioneered AI-driven software architecture, building custom RAG pipelines, fine-tuned LLM agents, and real-time predictive analytics engines into our client deliverables.",
    highlights: [
      "Deployed proprietary AI inference engine for clients",
      "Integrated vector database memory & RAG pipelines",
      "Increased project delivery speed by 3x using AI workflows",
    ],
    icon: Cpu,
    terminalLog: [
      "$ python -m cortex_ai.vector_store --index pgvector",
      "> RAG Pipeline Initialized [Embedding: 1536-dim]",
      "> Fine-tuning Llama-3 & Gemini Agents",
      "[ACTIVE] AI Orchestration Layer Live",
    ],
  },
  {
    year: "2026",
    title: "Global Innovation Studio",
    tagline: "The Future of Intelligent Software",
    description:
      "Today, Cortex Core Group stands as a premier global technology partner — delivering end-to-end intelligent digital systems, AI automation, and high-conversion products.",
    highlights: [
      "50+ Projects shipped with 99.9% client satisfaction",
      "Serving enterprise clients across 4 continents",
      "Pioneering 2026 design engineering standards",
    ],
    icon: Layers,
    terminalLog: [
      "$ cortex status --global-network",
      "> Douala HQ // London // New York: All Online",
      "> 50+ Projects Active | 99.99% Uptime SLA",
      "[READY] Engineering the Future of Software",
    ],
  },
];

export const AboutTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(3);
  const shouldReduceMotion = useReducedMotion();
  const current = MILESTONES[activeIdx];
  const IconComp = current.icon;

  return (
    <section className="py-24 relative bg-[#070712] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="OUR JOURNEY"
          title="The Evolution of Cortex Core Group"
          gradientWord="Evolution"
          description="From a boutique software consultancy to an international intelligent technology studio."
          align="center"
        />

        {/* Timeline Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {MILESTONES.map((m, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={m.year}
                onClick={() => setActiveIdx(i)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "bg-accent-purple/20 border-accent-purple text-white shadow-glow-purple"
                    : "bg-surface/40 border-white/10 text-text-secondary hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="text-xs font-mono font-bold">{m.year}</span>
                <span className="text-sm font-semibold hidden sm:inline">{m.title}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeTimelineStep"
                    className="absolute inset-0 rounded-2xl border border-accent-purple pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <SpotlightCard
              className="p-8 sm:p-12 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
              innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left: Milestone Metadata */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-mono font-bold text-accent-purple">
                    {current.year}
                  </span>
                  <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                    MILESTONE ERA
                  </Pill>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">{current.title}</h3>
                <p className="text-sm font-semibold text-accent-cyan mb-4 uppercase tracking-wider">
                  {current.tagline}
                </p>

                <p className="text-base text-text-secondary leading-relaxed mb-6">
                  {current.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2.5">
                  {current.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: 3D Parallax MacOS Terminal Window Frame */}
              <div className="lg:col-span-6">
                <TiltCard maxTilt={8}>
                  <div className="rounded-2xl bg-[#050712] border border-white/15 p-5 shadow-2xl font-mono text-xs">
                    {/* Window Controls Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                        <span className="text-[10px] text-text-secondary ml-2 flex items-center gap-1">
                          <Terminal className="w-3 h-3 text-accent-purple" />
                          <span>era-{current.year}.sh</span>
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">RELEASE ACTIVE</span>
                    </div>

                    {/* Simulated Terminal Output */}
                    <div className="space-y-2 text-text-secondary leading-relaxed">
                      {current.terminalLog.map((line, idx) => (
                        <div
                          key={idx}
                          className={
                            line.startsWith("$")
                              ? "text-emerald-400 font-bold"
                              : line.startsWith("[")
                              ? "text-accent-cyan font-bold"
                              : "text-white/80"
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
