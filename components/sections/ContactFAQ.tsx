"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ChevronDown, ShieldCheck, Clock, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const CONTACT_FAQS = [
  {
    question: "Do you sign Non-Disclosure Agreements (NDAs) before discussing project details?",
    answer:
      "Yes. We take IP protection and confidentiality seriously. We can execute a standard mutual NDA prior to our initial technical discovery call.",
    icon: ShieldCheck,
  },
  {
    question: "How fast can team onboarding or project discovery begin?",
    answer:
      "For Team Augmentation, senior engineers can be onboarded into your Slack & Jira within 48 hours. For End-to-End Product Builds, kick-off begins within 3 to 5 business days.",
    icon: Clock,
  },
  {
    question: "What information should we prepare for our initial discovery call?",
    answer:
      "Having a high-level overview of your target audience, core feature requirements, preferred tech stack (if any), and desired launch timeline is helpful. We will guide you through the rest during discovery.",
    icon: FileText,
  },
  {
    question: "What are your standard sprint and payment terms?",
    answer:
      "We operate in bi-weekly agile sprints. Payment milestones are aligned with sprint deliverable sign-offs and live staging demos, ensuring complete transparency.",
    icon: CheckCircle2,
  },
];

export const ContactFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="PRE-INQUIRY FAQ"
          title="Common Questions Before Reaching Out"
          gradientWord="Reaching Out"
          description="Clear answers regarding NDAs, discovery speed, sprint milestones, and confidentiality."
          align="center"
        />

        <div className="space-y-4">
          {CONTACT_FAQS.map((faq, idx) => {
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
