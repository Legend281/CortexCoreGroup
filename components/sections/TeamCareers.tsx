"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Briefcase, ChevronDown, CheckCircle2, ArrowRight, Code2, Cpu, Layout } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const OPEN_ROLES = [
  {
    id: "fullstack-lead",
    title: "Senior Full-Stack Engineer (Next.js / TypeScript)",
    type: "Remote // Full-Time",
    department: "Engineering",
    location: "Global (Douala HQ / Remote)",
    icon: Code2,
    description:
      "We are looking for a Senior Full-Stack Engineer to architect high-concurrency SaaS applications, optimize Next.js server actions, and build sub-15ms edge APIs.",
    requirements: [
      "5+ years experience with Next.js, React 19, TypeScript & Node.js",
      "Deep expertise in PostgreSQL, Prisma, Redis & Docker containerization",
      "Proven track record of shipping production applications with high SLAs",
    ],
  },
  {
    id: "ai-systems",
    title: "AI / ML Systems Engineer (PyTorch & RAG Pipelines)",
    type: "Remote // Full-Time",
    department: "AI Research",
    location: "Global (Remote)",
    icon: Cpu,
    description:
      "Join our AI research team to build retrieval-augmented generation (RAG) memory systems, fine-tune open-weight LLMs, and deploy low-latency inference pipelines.",
    requirements: [
      "3+ years experience with PyTorch, Python, FastAPI & Vector DBs (Pinecone/pgvector)",
      "Hands-on experience with OpenAI, Gemini & open-source model fine-tuning",
      "Experience deploying ML models to AWS/GCP GPU instances",
    ],
  },
  {
    id: "uiux-motion",
    title: "Senior UI/UX & Motion Engineer",
    type: "Remote // Full-Time",
    department: "Product Design",
    location: "Global (Remote)",
    icon: Layout,
    description:
      "We are seeking a Design Engineer who obsessed over micro-physics, spring animations, glassmorphism UI tokens, and high-conversion design systems.",
    requirements: [
      "4+ years experience designing & building web interfaces using Figma, TailwindCSS & Framer Motion",
      "Strong portfolio demonstrating fluid, physical motion & micro-interactions",
      "Proficiency in React/Next.js component architecture",
    ],
  },
];

export const TeamCareers: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="careers" className="py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="JOIN OUR TEAM"
          title="Open Engineering Roles & Careers"
          gradientWord="Careers"
          description="We are always seeking world-class engineers, AI researchers, and design engineers to join our studio."
          align="center"
        />

        <div className="space-y-4">
          {OPEN_ROLES.map((role, idx) => {
            const isOpen = openIdx === idx;
            const IconComp = role.icon;

            return (
              <SpotlightCard
                key={role.id}
                onClick={() => toggle(idx)}
                className="p-6 cursor-pointer bg-surface/40 backdrop-blur-md border border-white/10 hover:border-accent-purple/40 rounded-2xl transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface/80 border border-white/10 flex items-center justify-center text-accent-purple shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                          {role.type}
                        </Pill>
                        <span className="text-xs font-mono text-text-secondary">
                          {role.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-purple bg-accent-purple/10" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {role.description}
                        </p>

                        <div>
                          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                            Key Qualifications:
                          </h4>
                          <ul className="space-y-2">
                            {role.requirements.map((req) => (
                              <li key={req} className="flex items-center gap-2 text-xs text-text-secondary">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2">
                          <a
                            href={`mailto:careers@cortexcoregroup.com?subject=Application for ${encodeURIComponent(role.title)}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="primary" size="md" showArrow className="shadow-glow-purple">
                              Apply for This Position
                            </Button>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
