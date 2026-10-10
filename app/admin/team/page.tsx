"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { AdminModal } from "@/components/admin/AdminModal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Users,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  image: string;
  techStack: string[];
  socials: {
    linkedin?: string;
    github?: string;
    email?: string;
    whatsapp?: string;
    portfolio?: string;
  };
}

const CATEGORIES = ["Leadership", "Engineering", "Design", "Management"];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    category: "Engineering",
    bio: "",
    image: "",
    techStack: "Next.js, TypeScript, PostgreSQL",
    linkedin: "",
    github: "",
    email: "",
    whatsapp: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (Array.isArray(data)) setTeam(data);
    } catch (err) {
      showToast("error", "Failed to load team roster");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      id: "",
      name: "",
      role: "",
      category: "Engineering",
      bio: "",
      image: "",
      techStack: "React, TypeScript, Cloud Architecture",
      linkedin: "",
      github: "",
      email: "",
      whatsapp: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMemberItem) => {
    setEditingMember(member);
    setFormData({
      id: member.id,
      name: member.name,
      role: member.role,
      category: member.category,
      bio: member.bio,
      image: member.image,
      techStack: member.techStack.join(", "),
      linkedin: member.socials?.linkedin || "",
      github: member.socials?.github || "",
      email: member.socials?.email || "",
      whatsapp: member.socials?.whatsapp || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the team?`)) return;

    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", `Removed "${name}" from roster`);
      fetchTeam();
    } catch (err) {
      showToast("error", "Could not delete team member");
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
      name: formData.name,
      role: formData.role,
      category: formData.category,
      bio: formData.bio,
      image: formData.image,
      techStack: techArray,
      socials: {
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
        email: formData.email || undefined,
        whatsapp: formData.whatsapp || undefined,
      },
    };

    try {
      if (editingMember) {
        const res = await fetch(`/api/team/${editingMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        showToast("success", `Updated profile for "${formData.name}"`);
      } else {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            id: formData.id.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        showToast("success", `Added "${formData.name}" to team`);
      }

      setModalOpen(false);
      fetchTeam();
    } catch (err: any) {
      showToast("error", err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTeam = team.filter((m) => {
    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.bio.toLowerCase().includes(search.toLowerCase()) ||
      m.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
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
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 shrink-0" />
            <span>Team Roster & Staff</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Manage public team profiles, portrait photos, skills radar, and departmental assignments.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenAdd} className="shadow-glow-purple w-full sm:w-auto min-h-[42px] font-bold text-xs">
          <PlusCircle className="w-4 h-4 mr-1.5 shrink-0" /> Add Team Member
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 active:scale-95 ${
                selectedCategory === cat
                  ? "bg-accent-purple text-white shadow-glow-purple"
                  : "bg-surface/60 text-text-secondary hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary">
          Loading team roster...
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5">
          No team members match your current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTeam.map((member) => (
            <SpotlightCard
              key={member.id}
              className="p-4 sm:p-5 bg-surface/40 border border-white/10 rounded-3xl flex flex-col justify-between group hover:border-accent-purple/50 transition-all duration-200"
            >
              <div>
                {/* Large Portrait Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-2xl mb-3.5 overflow-hidden bg-[#090B16] border border-white/10">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="300px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-accent flex items-center justify-center text-white text-3xl font-bold font-sans">
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5">
                    <Pill variant="eyebrow" className="text-[8px] py-0.5 px-2 bg-black/70 backdrop-blur-md border-white/20">
                      {member.category}
                    </Pill>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 group-hover:text-accent-purple transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-text-secondary font-medium mb-2.5">{member.role}</p>

                <p className="text-xs text-text-secondary leading-relaxed mb-3.5 line-clamp-2">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-3.5">
                  {member.techStack.slice(0, 3).map((tech) => (
                    <Pill key={tech} variant="tag" className="text-[9px] py-0.5 px-1.5">
                      {tech}
                    </Pill>
                  ))}
                  {member.techStack.length > 3 && (
                    <span className="text-[9px] font-mono text-text-secondary self-center">
                      +{member.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-text-secondary truncate max-w-[100px]">{member.id}</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenEdit(member)}
                    className="text-xs px-2.5 py-1 min-h-[36px] active:scale-95"
                  >
                    <Pencil className="w-3 h-3 mr-1 text-accent-cyan" /> Edit
                  </Button>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="p-1.5 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Delete team member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add / Edit Team Member Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingMember ? `Edit Profile: ${editingMember.name}` : "Add New Team Member"}
        subtitle="Staff profiles appear in the leadership and engineering roster with live contact options."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Member ID / Handle *
              </label>
              <input
                type="text"
                required
                disabled={!!editingMember}
                placeholder="e.g. randy-ojong"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Randy Ojong"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Professional Role / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chief Executive Officer & Architect"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Department Category *
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
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Executive Bio & Background *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Background, years of experience, engineering focus..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Core Skills & Tech Stacks (comma-separated) *
            </label>
            <input
              type="text"
              required
              placeholder="React, Next.js, Cloud Architecture, PostgreSQL"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                GitHub URL
              </label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Portrait Photo Upload *
            </label>
            <ImageUploader
              value={formData.image || ""}
              onChange={(url: string) => setFormData({ ...formData, image: url })}
              aspectRatio="portrait"
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
              {submitting ? "Saving..." : editingMember ? "Save Changes" : "Add Member"}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
