"use client";

import React, { Suspense } from "react";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactLocations } from "@/components/sections/ContactLocations";
import { ContactFAQ } from "@/components/sections/ContactFAQ";
import { BottomCTA } from "@/components/sections/BottomCTA";

function ContactFormFallback() {
  return (
    <div className="py-24 text-center text-text-secondary text-sm font-mono">
      Loading scope inquiry form...
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Canvas Background & Operational Status */}
      <ContactHero />

      {/* 2. Interactive Scope Builder & Inquiry Form (Wrapped in Suspense for useSearchParams) */}
      <Suspense fallback={<ContactFormFallback />}>
        <ContactFormSection />
      </Suspense>

      {/* 3. Global Office Hubs Bento Box with Live Local Clocks */}
      <ContactLocations />

      {/* 4. Pre-Inquiry FAQ Accordion */}
      <ContactFAQ />

      {/* 5. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
