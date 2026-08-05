"use client";

import React, { useState, useEffect } from "react";
import { GitCommit, Activity, CheckCircle2, ShieldCheck, Cpu, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COMMITS = [
  {
    author: "Randy Ojong",
    role: "Lead Full Stack Dev",
    message: "merged PR #142: Sub-15ms Edge API Routing & Middleware Cache",
    time: "12 mins ago",
    type: "FEATURE",
    icon: Code2,
  },
  {
    author: "Brenda Ngang",
    role: "CTO",
    message: "deployed terraform module: AWS ECS cluster autoscale policy",
    time: "45 mins ago",
    type: "INFRASTRUCTURE",
    icon: ShieldCheck,
  },
  {
    author: "Martin Ndifon",
    role: "AI Engineer",
    message: "updated vector store index: RAG memory pipeline embedding v3.0",
    time: "2 hours ago",
    type: "AI DEPLOYMENT",
    icon: Cpu,
  },
  {
    author: "David Takor",
    role: "Head of Design",
    message: "pushed Figma tokens: 2026 glassmorphism component library",
    time: "4 hours ago",
    type: "DESIGN SYSTEM",
    icon: Activity,
  },
];

export const TeamActivity: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % COMMITS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = COMMITS[activeIdx];
  const IconComp = current.icon;

  return (
    <div className="w-full bg-[#040612] border-y border-white/10 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-emerald-400 font-bold shrink-0">
          <GitCommit className="w-4 h-4 animate-spin-slow text-accent-cyan" />
          <span className="uppercase tracking-wider">LIVE STUDIO VELOCITY:</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-text-secondary truncate text-center sm:text-left"
          >
            <span className="text-white font-bold">{current.author}</span>
            <span className="text-accent-purple font-semibold">[{current.role}]</span>
            <span className="text-white/80 hidden md:inline">{current.message}</span>
            <span className="text-[10px] text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-full border border-accent-cyan/30">
              {current.time}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>99.99% Build SLA</span>
        </div>
      </div>
    </div>
  );
};
