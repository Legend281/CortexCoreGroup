"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { AdminModal } from "@/components/admin/AdminModal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Layers,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
  image?: string | null;
}

const ICON_OPTIONS = [
  { name: "Code2", label: "Software Code" },
  { name: "Cpu", label: "AI & Data" },
  { name: "Cloud", label: "Cloud & DevOps" },
  { name: "Smartphone", label: "Mobile Apps" },
  { name: "Layout", label: "UI/UX Design" },
  { name: "Shield", label: "Cybersecurity" },
  { name: "Lightbulb", label: "IT Consulting" },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    number: "01",
    title: "",
    description: "",
    tags: "",
    iconName: "Code2",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch (err) {
      showToast("error", "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      id: "",
      number: `0${services.length + 1}`,
      title: "",
      description: "",
      tags: "Next.js, TypeScript, PostgreSQL",
      iconName: "Code2",
      image: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      id: service.id,
      number: service.number,
      title: service.title,
      description: service.description,
      tags: service.tags.join(", "),
      iconName: service.iconName || "Code2",
      image: service.image || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", `Deleted "${title}" successfully`);
      fetchServices();
    } catch (err) {
      showToast("error", "Could not delete service");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingService) {
        // Update existing service
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            number: formData.number,
            title: formData.title,
            description: formData.description,
            tags: tagsArray,
            iconName: formData.iconName,
            image: formData.image || null,
          }),
        });
        if (!res.ok) throw new Error("Failed to update");
        showToast("success", `Updated "${formData.title}"`);
      } else {
        // Create new service
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: formData.id.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
            number: formData.number,
            title: formData.title,
            description: formData.description,
            tags: tagsArray,
            iconName: formData.iconName,
            image: formData.image || null,
          }),
        });
        if (!res.ok) throw new Error("Failed to create");
        showToast("success", `Created "${formData.title}"`);
      }

      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      showToast("error", err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

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
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple shrink-0" />
            <span>Services & Capabilities</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Configure service offerings, technology stacks, and blueprints displayed live across the site.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenAdd} className="shadow-glow-purple w-full sm:w-auto min-h-[42px] font-bold text-xs">
          <PlusCircle className="w-4 h-4 mr-1.5 shrink-0" /> Add New Service
        </Button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-text-secondary">
          Showing {filteredServices.length} of {services.length} services
        </span>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary">
          Loading services catalog...
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5">
          No services match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredServices.map((service) => (
            <SpotlightCard
              key={service.id}
              className="p-5 sm:p-6 bg-surface/40 border border-white/10 rounded-3xl flex flex-col justify-between group hover:border-accent-purple/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-accent-purple">
                    {service.number}
                  </span>
                  <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                    {service.id}
                  </Pill>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-accent-purple transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tags.map((tag) => (
                    <Pill key={tag} variant="tag" className="text-[9px] py-0.5 px-2">
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleOpenEdit(service)}
                  className="text-xs px-3 py-1.5 min-h-[38px] active:scale-95"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1 text-accent-cyan" /> Edit
                </Button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-2 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95 min-h-[38px] min-w-[38px] flex items-center justify-center"
                  aria-label="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? `Edit Service: ${editingService.title}` : "Create New Capability"}
        subtitle="Changes save directly to the PostgreSQL database and update public pages live."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Service Slug / ID *
              </label>
              <input
                type="text"
                required
                disabled={!!editingService}
                placeholder="e.g. data-ai-solutions"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Display Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 01"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Service Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Autonomous AI Systems"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Service Description *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe the architectural capabilities, ROI, and engineering outcomes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Technology Tags (comma-separated) *
              </label>
              <input
                type="text"
                required
                placeholder="Python, PyTorch, LangChain, RAG"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Display Icon
              </label>
              <select
                value={formData.iconName}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Service Graphic / Architecture Cover Image (Optional)
            </label>
            <ImageUploader
              value={formData.image || ""}
              onChange={(url: string) => setFormData({ ...formData, image: url })}
              aspectRatio="video"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setModalOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={submitting}
              className="shadow-glow-purple text-xs font-bold"
            >
              {submitting ? "Saving..." : editingService ? "Save Changes" : "Create Service"}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
