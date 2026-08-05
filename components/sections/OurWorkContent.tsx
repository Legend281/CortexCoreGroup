"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Layout, Heart, Star, Quote, Award, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All Projects",
  "Web Applications",
  "Mobile Apps",
  "Dashboards",
  "E-Commerce",
  "IoT Solutions",
  "Systems",
];

export interface OurWorkContentProps {
  projects?: ProjectItem[];
}

export const OurWorkContent: React.FC<OurWorkContentProps> = ({ projects }) => {
  const list = projects || PROJECTS;
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects =
    activeCategory === "All Projects"
      ? list
      : list.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Pill variant="eyebrow" className="mb-4">
              OUR PORTFOLIO
            </Pill>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Solutions We&apos;ve Built. <br />
              <span className="text-gradient">Impact We Deliver.</span>
            </h1>
            <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-xl">
              A showcase of digital products, platforms and systems we&apos;ve designed and developed for innovative companies and forward-thinking ideas.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/10 text-accent-purple mx-auto flex items-center justify-center mb-2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white font-mono">50+</span>
              <p className="text-[11px] text-text-secondary mt-0.5">Projects Delivered</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue mx-auto flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white font-mono">30+</span>
              <p className="text-[11px] text-text-secondary mt-0.5">Happy Clients</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-accent-magenta/10 text-accent-magenta mx-auto flex items-center justify-center mb-2">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-2xl font-bold text-white font-mono">5+</span>
              <p className="text-[11px] text-text-secondary mt-0.5">Industry Awards</p>
            </Card>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0"
            >
              <Pill variant="filter" active={activeCategory === cat}>
                {cat}
              </Pill>
            </button>
          ))}
        </div>

        {/* Alternating Project Rows */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group">
                  {/* Mockup Side */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full rounded-2xl bg-surface-hover border border-white/10 overflow-hidden group-hover:border-accent-purple/50 transition-colors flex items-center justify-center shadow-2xl">
                      <div className="flex flex-col items-center gap-2 text-text-secondary">
                        <Layout className="w-14 h-14 text-accent-purple/60" />
                        <span className="text-xs uppercase font-mono tracking-wider">
                          [{project.title.toUpperCase()} INTERFACE MOCKUP]
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Side */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-accent-purple">
                            {project.number}
                          </span>
                          <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2">
                            {project.categoryLabel}
                          </Pill>
                        </div>

                        {/* Likes & Ratings */}
                        <div className="flex items-center gap-3 text-xs text-text-secondary">
                          <div className="flex items-center gap-1 text-rose-400">
                            <Heart className="w-4 h-4 fill-rose-400" />
                            <span className="font-mono font-bold text-white">
                              {project.likeCount}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="font-bold text-white">{project.rating}.0</span>
                          </div>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors">
                        {project.title}
                      </h2>

                      <p className="text-sm text-text-secondary leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map((tech) => (
                          <Pill key={tech} variant="tag">
                            {tech}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote + Action */}
                    <div>
                      {project.testimonial && (
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                          <p className="text-xs text-text-secondary italic mb-2">
                            &ldquo;{project.testimonial.quote}&rdquo;
                          </p>
                          <span className="text-[11px] font-semibold text-white">
                            — {project.testimonial.author}, {project.testimonial.role}
                          </span>
                        </div>
                      )}

                      <Button variant="primary" size="md" showArrow className="w-full sm:w-auto">
                        Visit Project
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
