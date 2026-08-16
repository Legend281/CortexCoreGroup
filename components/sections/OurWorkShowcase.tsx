"use client";

import React, { useState, useMemo } from "react";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pill } from "@/components/ui/Pill";
import { ProjectMockupPreview } from "@/components/ui/ProjectMockupPreview";
import { ProjectDetailDrawer } from "@/components/ui/ProjectDetailDrawer";
import {
  Search,
  Layout,
  Grid,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const CATEGORIES = [
  "All Projects",
  "Web Applications",
  "Mobile Apps",
  "Dashboards",
  "E-Commerce",
  "IoT Solutions",
  "Systems",
];

export interface OurWorkShowcaseProps {
  projects?: ProjectItem[];
}

export const OurWorkShowcase: React.FC<OurWorkShowcaseProps> = ({ projects }) => {
  const list = projects || PROJECTS;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [viewMode, setViewMode] = useState<"editorial" | "bento">("editorial");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const shouldReduceMotion = useReducedMotion();

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const filteredProjects = useMemo(() => {
    return list.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === "All Projects" || p.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [list, searchQuery, activeCategory]);

  return (
    <section id="portfolio-showcase" className="py-16 sm:py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="ENGINEERED PORTFOLIO"
          title="Interactive Product Showcase & Case Studies"
          gradientWord="Showcase"
          description="Filter or search our products. Tap any case study card to inspect architectural benchmarks and engineering deliverables."
          align="center"
        />

        {/* Top Controls: Search Bar + View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products (e.g. AI, Next.js, FinTech)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/60 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          {/* Category Tabs with Gliding Pill Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-surface/40 border border-white/10 rounded-2xl pb-1.5 md:pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 shrink-0"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeWorkCategoryPill"
                      className="absolute inset-0 bg-accent-purple/20 border border-accent-purple/50 rounded-xl shadow-glow-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-white font-bold" : "text-text-secondary hover:text-white"}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher with Gliding Morph */}
          <div className="flex items-center gap-1 bg-surface/60 p-1 rounded-xl border border-white/10 shrink-0 self-end md:self-auto">
            <button
              onClick={() => setViewMode("editorial")}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewMode === "editorial" ? "text-white font-bold" : "text-text-secondary hover:text-white"
              }`}
              title="Showcase Editorial View"
            >
              {viewMode === "editorial" && (
                <motion.div
                  layoutId="activeViewModePill"
                  className="absolute inset-0 bg-accent-purple rounded-lg shadow-glow-purple"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Layout className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Showcase</span>
            </button>

            <button
              onClick={() => setViewMode("bento")}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewMode === "bento" ? "text-white font-bold" : "text-text-secondary hover:text-white"
              }`}
              title="Bento Grid View"
            >
              {viewMode === "bento" && (
                <motion.div
                  layoutId="activeViewModePill"
                  className="absolute inset-0 bg-accent-purple rounded-lg shadow-glow-purple"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Grid className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Grid</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Editorial Showcase (Alternating 3D MacOS Window Frames) */}
        {viewMode === "editorial" ? (
          <div className="space-y-8 sm:space-y-16">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const currentLikes = project.likeCount + (likes[project.id] || 0);
              const isTechMatched =
                hoveredTech && project.techStack.some((t) => t.toLowerCase() === hoveredTech.toLowerCase());

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  <SpotlightCard
                    onClick={() => setSelectedProject(project)}
                    className={`p-5 sm:p-8 lg:p-12 cursor-pointer group rounded-3xl border transition-all duration-300 ${
                      isTechMatched
                        ? "bg-accent-purple/20 border-accent-purple shadow-glow-purple"
                        : "bg-surface/50 backdrop-blur-xl border-white/10 hover:border-accent-purple/50"
                    }`}
                    innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
                  >
                    {/* Mockup Frame Side */}
                    <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <TiltCard maxTilt={6}>
                        <div className="rounded-2xl bg-[#050712] border border-white/15 overflow-hidden shadow-2xl">
                          {/* MacOS Window Control Bar */}
                          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-surface/80 border-b border-white/10 font-mono text-[10px] sm:text-[11px]">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90" />
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/90" />
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90" />
                              <span className="text-[9px] sm:text-[10px] text-text-secondary ml-1.5 font-mono truncate max-w-[140px] sm:max-w-none">
                                https://cortex.dev/case-study/{project.id}
                              </span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-emerald-400 font-semibold uppercase shrink-0">
                              LIVE SYSTEM
                            </span>
                          </div>

                          {/* Domain Specific UI Mockup */}
                          <div className="aspect-[16/10] w-full">
                            <ProjectMockupPreview project={project} />
                          </div>
                        </div>
                      </TiltCard>
                    </div>

                    {/* Details Side */}
                    <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div>
                        {/* Number, Eyebrow & Like Button */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-mono font-bold text-accent-purple">
                              {project.number}
                            </span>
                            <Pill variant="eyebrow" className="text-[9px] sm:text-[10px] py-0.5 px-2">
                              {project.categoryLabel}
                            </Pill>
                          </div>

                          {/* Like Button */}
                          <button
                            onClick={(e) => handleLike(project.id, e)}
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 active:scale-95 transition-all text-xs font-mono font-bold"
                          >
                            <Heart className="w-3.5 h-3.5 fill-rose-400" />
                            <span>{currentLikes}</span>
                          </button>
                        </div>

                        <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent-purple transition-colors">
                          {project.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 sm:mb-6">
                          {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                          {project.techStack.map((tech) => (
                            <div
                              key={tech}
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                setHoveredTech(tech);
                              }}
                              onMouseLeave={(e) => {
                                e.stopPropagation();
                                setHoveredTech(null);
                              }}
                            >
                              <Pill
                                variant="tag"
                                className={`text-xs transition-all ${
                                  hoveredTech === tech ? "bg-accent-purple text-white shadow-glow-purple" : ""
                                }`}
                              >
                                {tech}
                              </Pill>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial & Inspect Action */}
                      <div>
                        {project.testimonial && (
                          <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 mb-4 sm:mb-6">
                            <p className="text-xs text-text-secondary italic mb-1.5 sm:mb-2">
                              &ldquo;{project.testimonial.quote}&rdquo;
                            </p>
                            <span className="text-[11px] font-semibold text-white block">
                              — {project.testimonial.author}, <span className="text-accent-purple">{project.testimonial.role}</span>
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs font-semibold text-accent-purple group-hover:text-white transition-colors pt-2 border-t border-white/10">
                          <span>Inspect Full Case Study</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* View Mode 2: Compact Bento Grid Mode */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredProjects.map((project) => {
              const currentLikes = project.likeCount + (likes[project.id] || 0);
              return (
                <SpotlightCard
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="p-5 sm:p-6 flex flex-col justify-between cursor-pointer group bg-surface/40 backdrop-blur-md border border-white/10 hover:border-accent-purple/50 rounded-3xl transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                        {project.categoryLabel}
                      </Pill>
                      <button
                        onClick={(e) => handleLike(project.id, e)}
                        className="flex items-center gap-1 text-xs text-rose-400 font-mono font-bold"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-400" />
                        <span>{currentLikes}</span>
                      </button>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <Pill key={tech} variant="tag" className="text-[10px]">
                          {tech}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-accent-purple group-hover:text-white transition-colors">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </SpotlightCard>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Case Study Slide-Over Drawer */}
      <ProjectDetailDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
