import React from "react";
import { TeamHero } from "@/components/sections/TeamHero";
import { TeamActivity } from "@/components/sections/TeamActivity";
import { TeamDirectory } from "@/components/sections/TeamDirectory";
import { TeamPhilosophy } from "@/components/sections/TeamPhilosophy";
import { TeamCulture } from "@/components/sections/TeamCulture";
import { BottomCTA } from "@/components/sections/BottomCTA";

import { dataStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = dataStore.getTeam();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Canvas Background & Team Stats */}
      <TeamHero />

      {/* 2. Real-Time Engineering Commit & Velocity Ticker */}
      <TeamActivity />

      {/* 3. Interactive Searchable & Filterable Team Directory */}
      <TeamDirectory members={team || undefined} />

      {/* 4. Leadership & Engineering Quote Carousel */}
      <TeamPhilosophy />

      {/* 5. Engineering Culture & Pillars Bento Box */}
      <TeamCulture />

      {/* 6. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
