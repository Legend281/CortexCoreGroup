import React from "react";
import { OurWorkHero } from "@/components/sections/OurWorkHero";
import { OurWorkShowcase } from "@/components/sections/OurWorkShowcase";
import { OurWorkMetrics } from "@/components/sections/OurWorkMetrics";
import { BottomCTA } from "@/components/sections/BottomCTA";

import { dataStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function OurWorkPage() {
  const projects = dataStore.getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Canvas Background & Stats */}
      <OurWorkHero />

      {/* 2. Dual View Switcher Portfolio Showcase (3D MacOS TiltCard Frames + Bento Grid Mode) */}
      <OurWorkShowcase projects={projects || undefined} />

      {/* 3. Engineering Impact & Metrics Strip */}
      <OurWorkMetrics />

      {/* 4. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
