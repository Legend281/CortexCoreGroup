"use client";

import React, { useState, useEffect } from "react";
import { Pill } from "@/components/ui/Pill";
import { Cpu, Terminal, Activity, Zap, CheckCircle2, Play, RefreshCw } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export const InteractiveSystemSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"arch" | "api" | "metrics">("arch");
  const [latency, setLatency] = useState(12);
  const [requests, setRequests] = useState(1420);
  const shouldReduceMotion = useReducedMotion();

  // Real-time metric ticker simulation
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setLatency(Math.floor(10 + Math.random() * 5));
      setRequests((prev) => prev + Math.floor(Math.random() * 8 + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="w-full rounded-2xl bg-[#090C18]/90 border border-blue-500/30 backdrop-blur-xl p-5 shadow-2xl shadow-blue-950/40 text-left overflow-hidden group">
      {/* Sandbox Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-text-secondary ml-2 font-medium">
            cortex-engine // live-demo
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-surface/60 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab("arch")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all ${
              activeTab === "arch"
                ? "bg-accent-purple text-white shadow"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" /> Architecture
            </span>
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all ${
              activeTab === "api"
                ? "bg-accent-purple text-white shadow"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3" /> AI API
            </span>
          </button>

          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all ${
              activeTab === "metrics"
                ? "bg-accent-purple text-white shadow"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3" /> Metrics
            </span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === "arch" && (
          <motion.div
            key="arch"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="py-2"
          >
            <div className="grid grid-cols-3 gap-3 items-center text-center">
              <div className="p-3 rounded-xl bg-surface/80 border border-white/10 flex flex-col items-center">
                <span className="text-[10px] font-mono text-accent-cyan mb-1">CLIENT GATEWAY</span>
                <span className="text-xs font-bold text-white">Next.js Edge</span>
                <span className="text-[9px] text-emerald-400 font-mono mt-1">200 OK</span>
              </div>

              <div className="relative p-3 rounded-xl bg-surface/80 border border-accent-purple/40 flex flex-col items-center shadow-glow-purple">
                <span className="text-[10px] font-mono text-accent-purple mb-1">AI CORE ENGINE</span>
                <span className="text-xs font-bold text-white">Cortex Mesh</span>
                <span className="text-[9px] text-accent-purple font-mono mt-1">Processing</span>
              </div>

              <div className="p-3 rounded-xl bg-surface/80 border border-white/10 flex flex-col items-center">
                <span className="text-[10px] font-mono text-blue-400 mb-1">DATA VECTOR DB</span>
                <span className="text-xs font-bold text-white">Supabase / Pg</span>
                <span className="text-[9px] text-emerald-400 font-mono mt-1">Synced</span>
              </div>
            </div>

            {/* Connecting Flow Lines */}
            <div className="mt-3 flex items-center justify-between px-6 text-[10px] font-mono text-text-secondary border-t border-white/10 pt-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Pipeline Active
              </span>
              <span>Sub-15ms Latency</span>
            </div>
          </motion.div>
        )}

        {activeTab === "api" && (
          <motion.div
            key="api"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-text-secondary leading-relaxed bg-[#050711] p-3 rounded-xl border border-white/10"
          >
            <div className="text-emerald-400">$ POST https://api.cortexcoregroup.com/v1/synthesize</div>
            <div className="text-white/60 mt-1">
              {"{"} &quot;model&quot;: &quot;cortex-ai-v2&quot;, &quot;stream&quot;: true {"}"}
            </div>
            <div className="text-accent-cyan mt-2">
              &gt; HTTP/2 200 OK [12ms] <br />
              &gt; Status: Synthesis Completed successfully.
            </div>
          </motion.div>
        )}

        {activeTab === "metrics" && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10 text-center">
              <span className="text-[10px] font-mono text-text-secondary block">EDGE LATENCY</span>
              <span className="text-lg font-bold font-mono text-emerald-400">{latency}ms</span>
            </div>
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10 text-center">
              <span className="text-[10px] font-mono text-text-secondary block">REQ / MIN</span>
              <span className="text-lg font-bold font-mono text-accent-cyan">{requests}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface/80 border border-white/10 text-center">
              <span className="text-[10px] font-mono text-text-secondary block">UPTIME SLA</span>
              <span className="text-lg font-bold font-mono text-accent-purple">99.99%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
