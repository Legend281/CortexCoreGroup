"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { AdminModal } from "@/components/admin/AdminModal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  FolderGit2,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Heart,
  Star,
} from "lucide-react";

interface ProjectItem {
  id: string;
  number: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  likeCount: number;
  rating: number;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  link: string;
}

const CATEGORIES = [
  "Enterprise Web Apps",
  "AI & Data Systems",
  "FinTech & Payments",
  "E-Commerce & Retail",
  "IoT & Smart Systems",
  "Education & LMS",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    number: "01",
    category: "Enterprise Web Apps",
    categoryLabel: "FLAGSHIP SAAS",
    title: "",
    description: "",
    image: "/images/projects/default.png",
    techStack: "Next.js, TypeScript, PostgreSQL, TailwindCSS",
    likeCount: 140,
    rating: 5,
    testimonialQuote: "",
    testimonialAuthor: "",
    testimonialRole: "",
    link: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch (err) {
      showToast("error", "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      id: "",
      number: `0${projects.length + 1}`,
      category: "Enterprise Web Apps",
      categoryLabel: "ENTERPRISE",
      title: "",
      description: "",
      image: "/images/projects/default.png",
      techStack: "React, Next.js, Node.js, PostgreSQL",
      likeCount: 88,
      rating: 5,
      testimonialQuote: "",
      testimonialAuthor: "",
      testimonialRole: "",
      link: "https://cortexcoregroup.com",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      id: project.id,
      number: project.number,
      category: project.category,
      categoryLabel: project.categoryLabel,
      title: project.title,
      description: project.description,
      image: project.image,
      techStack: project.techStack.join(", "),
      likeCount: project.likeCount,
      rating: project.rating,
      testimonialQuote: project.testimonial?.quote || "",
      testimonialAuthor: project.testimonial?.author || "",
      testimonialRole: project.testimonial?.role || "",
      link: project.link,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", `Deleted "${title}" successfully`);
      fetchProjects();
    } catch (err) {
      showToast("error", "Could not delete project");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const techArray = formData.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      number: formData.number,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      title: formData.title,
      description: formData.description,
      image: formData.image,
      techStack: techArray,
      likeCount: Number(formData.likeCount),
      rating: Number(formData.rating),
      testimonial: formData.testimonialQuote
        ? {
            quote: formData.testimonialQuote,
            author: formData.testimonialAuthor,
            role: formData.testimonialRole,
          }
        : undefined,
      link: formData.link,
    };

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        showToast("success", `Updated "${formData.title}"`);
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            id: formData.id.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        showToast("success", `Created "${formData.title}"`);
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      showToast("error", err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
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
            <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-cyan shrink-0" />
            <span>Portfolio & Case Studies</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Publish client case studies, benchmark metrics, tech stack tags, and client testimonials.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenAdd} className="shadow-glow-purple w-full sm:w-auto min-h-[42px] font-bold text-xs">
          <PlusCircle className="w-4 h-4 mr-1.5 shrink-0" /> Add New Project
        </Button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, category, or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-text-secondary">
          Showing {filteredProjects.length} of {projects.length} projects
        </span>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary">
          Loading portfolio items...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5">
          No projects match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="p-5 sm:p-6 bg-surface/40 border border-white/10 rounded-3xl flex flex-col justify-between group hover:border-accent-purple/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-accent-purple">
                      {project.number}
                    </span>
                    <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                      {project.categoryLabel}
                    </Pill>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="flex items-center gap-1 text-rose-400 font-bold">
                      <Heart className="w-3.5 h-3.5 fill-rose-400" /> {project.likeCount}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {project.rating}.0
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 group-hover:text-accent-purple transition-colors">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono text-accent-cyan block mb-2.5">
                  {project.category}
                </span>

                <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech) => (
                    <Pill key={tech} variant="tag" className="text-[9px] py-0.5 px-2">
                      {tech}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleOpenEdit(project)}
                  className="text-xs px-3 py-1.5 min-h-[38px] active:scale-95"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1 text-accent-cyan" /> Edit
                </Button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-2 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95 min-h-[38px] min-w-[38px] flex items-center justify-center"
                  aria-label="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? `Edit Project: ${editingProject.title}` : "Publish New Case Study"}
        subtitle="Changes save directly to PostgreSQL and update portfolio showcases live."
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Project Slug / ID *
              </label>
              <input
                type="text"
                required
                disabled={!!editingProject}
                placeholder="e.g. zenith-banking-core"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Industry Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Badge Label *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. FLAGSHIP SAAS"
                value={formData.categoryLabel}
                onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Zenith Core Banking Infrastructure"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Project Description *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Detailed architecture blueprint, challenges solved, ROI achieved..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Tech Stack (comma-separated) *
              </label>
              <input
                type="text"
                required
                placeholder="Next.js, TypeScript, Docker, Redis"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Live URL / Case Study Link
              </label>
              <input
                type="text"
                placeholder="https://client-demo.com"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Project Screenshot / Cover Graphic *
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
              {submitting ? "Saving..." : editingProject ? "Save Changes" : "Publish Project"}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
