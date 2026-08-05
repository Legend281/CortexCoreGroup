"use client";

import React, { useState, useEffect } from "react";
import { Globe, Clock, MapPin, CheckCircle2, Zap } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Hub {
  id: string;
  name: string;
  region: string;
  timezone: string;
  utcOffset: number; // in hours
  status: string;
  projects: string;
  coords: string;
}

const HUBS: Hub[] = [
  {
    id: "douala",
    name: "Douala HQ",
    region: "Africa / Global Operations",
    timezone: "WAT (GMT+1)",
    utcOffset: 1,
    status: "Headquarters // Active",
    projects: "30+ Enterprise Systems",
    coords: "4.0511° N, 9.7679° E",
  },
  {
    id: "london",
    name: "London Hub",
    region: "Europe / Client Relations",
    timezone: "BST (GMT+1)",
    utcOffset: 1,
    status: "Regional Hub // Active",
    projects: "15+ Platforms Shipped",
    coords: "51.5074° N, 0.1278° W",
  },
  {
    id: "ny",
    name: "New York Hub",
    region: "North America / Strategy",
    timezone: "EST (GMT-4)",
    utcOffset: -4,
    status: "Regional Hub // Active",
    projects: "10+ Cloud Deployments",
    coords: "40.7128° N, 74.0060° W",
  },
];

export const GlobalHubRadar: React.FC = () => {
  const [activeHubId, setActiveHubId] = useState("douala");
  const [currentTime, setCurrentTime] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  const activeHub = HUBS.find((h) => h.id === activeHubId) || HUBS[0];

  // Update live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const targetTime = new Date(utc + 3600000 * activeHub.utcOffset);
      setCurrentTime(
        targetTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [activeHub]);

  return (
    <div className="w-full rounded-2xl bg-[#080B18]/90 border border-purple-500/30 backdrop-blur-xl p-5 shadow-2xl shadow-purple-950/40 text-left overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent-cyan" />
          <span className="text-[11px] font-mono text-text-secondary font-medium">
            cortex // global-presence-radar
          </span>
        </div>

        {/* Hub selector tabs */}
        <div className="flex items-center gap-1 bg-surface/60 p-1 rounded-lg border border-white/10">
          {HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setActiveHubId(hub.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all ${
                activeHubId === hub.id
                  ? "bg-accent-purple text-white shadow-glow-purple"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {hub.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Hub Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHubId}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-purple" />
                <h4 className="text-base font-bold text-white">{activeHub.name}</h4>
              </div>
              <span className="text-[11px] font-mono text-text-secondary">{activeHub.region}</span>
            </div>

            {/* Live Clock Ticker */}
            <div className="text-right bg-surface/80 px-3 py-1.5 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>{currentTime || "12:00:00 PM"}</span>
              </div>
              <span className="text-[9px] font-mono text-text-secondary block">{activeHub.timezone}</span>
            </div>
          </div>

          {/* Hub Status Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface/60 border border-white/10">
              <span className="text-[10px] font-mono text-text-secondary block">HUB STATUS</span>
              <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 shrink-0" /> {activeHub.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface/60 border border-white/10">
              <span className="text-[10px] font-mono text-text-secondary block">DELIVERIES</span>
              <span className="text-xs font-bold text-white font-mono mt-0.5 block">{activeHub.projects}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-text-secondary">
            <span>Coordinates: {activeHub.coords}</span>
            <span className="text-accent-cyan font-semibold">24/7 Operations</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
