import React from "react";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutTechMatrix } from "@/components/sections/AboutTechMatrix";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { BottomCTA } from "@/components/sections/BottomCTA";

import { dataStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const teamMembers = dataStore.getTeam();

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
