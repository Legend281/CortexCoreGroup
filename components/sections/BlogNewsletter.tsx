"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BlogNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-24 relative bg-[#06060E] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <SpotlightCard className="p-8 sm:p-12 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-purple mx-auto mb-6 shadow-glow-purple">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Monthly System Design & AI Research Notes
          </h2>

          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed mb-8">
            Join 15,000+ engineers receiving our monthly deep dive into sub-15ms edge architectures, RAG memory pipelines, and production code benchmarks. Zero spam.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050714] border border-white/15 rounded-2xl px-4 py-3 text-base sm:text-sm text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                  />
                </div>
                <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto shrink-0 shadow-glow-purple">
                  Subscribe Free
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono font-semibold flex items-center justify-center gap-2 max-w-md mx-auto"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Subscribed! You will receive our next monthly technical breakdown.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Privacy. Unsubscribe anytime in 1-click.</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
