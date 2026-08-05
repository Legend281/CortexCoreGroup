"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface TestimonialItem {
  quote: string;
  author: string;
  initial: string;
  rating: number;
}

export interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Cortex Core Group delivered beyond our expectations. Their innovative approach and professionalism are unmatched.",
    author: "CEO, TechNova Solutions",
    initial: "T",
    rating: 5,
  },
  {
    quote:
      "Their team transformed our idea into a powerful digital solution. We've seen real growth since launch!",
    author: "Product Manager, FinEdge",
    initial: "F",
    rating: 5,
  },
  {
    quote:
      "Reliable, creative and results-driven. Cortex Core Group is our go-to technology partner.",
    author: "CTO, Nexora Systems",
    initial: "N",
    rating: 5,
  },
];

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const list = testimonials || TESTIMONIALS;
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section className="py-24 relative bg-[#090914] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="CLIENT REVIEWS"
          title="What Our Clients Say"
          gradientWord="Clients"
          description="Hear from companies that trust us to engineer their most critical digital platforms."
          align="center"
        />

        {/* Desktop: 3-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:grid grid-cols-3 gap-6"
        >
          {list.map((testimonial, i) => (
            <motion.div key={i} variants={cardVariants}>
              <SpotlightCard className="p-8 flex flex-col justify-between relative group bg-surface/40 backdrop-blur-md border border-white/10 hover:border-accent-purple/40 hover:-translate-y-1.5 transition-all duration-300 h-full">
                <Quote className="w-10 h-10 text-accent-purple/20 absolute top-6 right-6 pointer-events-none group-hover:text-accent-purple/40 transition-colors" />

                <div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-6">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center font-bold text-white text-xs shadow-glow-purple">
                    {testimonial.initial || testimonial.author[0]}
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {testimonial.author}
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Carousel with navigation */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-8 flex flex-col justify-between relative group bg-surface/40 backdrop-blur-md border border-white/10 h-full">
                <Quote className="w-10 h-10 text-accent-purple/20 absolute top-6 right-6 pointer-events-none" />

                <div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 italic">
                    &ldquo;{list[activeIndex].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 text-amber-400 mb-6">
                    {Array.from({ length: list[activeIndex].rating || 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center font-bold text-white text-xs shadow-glow-purple">
                    {list[activeIndex].initial || list[activeIndex].author[0]}
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {list[activeIndex].author}
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>

          {/* Mobile navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent-purple active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex ? "bg-accent-purple w-6" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveIndex((prev) => Math.min(list.length - 1, prev + 1))}
              disabled={activeIndex === list.length - 1}
              className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent-purple active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
