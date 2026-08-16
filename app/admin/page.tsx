"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import {
  Layers,
  FolderGit2,
  Users,
  Inbox,
  PlusCircle,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    team: 0,
    testimonials: 0,
    messages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [servicesRes, projectsRes, teamRes, testimonialsRes, messagesRes] =
        await Promise.all([
          fetch("/api/services").then((r) => r.json()).catch(() => []),
          fetch("/api/projects").then((r) => r.json()).catch(() => []),
          fetch("/api/team").then((r) => r.json()).catch(() => []),
          fetch("/api/testimonials").then((r) => r.json()).catch(() => []),
          fetch("/api/messages").then((r) => r.json()).catch(() => []),
        ]);

      setStats({
        services: Array.isArray(servicesRes) ? servicesRes.length : 0,
        projects: Array.isArray(projectsRes) ? projectsRes.length : 0,
        team: Array.isArray(teamRes) ? teamRes.length : 0,
        testimonials: Array.isArray(testimonialsRes) ? testimonialsRes.length : 0,
        messages: Array.isArray(messagesRes) ? messagesRes.length : 0,
      });

      if (Array.isArray(messagesRes)) {
        setRecentMessages(messagesRes.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Pill variant="eyebrow" className="text-[10px]">
              MASTER OVERVIEW
            </Pill>
            <span className="text-[11px] font-mono text-emerald-400">● Systems Nominal</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            Cortex Management Control
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Real-time platform operations, client leads, capabilities catalog, and case studies.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={fetchDashboardData}
            disabled={loading}
            className="text-xs font-mono min-h-[40px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
          <Link href="/admin/messages">
            <Button variant="primary" size="md" showArrow className="shadow-glow-purple text-xs font-bold min-h-[40px]">
              Inquiries ({stats.messages})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards (2x2 Grid on Mobile for Maximum Density) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Metric 1: Services */}
        <Link href="/admin/services" className="block">
          <SpotlightCard className="p-4 sm:p-6 bg-surface/50 border border-white/10 hover:border-accent-purple/50 rounded-2xl sm:rounded-3xl transition-all duration-200 group h-full">
            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-accent-purple group-hover:scale-105 transition-transform shrink-0">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-accent-purple font-semibold">
                Manage →
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 font-mono">{stats.services}</div>
            <div className="text-[11px] sm:text-xs text-text-secondary font-medium truncate">Capabilities & Services</div>
          </SpotlightCard>
        </Link>

        {/* Metric 2: Projects */}
        <Link href="/admin/projects" className="block">
          <SpotlightCard className="p-4 sm:p-6 bg-surface/50 border border-white/10 hover:border-accent-purple/50 rounded-2xl sm:rounded-3xl transition-all duration-200 group h-full">
            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform shrink-0">
                <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-accent-cyan font-semibold">
                Manage →
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 font-mono">{stats.projects}</div>
            <div className="text-[11px] sm:text-xs text-text-secondary font-medium truncate">Portfolio Case Studies</div>
          </SpotlightCard>
        </Link>

        {/* Metric 3: Team */}
        <Link href="/admin/team" className="block">
          <SpotlightCard className="p-4 sm:p-6 bg-surface/50 border border-white/10 hover:border-accent-purple/50 rounded-2xl sm:rounded-3xl transition-all duration-200 group h-full">
            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-pink-400 font-semibold">
                Manage →
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 font-mono">{stats.team}</div>
            <div className="text-[11px] sm:text-xs text-text-secondary font-medium truncate">Team Staff</div>
          </SpotlightCard>
        </Link>

        {/* Metric 4: Inquiries */}
        <Link href="/admin/messages" className="block">
          <SpotlightCard className="p-4 sm:p-6 bg-surface/50 border border-white/10 hover:border-accent-purple/50 rounded-2xl sm:rounded-3xl transition-all duration-200 group h-full">
            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <Inbox className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-semibold">
                Inbox →
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 font-mono">{stats.messages}</div>
            <div className="text-[11px] sm:text-xs text-text-secondary font-medium truncate">Client Leads</div>
          </SpotlightCard>
        </Link>
      </div>

      {/* Quick Launch Control Strip */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#090C1A] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-purple shrink-0" />
            <span>Quick Content Publishing</span>
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Instantly add records that publish live to the public website without redeployments.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto">
          <Link href="/admin/services" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full text-xs min-h-[38px]">
              <PlusCircle className="w-3.5 h-3.5 mr-1 shrink-0" /> Service
            </Button>
          </Link>
          <Link href="/admin/projects" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full text-xs min-h-[38px]">
              <PlusCircle className="w-3.5 h-3.5 mr-1 shrink-0" /> Project
            </Button>
          </Link>
          <Link href="/admin/team" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full text-xs min-h-[38px]">
              <PlusCircle className="w-3.5 h-3.5 mr-1 shrink-0" /> Member
            </Button>
          </Link>
          <Link href="/admin/testimonials" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full text-xs min-h-[38px]">
              <PlusCircle className="w-3.5 h-3.5 mr-1 shrink-0" /> Review
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Client Leads Section */}
      <div className="p-4 sm:p-8 rounded-3xl bg-surface/40 border border-white/10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Recent Client Inquiries</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Live inquiries received through public contact forms
            </p>
          </div>
          <Link href="/admin/messages" className="text-xs font-mono text-accent-purple hover:underline shrink-0">
            View All →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="py-8 sm:py-12 text-center text-text-secondary text-xs font-mono bg-[#050712] rounded-2xl border border-white/5">
            No incoming inquiries yet. All received contact scopes will appear here.
          </div>
        ) : (
          <>
            {/* Mobile View: High-density card list (<md) */}
            <div className="md:hidden space-y-2.5">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-2xl bg-[#060814] border border-white/10 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{msg.name}</div>
                      <div className="text-[10px] text-text-secondary font-mono truncate max-w-[180px]">{msg.email}</div>
                    </div>
                    <Pill variant="tag" className="text-[9px]">
                      {msg.service}
                    </Pill>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5 font-mono">
                    <span className="text-emerald-400 font-semibold">{msg.budget || "Custom"}</span>
                    <Link
                      href={`/admin/messages?id=${msg.id}`}
                      className="text-accent-cyan font-bold hover:underline"
                    >
                      Inspect →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Full Data Table (>=md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-text-secondary font-mono uppercase tracking-wider">
                    <th className="pb-3 px-3">Client Name</th>
                    <th className="pb-3 px-3">Service Requested</th>
                    <th className="pb-3 px-3">Budget Tier</th>
                    <th className="pb-3 px-3">Date</th>
                    <th className="pb-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{msg.name}</div>
                        <div className="text-[11px] text-text-secondary font-mono">{msg.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <Pill variant="tag" className="text-[10px]">
                          {msg.service}
                        </Pill>
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">
                        {msg.budget || "Custom Scope"}
                      </td>
                      <td className="py-3 px-3 text-text-secondary font-mono">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/messages?id=${msg.id}`}
                          className="text-xs font-mono text-accent-cyan hover:underline"
                        >
                          Inspect Lead →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
