"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Zap, Layers } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface ServiceDetailDrawerProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailDrawer: React.FC<ServiceDetailDrawerProps> = ({
  service,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {service && (
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
                    {service.number}
                  </span>
                  <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                    SERVICE CAPABILITY
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

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-3">
                  Core Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Pill key={tag} variant="tag">
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Engineering Scope Highlights */}
              <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 mb-8">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent-cyan" />
                  <span>Engineering Deliverables</span>
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Production Architecture & System Blueprints</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Enterprise Security Audit & Compliance Setup</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated CI/CD Pipelines & Cloud Deployment</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Post-Launch Monitoring & SLAs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <Link href={`/contact?service=${service.id}`} className="w-full sm:w-auto flex-1" onClick={onClose}>
                <Button variant="primary" size="lg" showArrow className="w-full shadow-glow-purple min-h-[48px]">
                  Request Proposal for {service.title}
                </Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={onClose} className="w-full sm:w-auto min-h-[48px]">
                Close
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
