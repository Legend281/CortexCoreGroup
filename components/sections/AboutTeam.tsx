"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { TeamMemberDrawer } from "@/components/ui/TeamMemberDrawer";
import { Linkedin, Github, Mail, Phone, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export interface AboutTeamProps {
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

export const AboutTeam: React.FC<AboutTeamProps> = ({ members }) => {
  const list = members || TEAM_MEMBERS;
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

  const filteredMembers =
    activeCategory === "All Departments"
      ? normalizedList
      : normalizedList.filter((m) => m.category === activeCategory);

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
    <section className="py-24 relative bg-[#06060E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="MEET OUR TEAM"
          title="The Minds Behind Innovation"
          gradientWord="Innovation"
          description="Click any member to open their full profile and tech stack credentials."
          align="center"
        />

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}>
              <Pill variant="filter" active={activeCategory === cat}>
                {cat}
              </Pill>
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => {
            const avatarGradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
            const initials = getInitials(member.name);
            const isSkillMatch =
              hoveredTech && member.techStack.some((t) => t.toLowerCase() === hoveredTech.toLowerCase());

            return (
              <motion.div key={member.id} variants={cardVariants}>
                <SpotlightCard
                  onClick={() => setSelectedMember(member)}
                  className={`p-6 flex flex-col justify-between group cursor-pointer bg-surface/40 backdrop-blur-md border transition-all duration-300 h-full ${
                    isSkillMatch
                      ? "border-accent-purple shadow-glow-purple bg-surface/80"
                      : "border-white/10 hover:border-accent-purple/50 hover:-translate-y-1.5"
                  }`}
                >
                  <div>
                    {/* Top Header: Avatar + Category Pill */}
                    <div className="flex items-center gap-4 mb-5">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-14 h-14 rounded-2xl object-cover shadow-lg shrink-0 group-hover:scale-105 transition-transform border border-white/10"
                        />
                      ) : (
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-lg font-bold shadow-lg shrink-0 group-hover:scale-105 transition-transform`}>
                          {initials}
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-accent-purple transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-xs text-text-secondary font-medium">{member.role}</p>
                        <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2 mt-1">
                          {member.category}
                        </Pill>
                      </div>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Tech Stack Tags with Hover Skill Highlighting */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {member.techStack.map((tech) => (
                        <div
                          key={tech}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
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

                  {/* Bottom Action bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
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
