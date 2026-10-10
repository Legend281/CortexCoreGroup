"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  LayoutDashboard,
  Layers,
  Briefcase,
  Users,
  FileText,
  Mail,
  Quote,
  Settings,
  Activity,
  PlusCircle,
  ExternalLink,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Quick Action";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

export const AdminCommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Listen for CMD+K or CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-dash",
      title: "Dashboard Overview",
      category: "Navigation",
      icon: LayoutDashboard,
      action: () => router.push("/admin"),
    },
    {
      id: "nav-services",
      title: "Services & Capabilities",
      category: "Navigation",
      icon: Layers,
      action: () => router.push("/admin/services"),
      badge: "16 Services",
    },
    {
      id: "nav-projects",
      title: "Portfolio Projects",
      category: "Navigation",
      icon: Briefcase,
      action: () => router.push("/admin/projects"),
      badge: "12 Projects",
    },
    {
      id: "nav-team",
      title: "Team & Leadership",
      category: "Navigation",
      icon: Users,
      action: () => router.push("/admin/team"),
      badge: "6 Members",
    },
    {
      id: "nav-blog",
      title: "Blog & Thought Leadership",
      category: "Navigation",
      icon: FileText,
      action: () => router.push("/admin/blog"),
      badge: "6 Articles",
    },
    {
      id: "nav-messages",
      title: "Client Inquiries & Leads",
      category: "Navigation",
      icon: Mail,
      action: () => router.push("/admin/messages"),
      badge: "Inbox",
    },
    {
      id: "nav-testimonials",
      title: "Client Testimonials",
      category: "Navigation",
      icon: Quote,
      action: () => router.push("/admin/testimonials"),
    },
    {
      id: "nav-logs",
      title: "Activity & Error Logs",
      category: "Navigation",
      icon: Activity,
      action: () => router.push("/admin/logs"),
    },
    {
      id: "nav-settings",
      title: "Platform Settings & Security",
      category: "Navigation",
      icon: Settings,
      action: () => router.push("/admin/settings"),
    },

    // Quick Actions
    {
      id: "action-new-service",
      title: "Create New Service",
      category: "Quick Action",
      icon: PlusCircle,
      action: () => router.push("/admin/services"),
      badge: "Add Service",
    },
    {
      id: "action-new-project",
      title: "Add New Portfolio Project",
      category: "Quick Action",
      icon: PlusCircle,
      action: () => router.push("/admin/projects"),
      badge: "Add Project",
    },
    {
      id: "action-new-blog",
      title: "Write New Blog Article",
      category: "Quick Action",
      icon: PlusCircle,
      action: () => router.push("/admin/blog"),
      badge: "New Article",
    },
    {
      id: "action-public-site",
      title: "View Public Live Website",
      category: "Quick Action",
      icon: ExternalLink,
      action: () => window.open("/", "_blank"),
      badge: "Open Website",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase()) ||
    (cmd.badge && cmd.badge.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
    setSearch("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-[#090B18] border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-accent-purple shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search modules (e.g. Services, Blog, Leads)..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-sm text-white placeholder-text-secondary focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-xs text-text-secondary font-mono">
                    No matching commands found
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const IconComp = cmd.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all text-left ${
                          isSelected
                            ? "bg-accent-purple/25 text-white border border-accent-purple/40 shadow-glow-purple"
                            : "text-text-secondary hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-accent-purple text-white" : "bg-white/5 text-text-secondary"
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-semibold">{cmd.title}</span>
                            <span className="text-[10px] text-text-secondary block font-mono">
                              {cmd.category}
                            </span>
                          </div>
                        </div>

                        {cmd.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-accent-cyan border border-white/10">
                            {cmd.badge}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Hotkey Hints */}
              <div className="px-5 py-3 border-t border-white/10 bg-[#050714] flex items-center justify-between text-[11px] font-mono text-text-secondary">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px]">ESC</kbd> Close
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px]">CTRL</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px]">K</kbd> Open
                  </span>
                </div>
                <span className="text-accent-purple font-bold">Cortex Admin Engine</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
