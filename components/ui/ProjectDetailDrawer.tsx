"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { X, CheckCircle2, Heart, Star, ExternalLink, ShieldCheck, Cpu, Zap, Layers, Award } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface ProjectDetailDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({
  project,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Dark Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Glassmorphism Slide-Over Panel / Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: shouldReduceMotion ? 0 : "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:top-0 sm:bottom-0 w-full sm:max-w-xl max-h-[90vh] sm:max-h-full bg-[#090B16]/98 backdrop-blur-2xl border-t sm:border-t-0 sm:border-l border-white/10 rounded-t-3xl sm:rounded-none p-6 sm:p-10 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Mobile Swipe Handle Pill */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden" />

              {/* Header: Close Button & Category Pill */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-accent-purple">
                    {project.number}
                  </span>
                  <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                    {project.categoryLabel}
                  </Pill>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Stats */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono shrink-0 pt-1">
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <Heart className="w-4 h-4 fill-rose-400" /> {project.likeCount}
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-bold ml-2">
                    <Star className="w-4 h-4 fill-amber-400" /> {project.rating}.0
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-3">
                  System Architecture & Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Pill key={tech} variant="tag">
                      {tech}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Architectural Benchmarks */}
              <div className="bg-[#050712] border border-white/10 rounded-2xl p-5 mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-cyan" />
                  <span>Engineering Highlights & Impact</span>
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sub-15ms Edge API Latency SLA</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Type-Safe Architecture with Automated CI/CD</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SOC2 & HIPAA Compliant Security Infrastructure</span>
                  </li>
                </ul>
              </div>

              {/* Testimonial Quote */}
              {project.testimonial && (
                <div className="p-5 rounded-2xl bg-surface/50 border border-white/10 mb-8">
                  <p className="text-xs sm:text-sm text-text-secondary italic mb-3">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </p>
                  <span className="text-xs font-semibold text-white block">
                    — {project.testimonial.author}, <span className="text-accent-purple">{project.testimonial.role}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <Link href={`/contact?project=${project.id}`} className="w-full sm:w-auto flex-1" onClick={onClose}>
                <Button variant="primary" size="lg" showArrow className="w-full shadow-glow-purple min-h-[48px]">
                  Request System Like This
                </Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={onClose} className="w-full sm:w-auto min-h-[48px]">
                Close Case Study
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
