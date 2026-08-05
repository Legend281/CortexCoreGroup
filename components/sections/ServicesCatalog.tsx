"use client";

import React, { useState, useMemo } from "react";
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
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section id="services-catalog" className="py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="CAPABILITIES CATALOG"
          title="Interactive Services & Specializations"
          gradientWord="Specializations"
          description="Filter or search our 16 enterprise capabilities. Hover tags to highlight matching technologies across the studio."
          align="center"
        />

        {/* Search Bar + Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search capabilities (e.g. AI, Cloud, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/60 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}>
                <Pill variant="filter" active={activeCategory === cat}>
                  {cat}
                </Pill>
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => {
            const IconComp = ICON_MAP[service.iconName] || Code2;
            const isFeatured = index === 0 || index === 3;
            const isTagMatched =
              hoveredTag && service.tags.some((t) => t.toLowerCase() === hoveredTag.toLowerCase());

            const cardContent = (
              <SpotlightCard
                onClick={() => setSelectedService(service)}
                className={`p-8 flex flex-col justify-between group cursor-pointer h-full border transition-all duration-300 ${
                  isTagMatched
                    ? "bg-accent-purple/20 border-accent-purple shadow-glow-purple text-white"
                    : isFeatured
                    ? "bg-surface/70 border-accent-purple/30 backdrop-blur-xl hover:border-accent-purple/60"
                    : "bg-surface/40 border-white/10 backdrop-blur-md hover:border-white/20"
                }`}
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-accent-purple/20 transition-all">
                      <IconComp className="w-6 h-6 text-accent-purple" />
                    </div>
                    <div className="flex items-center gap-2">
                      {isFeatured && (
                        <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                          FLAGSHIP CAPABILITY
                        </Pill>
                      )}
                      <span className="text-xl font-mono font-bold text-text-secondary">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Tech Tags with Cross-Service Highlighting */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
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
                          className={`transition-all ${
                            hoveredTag === tag ? "bg-accent-purple text-white shadow-glow-purple" : ""
                          }`}
                        >
                          {tag}
                        </Pill>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Trigger */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-accent-purple group-hover:text-white transition-colors">
                  <span>Inspect Capability & Scope</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            );

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
              >
                {isFeatured ? <TiltCard maxTilt={6}>{cardContent}</TiltCard> : cardContent}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Slide-Over Drawer for Selected Service */}
      <ServiceDetailDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
