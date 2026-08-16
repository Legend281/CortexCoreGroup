import React from "react";
import { HeroVariantA } from "@/components/sections/HeroVariantA";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { TeamStrip } from "@/components/sections/TeamStrip";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { BottomCTA } from "@/components/sections/BottomCTA";

import { dataStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = dataStore.getServices();
  const projects = dataStore.getProjects();
  const team = dataStore.getTeam();
  const testimonials = dataStore.getTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Brand Centerpiece & Trust Stats */}
      <HeroVariantA />

      {/* 2. Trusted Brands Infinite Horizontal Marquee Ticker */}
      <TrustedBrands />

      {/* 3. Services Catalog Grid */}
      <ServicesGrid services={services || undefined} />

      {/* 4. Featured Case Studies & Interactive UI Previews */}
      <FeaturedWork projects={projects || undefined} />

      {/* 5. Interactive 4-Step Engineering Process Pipeline */}
      <HowWeWork />

      {/* 6. About Us & Human + AI Architecture Philosophy */}
      <AboutTeaser />

      {/* 7. Dedicated Team Highlight Strip */}
      <TeamStrip
        title="The Minds Behind Innovation"
        gradientWord="Innovation"
        members={team || undefined}
      />

      {/* 8. Why Choose Us Value Props */}
      <WhyChooseUs />

      {/* 9. Client Testimonials */}
      <Testimonials testimonials={testimonials || undefined} />

      {/* 10. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
