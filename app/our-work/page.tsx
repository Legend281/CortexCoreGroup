import React from "react";
import { OurWorkHero } from "@/components/sections/OurWorkHero";
import { OurWorkShowcase } from "@/components/sections/OurWorkShowcase";
import { OurWorkMetrics } from "@/components/sections/OurWorkMetrics";
import { BottomCTA } from "@/components/sections/BottomCTA";

async function getProjects() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch portfolio projects:", error);
    return null;
  }
}

export default async function OurWorkPage() {
  const projects = await getProjects();

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
