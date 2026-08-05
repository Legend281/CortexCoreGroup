import React from "react";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutTechMatrix } from "@/components/sections/AboutTechMatrix";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { BottomCTA } from "@/components/sections/BottomCTA";

async function getTeamData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/team`, {
      next: { revalidate: 60 }, // Cache server data for 60 seconds
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch team data for About page:", error);
    return null;
  }
}

export default async function AboutPage() {
  const teamMembers = await getTeamData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Canvas Background & Stats */}
      <AboutHero />

      {/* 2. Interactive Journey & Origin Story Timeline */}
      <AboutTimeline />

      {/* 3. Four Pillars & Engineering Principles Bento Box */}
      <AboutPrinciples />

      {/* 4. Interactive Technology & Architecture Stack Matrix */}
      <AboutTechMatrix />

      {/* 5. Full Leadership & Engineering Team Showcase */}
      <AboutTeam members={teamMembers || undefined} />

      {/* 6. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
