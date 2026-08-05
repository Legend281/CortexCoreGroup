import React from "react";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesCatalog } from "@/components/sections/ServicesCatalog";
import { ServicesProcess } from "@/components/sections/ServicesProcess";
import { ServiceEstimator } from "@/components/sections/ServiceEstimator";
import { ServicesFAQ } from "@/components/sections/ServicesFAQ";
import { BottomCTA } from "@/components/sections/BottomCTA";

async function getServices() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch services catalog:", error);
    return null;
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Canvas Background & Capability Pills */}
      <ServicesHero />

      {/* 2. Interactive Searchable & Filterable Bento Catalog */}
      <ServicesCatalog services={services || undefined} />

      {/* 3. Engagement & Delivery Models (End-to-End Build, Augmentation, Audit) */}
      <ServicesProcess />

      {/* 4. Live Interactive Scope & Timeline Estimator Widget */}
      <ServiceEstimator />

      {/* 5. Frequently Asked Questions Accordion */}
      <ServicesFAQ />

      {/* 6. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
