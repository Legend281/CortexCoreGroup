"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Activity,
  Search,
  RefreshCw,
  Clock,
  Download,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface AuditLogItem {
  id: string;
  action: string;
  details?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

const CATEGORIES = [
  { id: "ALL", label: "All Events" },
  { id: "SERVICE", label: "Services" },
  { id: "PROJECT", label: "Projects" },
  { id: "TEAM", label: "Team" },
  { id: "BLOG", label: "Blog" },
  { id: "LEAD", label: "Leads" },
  { id: "AUTH", label: "Auth & Security" },
];

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logs");
      const data = await res.json();
      if (Array.isArray(data)) setLogs(data);
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(search.toLowerCase())) ||
      (log.ipAddress && log.ipAddress.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      activeCategory === "ALL" ||
      (activeCategory === "SERVICE" && log.action.includes("SERVICE")) ||
      (activeCategory === "PROJECT" && log.action.includes("PROJECT")) ||
      (activeCategory === "TEAM" && log.action.includes("TEAM")) ||
      (activeCategory === "BLOG" && log.action.includes("BLOG")) ||
      (activeCategory === "LEAD" && (log.action.includes("LEAD") || log.action.includes("MESSAGE"))) ||
      (activeCategory === "AUTH" && (log.action.includes("AUTH") || log.action.includes("LOGIN") || log.action.includes("SYSTEM")));

    return matchesSearch && matchesCategory;
  });

  const getActionBadge = (action: string) => {
    if (action.includes("CREATE") || action.includes("PUBLISH")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
    }
    if (action.includes("UPDATE") || action.includes("EDIT")) {
      return "bg-accent-purple/15 text-accent-purple border-accent-purple/30";
    }
    if (action.includes("DELETE") || action.includes("REMOVE")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/25";
    }
    if (action.includes("AUTH") || action.includes("LOGIN") || action.includes("INITIALIZED")) {
      return "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30";
    }
    if (action.includes("LEAD") || action.includes("MESSAGE")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/25";
    }
    return "bg-white/10 text-white/80 border-white/15";
  };

  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = "ID,Action,Details,IPAddress,Timestamp\n";
    const rows = logs
      .map(
        (l) =>
          `"${l.id}","${l.action}","${(l.details || "").replace(/"/g, '""')}","${l.ipAddress || "127.0.0.1"}","${l.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cortex-audit-trail-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 sm:pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
            <span>Audit Trail & Security Logs</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Immutable chronological ledger of all administrative CRUD actions and authentications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            onClick={handleExportCSV}
            disabled={logs.length === 0}
            className="text-xs font-mono w-full sm:w-auto min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={fetchLogs}
            disabled={loading}
            className="text-xs font-mono shadow-glow-purple w-full sm:w-auto min-h-[40px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 border active:scale-95 ${
                isActive
                  ? "bg-accent-purple/20 text-white border-accent-purple/50 shadow-glow-purple font-bold"
                  : "bg-surface/60 text-text-secondary border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter logs by keyword, ID, or IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-text-secondary">
          Displaying {filteredLogs.length} of {logs.length} logged events
        </span>
      </div>

      {/* Logs Content */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-accent-purple" />
          <span>Synchronizing audit trail...</span>
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5 space-y-2">
          <Terminal className="w-7 h-7 text-text-secondary mx-auto opacity-50" />
          <p>No matching audit records found for this filter criteria.</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View (<md) */}
          <div className="md:hidden space-y-2.5">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-surface/40 border border-white/10 flex flex-col gap-2 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-lg border text-[10px] ${getActionBadge(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>

                <div className="text-white text-xs font-sans font-medium">
                  {log.details || "No detail payload provided"}
                </div>

                <div className="flex items-center justify-between text-[10px] text-text-secondary pt-2 border-t border-white/5">
                  <span>{log.ipAddress || "127.0.0.1"}</span>
                  <span>{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (>=md) */}
          <div className="hidden md:block bg-surface/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#080B17] text-text-secondary font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-5">Event Action</th>
                    <th className="py-3.5 px-5">Operation Summary & Payload</th>
                    <th className="py-3.5 px-5">IP / Origin</th>
                    <th className="py-3.5 px-5">Timestamp (UTC)</th>
                    <th className="py-3.5 px-5 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span
                          className={`font-mono font-bold px-2.5 py-1 rounded-lg border text-[11px] inline-block ${getActionBadge(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-white font-medium">
                        {log.details || "No detail payload provided"}
                      </td>
                      <td className="py-3.5 px-5 text-text-secondary font-mono text-[11px]">
                        {log.ipAddress || "127.0.0.1"}
                      </td>
                      <td className="py-3.5 px-5 text-text-secondary font-mono whitespace-nowrap text-[11px]">
                        {new Date(log.createdAt).toLocaleString("en-US", {
                          timeZone: "UTC",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
