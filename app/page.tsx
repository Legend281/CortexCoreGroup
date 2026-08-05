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

// Helper function to fetch database content from API endpoints
async function getApiData<T>(endpoint: string): Promise<T | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      next: { revalidate: 60 }, // Cache page data on server for 60 seconds
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint} from API:`, error);
    return null;
  }
}

export default async function HomePage() {
  // Fetch services, projects, team, and testimonials in parallel on the server
  const [services, projects, team, testimonials] = await Promise.all([
    getApiData<any[]>("services"),
    getApiData<any[]>("projects"),
    getApiData<any[]>("team"),
    getApiData<any[]>("testimonials"),
  ]);

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
