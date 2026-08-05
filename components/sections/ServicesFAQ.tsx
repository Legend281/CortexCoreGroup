"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ChevronDown, ShieldCheck, Code2, Lock, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const FAQS = [
  {
    question: "Who owns the Intellectual Property (IP) and source code?",
    answer:
      "You own 100% of all intellectual property, source code, database schemas, and infrastructure blueprints from Day 1. Upon project completion, we execute a complete repository transfer to your GitHub/AWS organization.",
    icon: Lock,
  },
  {
    question: "How do bi-weekly sprints and live staging links work?",
    answer:
      "We operate in bi-weekly agile sprints. At the end of each sprint, we provide a live staging demo link where you can interactively test newly built features, review sprint velocity metrics, and sign off on deliverables.",
    icon: Code2,
  },
  {
    question: "How quickly can team augmentation or product builds begin?",
    answer:
      "For Team Augmentation, senior engineers can be onboarded into your Slack & Jira within 48 hours. For End-to-End Product Builds, project discovery and architecture kick-off begin within 3 to 5 business days.",
    icon: Clock,
  },
  {
    question: "What security, privacy, and compliance standards do you follow?",
    answer:
      "All code and cloud infrastructure we build adhere to SOC2, HIPAA, and GDPR compliance standards. We implement AES-256 data encryption at rest and in transit, strict IAM access controls, and automated vulnerability scanning.",
    icon: ShieldCheck,
  },
  {
    question: "What happens after product launch? Do you provide SLA support?",
    answer:
      "Yes. We offer flexible post-launch Support & SLA Maintenance packages including 24/7 uptime monitoring, automated database backups, security patch updates, and continuous feature development.",
    icon: Sparkles,
  },
];

export const ServicesFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 relative bg-[#06060E] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to Know Before Partnering"
          gradientWord="Partnering"
          description="Clear, transparent answers regarding code ownership, delivery speed, security, and SLAs."
          align="center"
        />

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const IconComp = faq.icon;

            return (
              <SpotlightCard
                key={faq.question}
                onClick={() => toggle(idx)}
                className="p-6 cursor-pointer bg-surface/40 backdrop-blur-md border border-white/10 hover:border-accent-purple/40 rounded-2xl transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-surface/80 border border-white/10 flex items-center justify-center text-accent-purple shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </h3>
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
                      <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed pt-4 border-t border-white/10">
                        {faq.answer}
                      </p>
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
