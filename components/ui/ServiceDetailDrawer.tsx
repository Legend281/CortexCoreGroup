"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceItem } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { X, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
          />

          {/* Glassmorphism Slide-Over Panel / Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: shouldReduceMotion ? 0 : "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:top-0 sm:bottom-0 w-full sm:max-w-xl max-h-[88vh] sm:max-h-full bg-[#090B16]/98 backdrop-blur-2xl border-t sm:border-t-0 sm:border-l border-white/15 rounded-t-[28px] sm:rounded-none z-50 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            {/* Scrollable Content Container */}
            <div className="p-5 sm:p-10 overflow-y-auto flex-1">
              {/* Mobile Drag Handle */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

              {/* Header: Number & Close Button */}
              <div className="flex items-center justify-between mb-6 pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-accent-purple">
                    {service.number}
                  </span>
                  <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                    SERVICE CAPABILITY
                  </Pill>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Service Cover Graphic (if available) */}
              {service.image && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 mb-6 shadow-xl bg-[#050714]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090B16] via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Title & Description */}
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-3">
                {service.title}
              </h2>
              <p className="text-xs sm:text-base text-text-secondary leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="mb-6">
                <h4 className="text-[11px] font-mono font-bold text-text-secondary uppercase tracking-wider mb-2.5">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.tags.map((tag) => (
                    <Pill key={tag} variant="tag" className="text-xs">
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Engineering Scope Highlights */}
              <div className="bg-surface/50 border border-white/10 rounded-2xl p-4 sm:p-6 mb-4">
                <h4 className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider mb-3.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent-cyan" />
                  <span>Engineering Deliverables</span>
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Production Architecture & System Blueprints</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Enterprise Security Audit & Compliance Setup</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated CI/CD Pipelines & Cloud Deployment</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Post-Launch 24/7 Monitoring & SLAs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Sticky Action Footer */}
            <div className="p-4 sm:p-6 bg-[#060813] border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 shrink-0">
              <Link href={`/contact?service=${service.id}`} className="w-full sm:flex-1" onClick={onClose}>
                <Button variant="primary" size="lg" showArrow className="w-full shadow-glow-purple min-h-[48px] text-xs sm:text-sm font-bold active:scale-95">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0 text-accent-cyan" />
                  <span>Request Proposal for {service.title}</span>
                </Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={onClose} className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] text-xs sm:text-sm">
                Close
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
