"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, X, CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const QuickConsultationFab: React.FC = () => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Software Development",
    message: "",
  });

  // Don't show the public FAB on admin routes or contact page
  if (pathname.startsWith("/admin") || pathname === "/contact") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          gdprConsent: true,
          budget: "$10k - $25k",
        }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 3500);
    } catch (_) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center gap-2 bg-gradient-accent text-white px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl shadow-purple-950/60 border border-white/20 hover:shadow-glow-purple transition-all duration-300 active:scale-95"
          aria-label="Request a Quick Scope Consultation"
        >
          {/* Animated Pulsing Beacon Dot */}
          <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-accent-cyan"></span>
          </span>

          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
          <span className="text-[11px] sm:text-sm font-bold tracking-wide">
            Book Scope Call
          </span>
        </motion.button>
      </div>

      {/* Slide-Up Interactive Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
            />

            {/* Modal Sheet - Bottom Sheet on Mobile, Floating Card on Desktop */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 80 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-8 sm:right-8 w-full sm:max-w-md bg-[#090B18]/98 backdrop-blur-2xl border-t sm:border border-white/15 rounded-t-[28px] sm:rounded-3xl p-5 sm:p-7 z-50 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Mobile Drag Indicator Bar */}
              <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mb-3 sm:hidden" />

              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-accent flex items-center justify-center text-white shadow-glow-purple">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-none">
                      Engineering Consultation
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-mono text-accent-cyan">
                      Direct response within 2 hours
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-cyan">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Inquiry Received!</h4>
                  <p className="text-xs text-text-secondary">
                    Our lead architect will review your project requirements and connect via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Randy Ojong"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050714] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. randy@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050714] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                      Target Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#050714] border border-white/15 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
                    >
                      <option value="Software Development">Software Development (Web/Mobile/SaaS)</option>
                      <option value="AI & Machine Learning">AI & Machine Learning Systems</option>
                      <option value="Cloud Solutions & DevOps">Cloud Solutions & DevOps</option>
                      <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                      <option value="Cybersecurity">Cybersecurity & Cloud Audits</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                      Brief Vision / Scope *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Briefly describe what you'd like to build..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#050714] border border-white/15 rounded-xl px-3.5 py-2 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={submitting}
                    className="w-full shadow-glow-purple font-bold text-xs sm:text-sm py-3 mt-2 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    <span>{submitting ? "Sending..." : "Submit Consultation Request"}</span>
                  </Button>

                  <p className="text-[10px] text-center text-text-secondary font-mono pt-1">
                    Direct email:{" "}
                    <a
                      href="mailto:info@cortexcoregroup.com"
                      className="text-accent-cyan hover:underline"
                    >
                      info@cortexcoregroup.com
                    </a>
                  </p>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
