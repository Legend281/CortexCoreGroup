"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Clock, Menu, Search } from "lucide-react";

export interface AdminHeaderProps {
  onOpenMobileSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenMobileSidebar,
}) => {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toUTCString().slice(17, 25) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    if (pathname === "/admin") return "Master Overview";
    if (pathname.includes("/admin/services")) return "Services";
    if (pathname.includes("/admin/projects")) return "Portfolio";
    if (pathname.includes("/admin/team")) return "Team Roster";
    if (pathname.includes("/admin/testimonials")) return "Testimonials";
    if (pathname.includes("/admin/messages")) return "Inquiries";
    if (pathname.includes("/admin/blog")) return "Blog Articles";
    if (pathname.includes("/admin/settings")) return "Global Settings";
    if (pathname.includes("/admin/logs")) return "Audit Logs";
    return "Admin Dashboard";
  };

  return (
    <header className="h-16 sm:h-18 border-b border-white/10 bg-[#080B17]/90 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0 relative">
      {/* Left: Mobile Hamburger or Desktop Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2.5 rounded-xl bg-surface/90 border border-white/15 text-white active:scale-95 transition-all shadow-sm"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-accent-purple" />
          </button>
        )}

        {/* Desktop Page Title */}
        <div className="hidden lg:block">
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>{getPageTitle()}</span>
          </h1>
          <div className="text-[10px] font-mono text-text-secondary">
            Cortex Core Group Management Shell
          </div>
        </div>
      </div>

      {/* Mobile Centralized Logo */}
      <Link
        href="/admin"
        className="lg:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center group"
      >
        <Image
          src="/images/brand/cortex-logo.png"
          alt="Cortex Core Group"
          width={220}
          height={70}
          priority
          style={{ width: "auto" }}
          className="h-11 sm:h-13 max-w-[160px] object-contain brightness-115 contrast-105 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_18px_rgba(59,130,246,0.45)]"
        />
      </Link>

      {/* Right: Search ⌘K + DB Status + Clock */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Command Trigger */}
        <button
          onClick={() => {
            const event = new KeyboardEvent("keydown", {
              key: "k",
              ctrlKey: true,
              bubbles: true,
            });
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface/80 border border-white/10 hover:border-accent-purple/50 text-xs font-mono text-text-secondary hover:text-white transition-all shadow-sm active:scale-95"
          aria-label="Command search"
        >
          <Search className="w-3.5 h-3.5 text-accent-purple shrink-0" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] sm:text-[10px] border border-white/10 font-bold">⌘K</kbd>
        </button>

        {/* UTC Clock (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface/60 border border-white/10 text-xs font-mono text-emerald-400">
          <Clock className="w-3.5 h-3.5 text-accent-cyan" />
          <span>{time || "12:00:00 UTC"}</span>
        </div>

        {/* Database Status Dot */}
        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="hidden sm:inline font-bold">Live DB</span>
        </div>
      </div>
    </header>
  );
};
