"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { AdminModal } from "@/components/admin/AdminModal";
import {
  MessageSquareQuote,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Star,
  Quote,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  initial: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    initial: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch (err) {
      showToast("error", "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      quote: "",
      author: "",
      initial: "",
      rating: 5,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      quote: item.quote,
      author: item.author,
      initial: item.initial,
      rating: item.rating,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, author: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${author}"?`)) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", `Deleted testimonial from "${author}"`);
      fetchTestimonials();
    } catch (err) {
      showToast("error", "Could not delete testimonial");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const calculatedInitial =
      formData.initial.trim() ||
      formData.author
        .split(" ")
        .map((p) => p[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const payload = {
      quote: formData.quote,
      author: formData.author,
      initial: calculatedInitial,
      rating: Number(formData.rating),
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/testimonials/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        showToast("success", `Updated testimonial from "${formData.author}"`);
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        showToast("success", `Added testimonial from "${formData.author}"`);
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      showToast("error", err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.author.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
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
            <MessageSquareQuote className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple shrink-0" />
            <span>Client Testimonials</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Manage verified client reviews, star ratings, quotes, and executive endorsements.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenAdd} className="shadow-glow-purple w-full sm:w-auto min-h-[42px] font-bold text-xs">
          <PlusCircle className="w-4 h-4 mr-1.5 shrink-0" /> Add Testimonial
        </Button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client or quote..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-text-secondary">
          Showing {filteredTestimonials.length} of {testimonials.length} reviews
        </span>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary">
          Loading testimonials...
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5">
          No testimonials match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTestimonials.map((item) => (
            <SpotlightCard
              key={item.id}
              className="p-5 sm:p-6 bg-surface/40 border border-white/10 rounded-3xl flex flex-col justify-between group hover:border-accent-purple/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-accent-purple/60" />
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5 italic">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Author Info & Actions */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {item.initial}
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">{item.author}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenEdit(item)}
                    className="text-xs px-2.5 py-1 min-h-[36px] active:scale-95"
                  >
                    <Pencil className="w-3 h-3 mr-1 text-accent-cyan" /> Edit
                  </Button>
                  <button
                    onClick={() => handleDelete(item.id, item.author)}
                    className="p-1.5 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Delete testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add / Edit Testimonial Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? `Edit Testimonial: ${editingItem.author}` : "Add Client Testimonial"}
        subtitle="Endorsements appear in the testimonials carousel and case study drawers."
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Client Name / Organization *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Marcus Vance, VP Engineering at OrbitCloud"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Avatar Initials (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. MV"
                maxLength={3}
                value={formData.initial}
                onChange={(e) => setFormData({ ...formData, initial: e.target.value.toUpperCase() })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Rating (1 to 5 Stars) *
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              >
                <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                <option value={3}>⭐⭐⭐ 3 Stars</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Client Quote / Review *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Quote describing the project collaboration, delivery speed, and technical quality..."
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
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
              {submitting ? "Saving..." : editingItem ? "Save Changes" : "Publish Review"}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
