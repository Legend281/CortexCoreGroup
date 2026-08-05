"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Linkedin, Github, Mail, Phone, User, Quote, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["All Members", "Leadership", "Engineering", "Design", "Management"];

export interface TeamContentProps {
  members?: TeamMember[];
}

export const TeamContent: React.FC<TeamContentProps> = ({ members }) => {
  const list = members || TEAM_MEMBERS;
  const [activeCategory, setActiveCategory] = useState("All Members");

  const filteredTeam =
    activeCategory === "All Members"
      ? list
      : list.filter((m) => m.category === activeCategory);

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header + Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <Pill variant="eyebrow" className="mb-4">
              MEET THE TEAM
            </Pill>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              The Minds Behind Our <span className="text-gradient">Innovation</span>
            </h1>
            <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-xl">
              We are a passionate team of engineers, designers and strategists dedicated to crafting world-class digital products.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <span className="text-2xl font-bold text-white font-mono">15+</span>
              <p className="text-xs text-text-secondary mt-1">Team Members</p>
            </Card>
            <Card className="p-4 text-center">
              <span className="text-2xl font-bold text-white font-mono">5+ Yrs</span>
              <p className="text-xs text-text-secondary mt-1">Avg Experience</p>
            </Card>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}>
              <Pill variant="filter" active={activeCategory === cat}>
                {cat}
              </Pill>
            </button>
          ))}
        </div>

        {/* Pull Quote Card */}
        <div className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-surface via-surface-hover to-surface border border-accent-purple/30 relative overflow-hidden flex items-center gap-6">
            <Quote className="w-12 h-12 text-accent-purple/30 shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white italic">
                &ldquo;Great products are built by great teams. Innovation happens when technical expertise meets passion.&rdquo;
              </h3>
              <p className="text-xs text-accent-purple mt-2 font-semibold uppercase tracking-wider">
                — Cortex Leadership Philosophy
              </p>
            </div>
          </Card>
        </div>

        {/* Responsive Team Grid / Mobile Stacked Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* Responsive Card: Stacked column layout for mobile, structured card for desktop */}
              <Card className="h-full flex flex-col justify-between p-6 group">
                <div>
                  {/* Photo & Role Badge */}
                  <div className="relative w-full aspect-[4/3] rounded-xl bg-surface-hover border border-white/10 overflow-hidden mb-6 flex items-center justify-center group-hover:border-accent-purple/50 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-text-secondary">
                      <User className="w-12 h-12 text-accent-purple/60" />
                      <span className="text-xs font-mono uppercase tracking-wider">
                        [{member.name.toUpperCase()} PHOTO]
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-purple transition-colors">
                      {member.name}
                    </h3>
                    <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                      {member.category}
                    </Pill>
                  </div>

                  <p className="text-xs font-semibold text-accent-purple mb-3">
                    {member.role}
                  </p>

                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Tech Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {member.techStack.map((tech) => (
                      <Pill key={tech} variant="tag" className="text-[10px]">
                        {tech}
                      </Pill>
                    ))}
                  </div>
                </div>

                {/* Social Icon Links */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-transparent transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-transparent transition-all"
                      aria-label="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-transparent transition-all"
                      aria-label="Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Team Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 sm:p-12 max-w-3xl mx-auto border border-accent-purple/30 bg-surface/80 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Want to work with our team?
            </h3>
            <p className="text-sm text-text-secondary max-w-md mb-6">
              We are always looking for talented engineers, designers and innovators to join our studio.
            </p>
            <Button variant="primary" size="lg">
              Join Our Team
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
