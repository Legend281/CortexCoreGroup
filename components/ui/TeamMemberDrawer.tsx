"use client";

import React from "react";
import Image from "next/image";
import { TeamMember } from "@/data/team";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { X, Linkedin, Github, Award, CheckCircle2, Phone, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface TeamMemberDrawerProps {
  member: TeamMember | null;
  onClose: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export const TeamMemberDrawer: React.FC<TeamMemberDrawerProps> = ({
  member,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Dark Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
          />

          {/* Glass Slide-Over Panel / Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: shouldReduceMotion ? 0 : "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:top-0 sm:bottom-0 w-full sm:max-w-lg max-h-[88vh] sm:max-h-full bg-[#090B16]/98 backdrop-blur-2xl border-t sm:border-t-0 sm:border-l border-white/15 rounded-t-[28px] sm:rounded-none z-50 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            {/* Scrollable Content */}
            <div className="p-5 sm:p-10 overflow-y-auto flex-1">
              {/* Mobile Drag Indicator */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

              {/* Top Header */}
              <div className="flex items-center justify-between mb-6 pb-3.5 border-b border-white/10">
                <Pill variant="eyebrow" className="text-[10px]">
                  {member.category} PROFILE
                </Pill>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close profile drawer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Avatar + Member Identity */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 mb-6">
                {member.image ? (
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-glow-purple shrink-0 border border-white/20 bg-[#090B16]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="112px"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-accent flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-glow-purple shrink-0 border border-white/20">
                    {getInitials(member.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-accent-purple mt-0.5">{member.role}</p>
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 inline-flex items-center justify-center sm:justify-start gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Cortex Engineering Staff
                  </span>
                </div>
              </div>

              {/* Biography */}
              <div className="mb-6">
                <h4 className="text-[11px] font-mono font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Biography & Experience
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-surface/50 p-4 rounded-2xl border border-white/10">
                  {member.bio}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-[11px] font-mono font-bold text-text-secondary uppercase tracking-wider mb-2.5">
                  Core Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {member.techStack.map((tech) => (
                    <Pill key={tech} variant="tag" className="text-xs">
                      {tech}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Shipped Projects Highlight */}
              <div className="bg-[#050712] rounded-2xl border border-white/10 p-4 sm:p-5 mb-4">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-cyan" />
                  <span>Key Engineering Highlights</span>
                </h4>
                <ul className="space-y-2 text-xs text-white">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Lead Fullstack Architecture & Performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sub-15ms Edge Latency SLA Engineering</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Connect Action Tray */}
            <div className="p-4 sm:p-6 bg-[#060813] border-t border-white/10 space-y-2.5 shrink-0">
              <a href={`/contact?consultant=${encodeURIComponent(member.name)}`} onClick={onClose} className="block w-full">
                <Button variant="primary" size="lg" showArrow className="w-full shadow-glow-purple min-h-[48px] text-xs sm:text-sm font-bold active:scale-95">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0 text-accent-cyan" />
                  <span>Book Call with {member.name}</span>
                </Button>
              </a>

              <div className="flex items-center gap-2">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="secondary" size="md" className="w-full min-h-[44px] text-xs">
                      <Linkedin className="w-3.5 h-3.5 shrink-0 text-accent-cyan" /> <span>LinkedIn</span>
                    </Button>
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="secondary" size="md" className="w-full min-h-[44px] text-xs">
                      <Github className="w-3.5 h-3.5 shrink-0 text-white" /> <span>GitHub</span>
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
