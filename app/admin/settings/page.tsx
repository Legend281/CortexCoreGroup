"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import {
  Settings,
  Building,
  Mail,
  Share2,
  CheckCircle2,
  AlertCircle,
  Save,
  Globe,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    companyName: "Cortex Core Group",
    tagline: "Smart Solutions. Real Impact.",
    primaryEmail: "info@cortexcoregroup.com",
    primaryPhone: "+237 6 12 34 56 76",
    address: "Buea, South West Region, Cameroon",
    operationalStatus: "Accepting Global Client Engagements & Engineering Sprints",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
    metaTitle: "Cortex Core Group — Smart Solutions. Real Impact.",
    metaDescription:
      "Transforming business ideas into intelligent digital experiences through innovation, creativity, and the power of AI.",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data && typeof data === "object") {
        setFormData((prev) => ({ ...prev, ...data }));
      }
    } catch (_) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      showToast("success", "Global platform configurations updated successfully.");
    } catch (err: any) {
      showToast("error", err.message || "Failed to save settings");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
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
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple shrink-0" />
            <span>Global Platform Settings & SEO</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Configure enterprise brand metadata, communication channels, and search engine parameters.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={submitting}
          className="shadow-glow-purple w-full sm:w-auto min-h-[42px] font-bold text-xs"
        >
          <Save className="w-4 h-4 mr-1.5 shrink-0" /> {submitting ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
        {/* Section 1: Brand & Headquarters */}
        <SpotlightCard className="p-5 sm:p-8 bg-surface/40 border border-white/10 rounded-3xl space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Building className="w-4 h-4 sm:w-5 sm:h-5 text-accent-purple shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white">Company Identity & Location</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Headquarters Physical Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>
        </SpotlightCard>

        {/* Section 2: Contact Information */}
        <SpotlightCard className="p-5 sm:p-8 bg-surface/40 border border-white/10 rounded-3xl space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white">Public Communication Channels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Inquiry Routing Email
              </label>
              <input
                type="email"
                value={formData.primaryEmail}
                onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Telephone / WhatsApp Hotline
              </label>
              <input
                type="text"
                value={formData.primaryPhone}
                onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>
        </SpotlightCard>

        {/* Section 3: Social & Community Presence */}
        <SpotlightCard className="p-5 sm:p-8 bg-surface/40 border border-white/10 rounded-3xl space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white">Social & Network Links</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                LinkedIn Company Page
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Twitter / X Profile
              </label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                GitHub Organization
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>
        </SpotlightCard>

        {/* Section 4: Global SEO & Search Metadata */}
        <SpotlightCard className="p-5 sm:p-8 bg-surface/40 border border-white/10 rounded-3xl space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white">Global Search Engine Optimization (SEO)</h3>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all resize-none"
              />
            </div>
          </div>
        </SpotlightCard>

        {/* Bottom Save Trigger */}
        <div className="pt-2 flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
            className="shadow-glow-purple w-full sm:w-auto font-bold min-h-[44px]"
          >
            <Save className="w-4 h-4 mr-2" /> {submitting ? "Saving Platform Configurations..." : "Save All Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
