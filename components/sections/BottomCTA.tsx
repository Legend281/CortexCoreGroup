"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Mail, Clock, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const BottomCTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 relative bg-[#06060E] overflow-hidden">
      {/* Background Image Layer with Dark Overlay & Blend */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-background.png"
          alt="Cortex CTA Tech Background"
          fill
          priority
          className="object-cover object-center opacity-75 filter brightness-105 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060E]/90 via-[#06060E]/50 to-[#06060E]/90" />
      </div>

      {/* Ambient Glow Layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial-purple opacity-60 blur-[120px] pointer-events-none" />

      {/* Dot Grid Background Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative rounded-3xl bg-surface/40 backdrop-blur-2xl border border-white/15 p-8 sm:p-14 text-center shadow-2xl shadow-purple-950/30 overflow-hidden"
        >
          {/* Subtle Top Inner Edge Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />

          {/* Sparkle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-accent-purple/15 border border-accent-purple/40 rounded-full px-4 py-1.5 mb-8 shadow-glow-purple"
          >
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-xs font-semibold text-accent-purple uppercase tracking-wider">
              Let&apos;s Build Something Great
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Ready to Transform{" "}
            <span className="text-gradient">Your Business?</span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you&apos;re building a new product from scratch, modernizing legacy systems, or scaling your engineering team — we&apos;re here to make it happen.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                showArrow
                className="text-base shadow-glow-purple active:scale-95 transition-transform min-w-[260px]"
              >
                Book a Free Consultation
              </Button>
            </Link>
            <a href="mailto:hello@cortexcoregroup.com">
              <Button
                variant="secondary"
                size="lg"
                className="text-base active:scale-95 transition-transform min-w-[260px]"
              >
                <Mail className="w-4 h-4" />
                hello@cortexcoregroup.com
              </Button>
            </a>
          </div>

          {/* Trust Micro-Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-text-secondary font-medium uppercase tracking-wider pt-6 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free initial consultation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              <span>No commitment required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
