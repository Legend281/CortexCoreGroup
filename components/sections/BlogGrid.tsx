"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BlogPostItem } from "@/data/blog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const CATEGORIES = [
  "All Articles",
  "ENGINEERING",
  "AI & ML",
  "DEVOPS",
  "DESIGN",
  "ARCHITECTURE",
];

export interface BlogGridProps {
  posts?: BlogPostItem[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  const list = posts || BLOG_POSTS;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredPosts = useMemo(() => {
    return list.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === "All Articles" || p.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [list, searchQuery, activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section id="blog-grid" className="py-16 sm:py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="ARTICLES DIRECTORY"
          title="All Technical Publications & Deep Dives"
          gradientWord="Publications"
          description="Filter articles by engineering domain or search keywords to read our latest blueprints."
          align="center"
        />

        {/* Search Bar + Category Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-4 mb-8 sm:mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles (e.g. AI, Next.js, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/60 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-surface/40 border border-white/10 rounded-2xl pb-1.5 md:pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="shrink-0">
                <Pill variant="filter" active={activeCategory === cat} className="text-xs">
                  {cat}
                </Pill>
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredPosts.map((post) => {
            const isTagMatched =
              hoveredTag && post.tags.some((t) => t.toLowerCase() === hoveredTag.toLowerCase());

            return (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <SpotlightCard
                    className={`p-5 sm:p-6 flex flex-col justify-between group cursor-pointer h-full border transition-all duration-300 rounded-3xl ${
                      isTagMatched
                        ? "bg-accent-purple/20 border-accent-purple shadow-glow-purple"
                        : "bg-surface/40 border-white/10 backdrop-blur-md hover:border-accent-purple/50 hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      {/* Featured Cover Image */}
                      {post.image && (
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-4 sm:mb-5 bg-[#050714]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1B]/80 via-transparent to-transparent opacity-40" />
                        </div>
                      )}

                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-3">
                        <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                          {post.category}
                        </Pill>
                        <div className="flex items-center gap-2.5 text-[11px] font-mono text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-accent-purple" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1 text-accent-cyan">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent-purple transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                        {post.tags.map((tag) => (
                          <div
                            key={tag}
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setHoveredTag(tag);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setHoveredTag(null);
                            }}
                          >
                            <Pill
                              variant="tag"
                              className={`text-[10px] transition-all ${
                                hoveredTag === tag ? "bg-accent-purple text-white shadow-glow-purple" : ""
                              }`}
                            >
                              {tag}
                            </Pill>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Author & Action */}
                    <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-accent flex items-center justify-center text-white text-[10px] font-bold">
                          {post.authorAvatar}
                        </div>
                        <span className="text-xs font-semibold text-white truncate max-w-[120px]">{post.author}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-purple group-hover:text-white transition-colors shrink-0">
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
