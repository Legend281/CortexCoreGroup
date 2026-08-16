"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, ServiceItem } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { ServiceDetailDrawer } from "@/components/ui/ServiceDetailDrawer";
import {
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Smartphone,
  Settings2,
  Infinity as InfinityIcon,
  Briefcase,
  Wifi,
  Camera,
  GitBranch,
  Database,
  Megaphone,
  Monitor,
  Boxes,
  Headphones,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Smartphone,
  Settings2,
  Infinity: InfinityIcon,
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
  "AI & ML",
  "Web Platforms",
  "Cloud & DevOps",
  "Mobile Apps",
  "Security",
];

const ICON_STYLES = [
  "bg-gradient-accent text-white shadow-glow-purple",
  "bg-accent-blue/15 border border-accent-blue/40 text-accent-blue",
  "bg-accent-magenta/15 border border-accent-magenta/40 text-accent-magenta",
  "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400",
  "bg-amber-500/15 border border-amber-500/40 text-amber-400",
  "bg-accent-purple/20 border border-accent-purple/50 text-accent-purple",
];

export interface ServicesGridProps {
  services?: ServiceItem[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  const list = services || SERVICES;
  const [activeCategory, setActiveCategory] = useState("All Capabilities");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredServices =
    activeCategory === "All Capabilities"
      ? list
      : list.filter((s) => {
          if (activeCategory === "AI & ML") return s.tags.some((t) => /AI|LLM|Machine|Data/i.test(t));
          if (activeCategory === "Web Platforms") return s.tags.some((t) => /Next|React|Full Stack|Web/i.test(t));
          if (activeCategory === "Cloud & DevOps") return s.tags.some((t) => /Cloud|DevOps|AWS|Docker/i.test(t));
          if (activeCategory === "Mobile Apps") return s.tags.some((t) => /Mobile|Flutter|iOS|Android/i.test(t));
          if (activeCategory === "Security") return s.tags.some((t) => /Security|Audit|Compliance/i.test(t));
          return true;
        });

  const displayedServices =
    activeCategory === "All Capabilities"
      ? filteredServices.slice(0, 5)
      : filteredServices;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
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
          eyebrow="OUR SERVICES"
          title="Comprehensive Capabilities to Accelerate Enterprise Growth"
          gradientWord="Enterprise"
          description="Explore our specialized software, AI, cybersecurity, and cloud capabilities."
          action={
            <Link href="/services">
              <Button variant="secondary" size="md" showArrow className="active:scale-95 transition-transform">
                Full Service Catalog
              </Button>
            </Link>
          }
        />

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}>
              <Pill variant="filter" active={activeCategory === cat}>
                {cat}
              </Pill>
            </button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Code2;
            const iconStyle = ICON_STYLES[index % ICON_STYLES.length];
            const isFeaturedHero = index === 0;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={isFeaturedHero ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <SpotlightCard
                  className={`h-full flex flex-col justify-between p-6 sm:p-8 group cursor-pointer transition-all duration-300 ${
                    isFeaturedHero
                      ? "bg-gradient-to-br from-surface/90 via-surface/60 to-surface/90 border-accent-purple/40 backdrop-blur-2xl shadow-glow-purple"
                      : "bg-surface/40 border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <div>
                    {/* Optional Custom Graphic Banner */}
                    {service.image && (
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-6 bg-[#050714]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1B]/80 via-transparent to-transparent opacity-40" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${iconStyle}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {isFeaturedHero && (
                          <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2.5">
                            FLAGSHIP CAPABILITY
                          </Pill>
                        )}
                      </div>
                      <span className="text-sm font-mono font-bold text-text-secondary group-hover:text-white transition-colors">
                        {service.number}
                      </span>
                    </div>

                    <h3 className={`font-bold text-white mb-3 group-hover:text-accent-purple transition-colors ${
                      isFeaturedHero ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}>
                      {service.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.tags.map((tag) => (
                        <Pill key={tag} variant="tag" className="text-[10px]">
                          {tag}
                        </Pill>
                      ))}
                    </div>

                    {/* Explore Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-accent-purple hover:text-white transition-colors group/link active:scale-95"
                    >
                      <span>Explore Capability</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View More Services Button */}
        {activeCategory === "All Capabilities" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <Link href="/services">
              <Button variant="primary" size="lg" showArrow className="group shadow-glow-purple">
                Explore All {list.length} Capabilities
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Slide-Over Service Detail Drawer */}
      <ServiceDetailDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
