"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { AdminModal } from "@/components/admin/AdminModal";
import {
  Inbox,
  Search,
  Trash2,
  Mail,
  Building,
  Calendar,
  DollarSign,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Clock,
  Sparkles,
} from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service: string;
  budget?: string | null;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("id");

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("All");
  const [activeMessage, setActiveMessage] = useState<MessageItem | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
        if (highlightId) {
          const match = data.find((m) => m.id === highlightId);
          if (match) setActiveMessage(match);
        }
      }
    } catch (err) {
      showToast("error", "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [highlightId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the inquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", `Inquiry from "${name}" removed`);
      if (activeMessage?.id === id) setActiveMessage(null);
      fetchMessages();
    } catch (err) {
      showToast("error", "Could not delete inquiry");
    }
  };

  const servicesList = [
    "All",
    ...Array.from(new Set(messages.map((m) => m.service).filter(Boolean))),
  ];

  const filteredMessages = messages.filter((m) => {
    const matchesService = selectedService === "All" || m.service === selectedService;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.company && m.company.toLowerCase().includes(search.toLowerCase())) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-2.5 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 sm:pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
            <span>Lead Inbox & Scope Inquiries</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Real-time inquiries received from client organizations through the public contact funnel.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={fetchMessages}
          disabled={loading}
          className="text-xs font-mono w-full sm:w-auto min-h-[42px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Inbox
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {servicesList.map((svc) => (
            <button
              key={svc}
              onClick={() => setSelectedService(svc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 active:scale-95 ${
                selectedService === svc
                  ? "bg-accent-purple text-white shadow-glow-purple"
                  : "bg-surface/60 text-text-secondary hover:text-white border border-white/10"
              }`}
            >
              {svc}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Content */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary">
          Loading incoming leads...
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5">
          No inquiries found matching your filters.
        </div>
      ) : (
        <>
          {/* Mobile Card List (<md) */}
          <div className="md:hidden space-y-3">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setActiveMessage(msg)}
                className="p-4 rounded-3xl bg-surface/50 border border-white/10 flex flex-col gap-3 active:scale-[0.99] transition-all cursor-pointer hover:border-accent-purple/40"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{msg.name}</div>
                    <div className="text-[11px] text-text-secondary font-mono truncate max-w-[200px]">{msg.email}</div>
                  </div>
                  <Pill variant="tag" className="text-[9px]">
                    {msg.service}
                  </Pill>
                </div>

                <p className="text-xs text-text-secondary line-clamp-2 italic bg-[#050714] p-2.5 rounded-xl border border-white/5">
                  &quot;{msg.message}&quot;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                  <span className="text-emerald-400 font-semibold">{msg.budget || "Custom"}</span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveMessage(msg)}
                      className="px-2.5 py-1 rounded-lg bg-accent-purple/20 text-accent-purple border border-accent-purple/30 text-[10px] font-bold"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id, msg.name)}
                      className="p-1.5 text-text-secondary hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all"
                      aria-label="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (>=md) */}
          <div className="hidden md:block bg-surface/40 border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#080B17] text-text-secondary font-mono uppercase tracking-wider">
                    <th className="py-3.5 px-4">Client Identity</th>
                    <th className="py-3.5 px-4">Company</th>
                    <th className="py-3.5 px-4">Capability Needed</th>
                    <th className="py-3.5 px-4">Budget Range</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      onClick={() => setActiveMessage(msg)}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <div className="font-bold text-white group-hover:text-accent-purple transition-colors">
                          {msg.name}
                        </div>
                        <div className="text-[11px] text-text-secondary font-mono">{msg.email}</div>
                      </td>
                      <td className="py-4 px-4 text-text-secondary">
                        {msg.company ? (
                          <span className="flex items-center gap-1 text-white">
                            <Building className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                            <span>{msg.company}</span>
                          </span>
                        ) : (
                          <span className="text-text-secondary italic">Individual</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Pill variant="tag" className="text-[10px]">
                          {msg.service}
                        </Pill>
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-emerald-400">
                        {msg.budget || "Flexible"}
                      </td>
                      <td className="py-4 px-4 text-text-secondary font-mono">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveMessage(msg)}
                            className="text-xs px-2.5 py-1 min-h-[32px]"
                          >
                            Inspect
                          </Button>
                          <button
                            onClick={() => handleDelete(msg.id, msg.name)}
                            className="p-1.5 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                            aria-label="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Message Inspection Modal */}
      <AdminModal
        isOpen={!!activeMessage}
        onClose={() => setActiveMessage(null)}
        title={activeMessage ? `Scope Inquiry: ${activeMessage.name}` : "Inquiry Inspection"}
        subtitle="Detailed client request payload received through the Cortex intake funnel."
        maxWidth="lg"
      >
        {activeMessage && (
          <div className="space-y-4">
            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#050714] border border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider block mb-0.5">
                  Client Email
                </span>
                <a
                  href={`mailto:${activeMessage.email}`}
                  className="text-xs sm:text-sm font-semibold text-accent-cyan hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeMessage.email}</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider block mb-0.5">
                  Company / Organization
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                  <span>{activeMessage.company || "Individual / Stealth"}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider block mb-0.5">
                  Service Category
                </span>
                <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                  {activeMessage.service}
                </Pill>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider block mb-0.5">
                  Budget Allocation
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{activeMessage.budget || "Custom Project Scope"}</span>
                </span>
              </div>
            </div>

            {/* Scope Narrative */}
            <div>
              <span className="text-[10px] font-mono font-bold text-accent-purple uppercase tracking-wider block mb-1">
                Project Narrative & Scope Requirements
              </span>
              <div className="p-4 rounded-2xl bg-[#050714] border border-white/10 text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {activeMessage.message}
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-[11px] font-mono text-text-secondary flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-purple" />
              <span>Received on {new Date(activeMessage.createdAt).toLocaleString()}</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDelete(activeMessage.id, activeMessage.name)}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-mono py-2 px-3 rounded-xl hover:bg-rose-500/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setActiveMessage(null)}
                  className="text-xs"
                >
                  Close
                </Button>
                <a href={`mailto:${activeMessage.email}?subject=Cortex%20Core%20Group%20Scope%20Discussion`}>
                  <Button variant="primary" size="md" className="shadow-glow-purple text-xs font-bold">
                    <Mail className="w-3.5 h-3.5 mr-1.5" /> Reply Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
