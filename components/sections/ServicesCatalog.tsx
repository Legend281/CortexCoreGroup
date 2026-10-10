"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { SERVICES, ServiceItem } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pill } from "@/components/ui/Pill";
import { ServiceDetailDrawer } from "@/components/ui/ServiceDetailDrawer";
import {
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Smartphone,
  Settings2,
  Infinity,
  Briefcase,
  Wifi,
  Camera,
  GitBranch,
  Database,
  Megaphone,
  Monitor,
  Boxes,
  Headphones,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Smartphone,
  Settings2,
  Infinity,
  Briefcase,
  Wifi,
  Camera,
  GitBranch,
  Database,
  Megaphone,
  Monitor,
  Boxes,
  Headphones,
};

const CATEGORIES = [
  "All Capabilities",
  "AI & Data",
  "Web & Software",
  "Cloud & DevOps",
  "Mobile & IoT",
  "Security & IT",
];

const mapCategory = (item: ServiceItem): string => {
  const t = item.title.toLowerCase() + " " + item.tags.join(" ").toLowerCase();
  if (t.includes("ai") || t.includes("data") || t.includes("analytics")) return "AI & Data";
  if (t.includes("software") || t.includes("ui/ux") || t.includes("web")) return "Web & Software";
  if (t.includes("cloud") || t.includes("devops") || t.includes("integration")) return "Cloud & DevOps";
  if (t.includes("mobile") || t.includes("iot") || t.includes("blockchain")) return "Mobile & IoT";
  return "Security & IT";
};

export interface ServicesCatalogProps {
  services?: ServiceItem[];
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ services }) => {
  const list = services || SERVICES;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Capabilities");
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredServices = useMemo(() => {
    return list.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const category = mapCategory(item);
      const matchesCategory = activeCategory === "All Capabilities" || category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [list, searchQuery, activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
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
    <section id="services-catalog" className="py-16 sm:py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="CAPABILITIES CATALOG"
          title="Interactive Services & Specializations"
          gradientWord="Specializations"
          description="Filter or search our 16 enterprise capabilities. Tap any capability card to inspect deliverables and production blue-prints."
          align="center"
        />

        {/* Search Bar + Category Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-4 mb-8 sm:mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search capabilities (e.g. AI, Cloud, React)..."
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
                      layoutId="activeServiceCategoryPill"
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
        </div>

        {/* Services Bento Grid */}
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredServices.map((service, index) => {
            const IconComp = ICON_MAP[service.iconName] || Code2;
            const isFeatured = index === 0 || index === 3;
            const isTagMatched =
              hoveredTag && service.tags.some((t) => t.toLowerCase() === hoveredTag.toLowerCase());

            const cardContent = (
              <SpotlightCard
                onClick={() => setSelectedService(service)}
                className={`p-5 sm:p-8 flex flex-col justify-between group cursor-pointer h-full border transition-all duration-300 rounded-3xl ${
                  isTagMatched
                    ? "bg-accent-purple/20 border-accent-purple shadow-glow-purple text-white"
                    : isFeatured
                    ? "bg-surface/70 border-accent-purple/30 backdrop-blur-xl hover:border-accent-purple/60"
                    : "bg-surface/40 border-white/10 backdrop-blur-md hover:border-white/20"
                }`}
              >
                <div>
                  {/* Custom Graphic Banner */}
                  {service.image && (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-4 sm:mb-6 bg-[#050714]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B18] via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-xs font-mono font-bold text-accent-purple group-hover:text-accent-cyan transition-colors">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 group-hover:text-white group-hover:border-accent-purple/40 transition-all duration-300 shadow-md">
                      <IconComp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent-purple transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 sm:mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        onMouseEnter={() => setHoveredTag(tag)}
                        onMouseLeave={() => setHoveredTag(null)}
                        className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all duration-200 ${
                          hoveredTag === tag
                            ? "bg-accent-cyan text-[#070714] font-bold border-accent-cyan scale-105 shadow-glow-cyan"
                            : "bg-surface border-white/10 text-text-secondary hover:text-white hover:border-white/20"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-accent-cyan transition-colors">
                    <span>Inspect Capability</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </SpotlightCard>
            );

            return (
              <motion.div key={service.id} variants={itemVariants}>
                {isFeatured ? (
                  <TiltCard maxTilt={4} className="h-full">
                    {cardContent}
                  </TiltCard>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-surface/20 rounded-3xl border border-white/10 max-w-lg mx-auto">
            <Sparkles className="w-8 h-8 text-accent-purple mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">No matching capabilities</h4>
            <p className="text-xs text-text-secondary mb-4">
              Try adjusting your search query or select another category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Capabilities");
              }}
              className="text-xs text-accent-cyan font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Service Detail Drawer */}
      <ServiceDetailDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
