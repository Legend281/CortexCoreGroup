"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Linkedin, Github, Mail, Award, Code2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export interface TeamStripProps {
  title?: string;
  gradientWord?: string;
  eyebrow?: string;
  members?: TeamMember[];
}

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
];

export const TeamStrip: React.FC<TeamStripProps> = ({
  title = "The Minds Behind Innovation",
  gradientWord = "Innovation",
  eyebrow = "MEET THE TEAM",
  members,
}) => {
  const list = members || TEAM_MEMBERS;
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
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
    <section className="py-24 relative bg-[#06060E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          gradientWord={gradientWord}
          action={
            <Link href="/team">
              <Button variant="secondary" size="md" showArrow className="active:scale-95 transition-transform">
                View All Team
              </Button>
            </Link>
          }
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {normalizedList.slice(0, 5).map((member, index) => {
            const avatarGradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
            const initials = getInitials(member.name);
            const isHovered = hoveredMember === member.id;

            return (
              <motion.div key={member.id} variants={cardVariants}>
                <SpotlightCard
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="p-5 text-center group flex flex-col items-center bg-surface/40 backdrop-blur-md border border-white/10 hover:border-accent-purple/50 hover:-translate-y-1.5 transition-all duration-300 h-full justify-between"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Large Portrait Image Frame */}
                    <div className="relative w-full aspect-[4/5] rounded-2xl mb-4 overflow-hidden border border-white/10 bg-[#090B16] group-hover:border-accent-purple/60 transition-all duration-300">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 20vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-3xl font-bold font-sans`}>
                          {initials}
                        </div>
                      )}

                      {/* Floating Category Pill */}
                      <div className="absolute top-2 left-2">
                        <Pill variant="eyebrow" className="text-[8px] py-0.5 px-2 bg-black/70 backdrop-blur-md border-white/20">
                          {member.category}
                        </Pill>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-accent-purple transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5 font-medium mb-3">{member.role}</p>

                    {/* Skill Tech Stack Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-1 mb-4">
                      {member.techStack.slice(0, 3).map((tech) => (
                        <Pill key={tech} variant="tag" className="text-[9px] py-0.5 px-1.5">
                          {tech}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 w-full">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-transparent active:scale-95 transition-all"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-transparent active:scale-95 transition-all"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.email && (
                      <a
                        href={`mailto:${member.socials.email}`}
                        className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent-purple hover:border-transparent active:scale-95 transition-all"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
