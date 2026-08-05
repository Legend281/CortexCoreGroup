"use client";

import React, { useState, useEffect } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { MapPin, Mail, Phone, Clock, Globe, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const LOCATIONS = [
  {
    city: "Douala HQ",
    country: "Cameroon",
    timezone: "WAT (GMT+1)",
    offsetHours: 1,
    address: "Cortex Technology Tower, Douala / Buea, South West Region",
    email: "hq@cortexcoregroup.com",
    phone: "+237 6 12 34 56 76",
    role: "Global Headquarters & Core R&D Engine",
    badge: "PRIMARY HQ",
  },
  {
    city: "London Hub",
    country: "United Kingdom",
    timezone: "BST (GMT+0)",
    offsetHours: 0,
    address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
    email: "london@cortexcoregroup.com",
    phone: "+44 20 7946 0912",
    role: "European Enterprise Architecture & Strategy",
    badge: "EUROPE HUB",
  },
  {
    city: "New York Hub",
    country: "United States",
    timezone: "EST (GMT-4)",
    offsetHours: -4,
    address: "One World Trade Center, 28th Floor, New York, NY 10007",
    email: "ny@cortexcoregroup.com",
    phone: "+1 212 555 0198",
    role: "North American Client Operations & Strategy",
    badge: "AMERICAS HUB",
  },
];

export const ContactLocations: React.FC = () => {
  const [times, setTimes] = useState<Record<string, string>>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateLocalTimes = () => {
      const now = new Date();
      const newTimes: Record<string, string> = {};

      LOCATIONS.forEach((loc) => {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const targetTime = new Date(utc + 3600000 * loc.offsetHours);
        const timeStr = targetTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        newTimes[loc.city] = timeStr;
      });

      setTimes(newTimes);
    };

    updateLocalTimes();
    const interval = setInterval(updateLocalTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hubs" className="py-24 relative bg-[#06060E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="GLOBAL HUBS"
          title="Our Office Locations & Regional Clocks"
          gradientWord="Locations"
          description="Operating across 3 global hubs to provide 24/7 client coverage and engineering support."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCATIONS.map((loc) => (
            <SpotlightCard
              key={loc.city}
              className="p-8 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent-purple" />
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-purple transition-colors">
                      {loc.city}
                    </h3>
                  </div>
                  <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                    {loc.badge}
                  </Pill>
                </div>

                <span className="text-xs font-mono font-semibold text-accent-cyan block mb-4">
                  {loc.role}
                </span>

                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {loc.address}
                </p>

                {/* Local Clock */}
                <div className="p-4 rounded-2xl bg-[#040612] border border-white/10 mb-6 flex items-center justify-between font-mono">
                  <span className="text-[10px] text-text-secondary uppercase">{loc.timezone}</span>
                  <span className="text-base font-bold text-emerald-400">
                    {times[loc.city] || "12:00:00 PM"}
                  </span>
                </div>
              </div>

              {/* Direct Links */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <a
                  href={`mailto:${loc.email}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent-purple" />
                  <span>{loc.email}</span>
                </a>
                <a
                  href={`tel:${loc.phone.replace(/ /g, "")}`}
                  className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>{loc.phone}</span>
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
