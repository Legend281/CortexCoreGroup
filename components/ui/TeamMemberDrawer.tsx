"use client";

import React from "react";
import { TeamMember } from "@/data/team";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { X, Linkedin, Github, Mail, Phone, Globe, Award, CheckCircle2 } from "lucide-react";
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
          {/* Dark Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Glass Slide-Over Panel / Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: shouldReduceMotion ? 0 : "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:top-0 sm:bottom-0 w-full sm:max-w-lg max-h-[90vh] sm:max-h-full bg-[#090B16]/98 backdrop-blur-2xl border-t sm:border-t-0 sm:border-l border-white/10 rounded-t-3xl sm:rounded-none p-6 sm:p-10 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Mobile Swipe Handle Pill */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden" />

              {/* Top Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <Pill variant="eyebrow" className="text-[10px]">
                  {member.category} PROFILE
                </Pill>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close profile drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Avatar + Member Identity */}
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-accent flex items-center justify-center text-white text-2xl font-bold shadow-glow-purple shrink-0">
                  {getInitials(member.name)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-sm font-semibold text-accent-purple mt-0.5">{member.role}</p>
                  <span className="text-xs font-mono text-emerald-400 mt-1 block">Cortex Engineering Staff</span>
                </div>
              </div>

              {/* Biography */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Biography & Experience
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed bg-surface/50 p-4 rounded-2xl border border-white/10">
                  {member.bio}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-3">
                  Core Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.techStack.map((tech) => (
                    <Pill key={tech} variant="tag">
                      {tech}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Shipped Projects Highlight */}
              <div className="bg-[#050712] rounded-2xl border border-white/10 p-5 mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-cyan" />
                  <span>Key Shipped Work</span>
                </h4>
                <ul className="space-y-2 text-xs text-white">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Lead Fullstack Architecture & API Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sub-15ms Edge Latency SLA Engineering</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a href={`/contact?consultant=${encodeURIComponent(member.name)}`} onClick={onClose}>
                <Button variant="primary" size="md" showArrow className="w-full shadow-glow-purple min-h-[48px]">
                  Book Intro Call with {member.name}
                </Button>
              </a>

              <div className="flex items-center gap-3">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="secondary" size="md" className="w-full min-h-[48px]">
                      <Linkedin className="w-4 h-4" /> LinkedIn
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
                    <Button variant="secondary" size="md" className="w-full min-h-[48px]">
                      <Github className="w-4 h-4" /> GitHub
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
