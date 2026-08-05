"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Zap,
  TrendingUp,
  Globe,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export interface FeaturedWorkProps {
  projects?: ProjectItem[];
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ projects }) => {
  const list = projects || PROJECTS;
  const featuredProjects = list.slice(0, 2);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section className="py-24 relative bg-[#06060E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="OUR WORK"
          title="Featured Case Studies & Engineering Achievements"
          gradientWord="Achievements"
          description="Explore how we architect scalable platforms that drive enterprise value."
          action={
            <Link href="/our-work">
              <Button variant="secondary" size="md" showArrow className="active:scale-95 transition-transform">
                Full Case Studies
              </Button>
            </Link>
          }
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-16"
        >
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div key={project.id} variants={itemVariants}>
                <SpotlightCard
                  className="p-8 lg:p-10 group bg-surface/50 backdrop-blur-xl border border-white/10 hover:border-accent-purple/50 shadow-2xl transition-all duration-300"
                  innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* 3D Parallax MacOS Window Device Frame */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <TiltCard maxTilt={10}>
                      <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#090C18] border border-white/15 overflow-hidden p-4 flex flex-col justify-between shadow-2xl shadow-purple-950/20 group-hover:border-accent-purple/60 transition-colors">
                        {/* Dark MacOS Window Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                            <div className="flex items-center gap-1.5 ml-3 bg-surface/80 px-3 py-1 rounded-md border border-white/10 text-[11px] font-mono text-text-secondary">
                              <Globe className="w-3 h-3 text-accent-cyan" />
                              <span>https://{project.title.toLowerCase().replace(/\s+/g, "")}.cortex.dev</span>
                            </div>
                          </div>
                          <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                            {project.categoryLabel}
                          </Pill>
                        </div>

                        {/* Simulated Live System Metrics */}
                        <div className="my-auto py-6 px-4 grid grid-cols-3 gap-3">
                          <div className="bg-surface/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-[10px] text-text-secondary font-mono">LATENCY REDUCTION</span>
                            <span className="text-lg font-bold text-emerald-400 font-mono mt-1">10x</span>
                            <span className="text-[9px] text-emerald-400 font-semibold mt-1">↑ Optimized</span>
                          </div>
                          <div className="bg-surface/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-[10px] text-text-secondary font-mono">ACTIVE USERS</span>
                            <span className="text-lg font-bold text-white font-mono mt-1">100K+</span>
                            <span className="text-[9px] text-accent-cyan font-semibold mt-1">Scaled SLA</span>
                          </div>
                          <div className="bg-surface/80 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-[10px] text-text-secondary font-mono">CLIENT RATING</span>
                            <span className="text-lg font-bold text-amber-400 font-mono mt-1">5.0 ★</span>
                            <span className="text-[9px] text-amber-400 font-semibold mt-1">Verified</span>
                          </div>
                        </div>

                        {/* Floating Impact Badge */}
                        <div className="absolute top-16 right-6 bg-surface/90 backdrop-blur-md border border-emerald-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] font-mono font-semibold text-white">
                            +240% User Conversion
                          </span>
                        </div>

                        {/* Bottom Live Deploy Status */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-text-secondary font-mono">
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <Zap className="w-3.5 h-3.5" />
                            <span>System Online // Production Active</span>
                          </div>
                          <span className="text-white/60">v3.2.0</span>
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Content Details Side */}
                  <div
                    className={`lg:col-span-5 flex flex-col items-start ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-mono font-bold text-accent-purple">
                        {project.number}
                      </span>
                      <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                        {project.categoryLabel}
                      </Pill>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Interactive Tech Stack Badges with Hover Highlight */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech) => (
                        <div
                          key={tech}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          <Pill
                            variant="tag"
                            className={`transition-all ${
                              hoveredTech === tech ? "bg-accent-purple text-white shadow-glow-purple" : ""
                            }`}
                          >
                            {tech}
                          </Pill>
                        </div>
                      ))}
                    </div>

                    <Link href="/our-work">
                      <Button variant="primary" size="md" showArrow className="active:scale-95 transition-transform shadow-glow-purple">
                        Read Case Study
                      </Button>
                    </Link>
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
