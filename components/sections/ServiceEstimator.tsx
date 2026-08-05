"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Calculator, ArrowRight, CheckCircle2, Cpu, Code2, Smartphone, Cloud, Users, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const CATEGORIES = [
  { id: "web", name: "Web App / SaaS", icon: Code2, baseSprints: 4 },
  { id: "ai", name: "AI & LLM Integration", icon: Cpu, baseSprints: 3 },
  { id: "mobile", name: "Mobile Application", icon: Smartphone, baseSprints: 5 },
  { id: "cloud", name: "Cloud & Migration", icon: Cloud, baseSprints: 2 },
];

const SCALES = [
  { id: "mvp", name: "MVP Prototype", multiplier: 1, team: "1 Lead Dev + 1 UI/UX Designer" },
  { id: "scale", name: "Scale-Up Growth", multiplier: 1.5, team: "2 Fullstack Devs + 1 AI Specialist + 1 UI/UX" },
  { id: "enterprise", name: "Enterprise System", multiplier: 2.2, team: "3 Fullstack Devs + 1 Cloud Architect + 1 AI Lead + 1 PM" },
];

const TIMELINES = [
  { id: "fast", name: "Expedited (4-6 Wks)", factor: 0.8 },
  { id: "standard", name: "Standard (8-12 Wks)", factor: 1 },
  { id: "ongoing", name: "Ongoing Partnership", factor: 1.5 },
];

export const ServiceEstimator: React.FC = () => {
  const [catId, setCatId] = useState("web");
  const [scaleId, setScaleId] = useState("scale");
  const [timelineId, setTimelineId] = useState("standard");
  const shouldReduceMotion = useReducedMotion();

  const activeCat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];
  const activeScale = SCALES.find((s) => s.id === scaleId) || SCALES[1];
  const activeTimeline = TIMELINES.find((t) => t.id === timelineId) || TIMELINES[1];

  const estimatedSprints = Math.ceil(activeCat.baseSprints * activeScale.multiplier * activeTimeline.factor);
  const estimatedWeeks = estimatedSprints * 2;

  return (
    <section id="scope-estimator" className="py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="LIVE ESTIMATOR WIDGET"
          title="Calculate Your Project Scope & Team Squad"
          gradientWord="Scope & Team"
          description="Configure your project parameters to estimate sprint velocity, team composition, and delivery timeline."
          align="center"
        />

        <SpotlightCard className="p-8 sm:p-12 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: 3-Step Selection Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Category */}
              <div>
                <label className="text-xs font-mono font-bold text-accent-purple uppercase tracking-wider block mb-3">
                  Step 1 — Service Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((c) => {
                    const IconComp = c.icon;
                    const isSel = c.id === catId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCatId(c.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                          isSel
                            ? "bg-accent-purple/20 border-accent-purple text-white shadow-glow-purple"
                            : "bg-[#060814] border-white/10 text-text-secondary hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${isSel ? "text-accent-cyan" : "text-accent-purple"}`} />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Scale */}
              <div>
                <label className="text-xs font-mono font-bold text-accent-purple uppercase tracking-wider block mb-3">
                  Step 2 — Project Scale
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {SCALES.map((s) => {
                    const isSel = s.id === scaleId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setScaleId(s.id)}
                        className={`p-3 rounded-2xl border text-xs font-semibold text-center transition-all ${
                          isSel
                            ? "bg-accent-purple/20 border-accent-purple text-white shadow-glow-purple"
                            : "bg-[#060814] border-white/10 text-text-secondary hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Timeline */}
              <div>
                <label className="text-xs font-mono font-bold text-accent-purple uppercase tracking-wider block mb-3">
                  Step 3 — Desired Launch Speed
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {TIMELINES.map((t) => {
                    const isSel = t.id === timelineId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTimelineId(t.id)}
                        className={`p-3 rounded-2xl border text-xs font-semibold text-center transition-all ${
                          isSel
                            ? "bg-accent-purple/20 border-accent-purple text-white shadow-glow-purple"
                            : "bg-[#060814] border-white/10 text-text-secondary hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Scope Calculation Summary */}
            <div className="lg:col-span-5 bg-[#040612] rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <Calculator className="w-5 h-5 text-accent-cyan" />
                <h4 className="text-lg font-bold text-white">Estimated Project Scope</h4>
              </div>

              {/* Stat Boxes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface/60 border border-white/10">
                  <span className="text-[10px] font-mono text-text-secondary block">ESTIMATED VELOCITY</span>
                  <span className="text-2xl font-mono font-bold text-white block mt-1">
                    {estimatedSprints} <span className="text-xs text-accent-purple">Sprints</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                    ~{estimatedWeeks} Delivery Weeks
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-surface/60 border border-white/10">
                  <span className="text-[10px] font-mono text-text-secondary block">CODE SPRINT DEMOS</span>
                  <span className="text-2xl font-mono font-bold text-accent-cyan block mt-1">
                    {estimatedSprints} <span className="text-xs text-white">Live Demos</span>
                  </span>
                  <span className="text-[10px] text-text-secondary font-mono block mt-1">
                    Bi-Weekly Cadence
                  </span>
                </div>
              </div>

              {/* Recommended Team Squad */}
              <div className="p-4 rounded-2xl bg-surface/60 border border-white/10">
                <span className="text-[10px] font-mono text-text-secondary uppercase block mb-1">
                  RECOMMENDED SQUAD ALLOCATION
                </span>
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent-purple shrink-0" />
                  {activeScale.team}
                </span>
              </div>

              {/* 1-Click Consultation CTA */}
              <Link href={`/contact?service=${activeCat.id}&scale=${activeScale.id}`}>
                <Button variant="primary" size="lg" showArrow className="w-full shadow-glow-purple mt-2">
                  Book Free Scope Consultation
                </Button>
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
