"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { TeamMemberDrawer } from "@/components/ui/TeamMemberDrawer";
import {
  Search,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface TeamDirectoryProps {
  members?: TeamMember[];
}

const CATEGORIES = ["All Departments", "Leadership", "Engineering", "Design", "Management"];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const AVATAR_GRADIENTS = [
  "from-purple-600 to-indigo-600",
  "from-blue-600 to-cyan-500",
  "from-pink-600 to-purple-600",
  "from-emerald-600 to-teal-500",
  "from-amber-500 to-orange-600",
  "from-indigo-600 to-purple-700",
];

const MEMBER_STATUS: Record<string, string> = {
  "1": "Founder // Lead Full Stack Dev",
  "2": "CTO // Cloud Infrastructure",
  "3": "Head of Design // UI/UX Systems",
  "4": "Agile Delivery // Client Success",
  "5": "AI Researcher // Fine-Tuning LLMs",
  "6": "Backend Architect // Distributed APIs",
};

export const TeamDirectory: React.FC<TeamDirectoryProps> = ({ members }) => {
  const list = members || TEAM_MEMBERS;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Departments");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const normalizedList = list.map((member) => ({
    ...member,
    socials: member.socials || {
      linkedin: (member as any).linkedin || undefined,
      github: (member as any).github || undefined,
      email: (member as any).email || undefined,
      whatsapp: (member as any).whatsapp || undefined,
      portfolio: (member as any).portfolio || undefined,
    },
  }));

  const filteredMembers = useMemo(() => {
    return normalizedList.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === "All Departments" || m.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [normalizedList, searchQuery, activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section id="team-directory" className="py-16 sm:py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="TEAM DIRECTORY"
          title="Engineers, Designers & Innovators"
          gradientWord="Innovators"
          description="Filter our engineering and leadership staff. Tap any member to inspect credentials and book an intro call."
          align="center"
        />

        {/* Skill Density Radar Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12 bg-surface/40 backdrop-blur-xl p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl">
          <div className="p-2.5 sm:p-3 text-center">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent-purple uppercase block mb-0.5 sm:mb-1">
              FULLSTACK DEVS
            </span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">6 Specialists</span>
          </div>

          <div className="p-2.5 sm:p-3 text-center border-l border-white/10">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent-cyan uppercase block mb-0.5 sm:mb-1">
              AI & LLM LEADS
            </span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">3 Leads</span>
          </div>

          <div className="p-2.5 sm:p-3 text-center border-l border-white/10">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400 uppercase block mb-0.5 sm:mb-1">
              CLOUD DEVOPS
            </span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">4 Architects</span>
          </div>

          <div className="p-2.5 sm:p-3 text-center border-l border-white/10">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase block mb-0.5 sm:mb-1">
              UI/UX DESIGN
            </span>
            <span className="text-base sm:text-xl font-bold text-white font-mono">2 Designers</span>
          </div>
        </div>

        {/* Search Bar + Department Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-4 mb-8 sm:mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team (e.g. Next.js, AI, Randy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/60 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          {/* Department Tabs */}
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

        {/* Team Grid */}
        <motion.div
          key={`${activeCategory}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredMembers.map((member, index) => {
            const avatarGradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
            const initials = getInitials(member.name);
            const statusMsg = MEMBER_STATUS[member.id] || member.role;
            const isSkillMatch =
              hoveredTech && member.techStack.some((t) => t.toLowerCase() === hoveredTech.toLowerCase());

            return (
              <motion.div key={member.id} variants={cardVariants}>
                <SpotlightCard
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 sm:p-5 flex flex-col justify-between group cursor-pointer bg-surface/40 backdrop-blur-md border transition-all duration-300 h-full rounded-3xl ${
                    isSkillMatch
                      ? "bg-accent-purple/20 border-accent-purple shadow-glow-purple"
                      : "border-white/10 hover:border-accent-purple/50 hover:-translate-y-1"
                  }`}
                >
                  <div>
                    {/* Large Portrait Image Frame */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl mb-4 sm:mb-5 overflow-hidden bg-[#090B16] border border-white/10 group-hover:border-accent-purple/60 transition-all duration-300">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-3xl sm:text-4xl font-bold font-sans shadow-inner`}>
                          {initials}
                        </div>
                      )}
                      {/* Gradient overlay at the bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06060E]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3">
                        <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2.5 bg-black/70 backdrop-blur-md border-white/20">
                          {member.category}
                        </Pill>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono text-emerald-400 font-semibold max-w-[90%] truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="truncate">{statusMsg}</span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-accent-purple transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary font-medium mt-0.5 mb-2.5 sm:mb-3">{member.role}</p>

                    {/* Bio */}
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 sm:mb-5 line-clamp-2">
                      {member.bio}
                    </p>

                    {/* Tech Stack Pills with Cross-Highlighting */}
                    <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                      {member.techStack.map((tech) => (
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
                            className={`text-[10px] transition-all ${
                              hoveredTech === tech ? "bg-accent-purple text-white shadow-glow-purple" : ""
                            }`}
                          >
                            {tech}
                          </Pill>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Action Bar */}
                  <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-accent-purple group-hover:text-white transition-colors flex items-center gap-1">
                      View Profile <ExternalLink className="w-3 h-3" />
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple transition-all"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-3 h-3" />
                        </a>
                      )}
                      {member.socials.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple transition-all"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Member Profile Drawer */}
      <TeamMemberDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};
