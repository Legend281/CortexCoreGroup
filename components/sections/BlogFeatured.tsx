"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BlogPostItem } from "@/data/blog";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export interface BlogFeaturedProps {
  posts?: BlogPostItem[];
}

export const BlogFeatured: React.FC<BlogFeaturedProps> = ({ posts }) => {
  const list = posts || BLOG_POSTS;
  const featured = list.find((p) => p.featured) || list[0];
  const shouldReduceMotion = useReducedMotion();

  if (!featured) return null;

  return (
    <section className="py-8 sm:py-12 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <SpotlightCard
            className="p-5 sm:p-12 bg-surface/60 backdrop-blur-xl border border-accent-purple/30 rounded-3xl shadow-2xl overflow-hidden group"
            innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
          >
            {/* Left Column: Article Metadata & Lead Text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                  FEATURED PUBLICATION
                </Pill>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-secondary">
                  <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent-cyan">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featured.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4 group-hover:text-accent-purple transition-colors">
                {featured.title}
              </h2>

              <p className="text-xs sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
                {featured.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                {featured.tags.map((tag) => (
                  <Pill key={tag} variant="tag" className="text-xs">
                    {tag}
                  </Pill>
                ))}
              </div>

              {/* Author & Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full pt-4 sm:pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-xs font-bold shadow-glow-purple shrink-0">
                    {featured.authorAvatar}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">{featured.author}</span>
                    <span className="text-[10px] sm:text-xs text-text-secondary">{featured.authorRole}</span>
                  </div>
                </div>

                <Link href={`/blog/${featured.slug}`} className="w-full sm:w-auto">
                  <Button variant="primary" size="md" showArrow className="w-full sm:w-auto shadow-glow-purple text-xs sm:text-sm font-bold min-h-[44px]">
                    Read Publication
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Featured Image or 3D MacOS Terminal Frame */}
            <div className="lg:col-span-5">
              <TiltCard maxTilt={6}>
                {featured.image ? (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#040612] group">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060814]/90 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-[#040612] border border-white/15 p-5 shadow-2xl font-mono text-xs text-text-secondary">
                    <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-4">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] text-accent-cyan ml-2 flex items-center gap-1">
                        <Terminal className="w-3 h-3" /> publication.preview
                      </span>
                    </div>
                    <p className="text-white/80 leading-relaxed italic">
                      &quot;{featured.excerpt}&quot;
                    </p>
                  </div>
                )}
              </TiltCard>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
