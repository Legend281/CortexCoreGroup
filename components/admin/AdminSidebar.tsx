"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FolderGit2,
  Users,
  MessageSquareQuote,
  Inbox,
  BookOpen,
  Settings,
  Activity,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Portfolio", href: "/admin/projects", icon: FolderGit2 },
  { name: "Team Roster", href: "/admin/team", icon: Users },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Inquiries", href: "/admin/messages", icon: Inbox },
  { name: "Blog Articles", href: "/admin/blog", icon: BookOpen },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Audit Logs", href: "/admin/logs", icon: Activity },
];

export interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUnreadCount(data.length);
      })
      .catch(() => {});
  }, [pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    if (onCloseMobile) onCloseMobile();
  }, [pathname, onCloseMobile]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      router.push("/admin/login");
    }
  };

  const NavContent = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="relative flex items-center justify-center pb-5 mb-5 border-b border-white/10 w-full text-center">
          <Link href="/admin" className="flex items-center justify-center group py-1 w-full">
            <Image
              src="/images/brand/cortex-logo.png"
              alt="Cortex Core Group"
              width={280}
              height={90}
              priority
              style={{ width: "auto" }}
              className="h-16 sm:h-20 max-w-[220px] object-contain brightness-115 contrast-105 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]"
            />
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-secondary hover:text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-accent-purple" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold text-accent-purple uppercase tracking-wider px-3 mb-2">
            Platform Management
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const IconComp = item.icon;
            const isMessages = item.href === "/admin/messages";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group min-h-[44px] active:scale-[0.98]",
                  isActive
                    ? "bg-accent-purple/20 text-white font-semibold border border-accent-purple/40 shadow-glow-purple"
                    : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <span className="flex items-center gap-3">
                  <IconComp
                    className={cn(
                      "w-4 h-4 transition-colors shrink-0",
                      isActive ? "text-accent-cyan" : "text-text-secondary group-hover:text-white"
                    )}
                  />
                  <span className="text-xs sm:text-sm">{item.name}</span>
                </span>

                {isMessages && unreadCount !== null && unreadCount > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Actions */}
      <div className="pt-4 sm:pt-5 border-t border-white/10 space-y-2.5 sm:space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-text-secondary hover:text-white hover:bg-white/5 transition-all border border-white/5"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Public Website</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            LIVE
          </span>
        </Link>

        <div className="p-2.5 sm:p-3 rounded-2xl bg-surface/60 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-glow-purple">
              AD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Administrator</div>
              <div className="text-[10px] font-mono text-emerald-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Root Access
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={onCloseMobile}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="w-72 sm:w-80 h-full bg-[#080B17] border-r border-white/15 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {NavContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 bg-[#080B17] border-r border-white/10 z-30">
        {NavContent}
      </aside>
    </>
  );
};
