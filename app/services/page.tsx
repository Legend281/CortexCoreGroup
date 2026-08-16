import React from "react";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesCatalog } from "@/components/sections/ServicesCatalog";
import { ServicesProcess } from "@/components/sections/ServicesProcess";
import { ServiceEstimator } from "@/components/sections/ServiceEstimator";
import { ServicesFAQ } from "@/components/sections/ServicesFAQ";
import { BottomCTA } from "@/components/sections/BottomCTA";

import { dataStore } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = dataStore.getServices();

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
