"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { AdminModal } from "@/components/admin/AdminModal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  BookOpen,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";

interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  tags: string[];
  featured?: boolean;
}

const CATEGORIES = [
  { name: "ENGINEERING", label: "FULL-STACK ENGINEERING" },
  { name: "AI & ML", label: "ARTIFICIAL INTELLIGENCE" },
  { name: "DEVOPS", label: "CLOUD & DEVOPS" },
  { name: "DESIGN", label: "UI/UX & MOTION DESIGN" },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "ENGINEERING",
    categoryLabel: "FULL-STACK ENGINEERING",
    readTime: "5 min read",
    author: "Randy Ojong",
    authorRole: "Lead Full-Stack Developer",
    authorAvatar: "RO",
    tags: "Next.js 15, TypeScript, Architecture",
    featured: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (err) {
      showToast("error", "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "ENGINEERING",
      categoryLabel: "FULL-STACK ENGINEERING",
      readTime: "5 min read",
      author: "Randy Ojong",
      authorRole: "Lead Full-Stack Developer",
      authorAvatar: "RO",
      tags: "React, TypeScript, Architecture",
      featured: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPostItem) => {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      image: post.image || "",
      category: post.category,
      categoryLabel: post.categoryLabel,
      readTime: post.readTime,
      author: post.author,
      authorRole: post.authorRole,
      authorAvatar: post.authorAvatar,
      tags: post.tags.join(", "),
      featured: !!post.featured,
    });
    setModalOpen(true);
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the publication "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", `Deleted publication "${title}"`);
      fetchPosts();
    } catch (err) {
      showToast("error", "Could not delete blog post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image || undefined,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      date: formattedDate,
      readTime: formData.readTime,
      author: formData.author,
      authorRole: formData.authorRole,
      authorAvatar: formData.authorAvatar,
      tags: tagsArray,
      featured: formData.featured,
    };

    try {
      if (editingPost) {
        const res = await fetch(`/api/blog/${editingPost.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        showToast("success", `Updated "${formData.title}"`);
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            slug: formData.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        showToast("success", `Published "${formData.title}"`);
      }

      setModalOpen(false);
      fetchPosts();
    } catch (err: any) {
      showToast("error", err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
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
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple shrink-0" />
            <span>Technical Blog & Articles</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
            Publish engineering whitepapers, architecture insights, and software development guides.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenAdd} className="shadow-glow-purple w-full sm:w-auto min-h-[42px] font-bold text-xs">
          <PlusCircle className="w-4 h-4 mr-1.5 shrink-0" /> Write Article
        </Button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, tag, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-text-secondary">
          Showing {filteredPosts.length} of {posts.length} articles
        </span>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs font-mono text-text-secondary">
          Loading publications...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-text-secondary bg-[#050712] rounded-3xl border border-white/5">
          No articles match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredPosts.map((post) => (
            <SpotlightCard
              key={post.slug}
              className="p-5 sm:p-6 bg-surface/40 border border-white/10 rounded-3xl flex flex-col justify-between group hover:border-accent-purple/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
                  <Pill variant="eyebrow" className="text-[9px] py-0.5 px-2">
                    {post.category}
                  </Pill>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-text-secondary">
                    <span className="flex items-center gap-1 text-accent-cyan">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    {post.featured && (
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-accent-purple transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((tag) => (
                    <Pill key={tag} variant="tag" className="text-[9px] py-0.5 px-2">
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Author Info & Actions */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {post.authorAvatar}
                  </div>
                  <span className="text-xs font-semibold text-white truncate max-w-[100px]">{post.author}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpenEdit(post)}
                    className="text-xs px-2.5 py-1 min-h-[36px] active:scale-95"
                  >
                    <Pencil className="w-3 h-3 mr-1 text-accent-cyan" /> Edit
                  </Button>
                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    className="p-1.5 text-text-secondary hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Delete publication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Add / Edit Blog Post Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingPost ? `Edit Article: ${editingPost.title}` : "Write New Technical Article"}
        subtitle="Publish engineering blueprints and research papers directly to the platform blog."
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Article Slug *
              </label>
              <input
                type="text"
                required
                disabled={!!editingPost}
                placeholder="e.g. nextjs-15-deep-dive"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Category Domain *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const cat = CATEGORIES.find((c) => c.name === e.target.value);
                  setFormData({
                    ...formData,
                    category: e.target.value,
                    categoryLabel: cat ? cat.label : "ENGINEERING",
                  });
                }}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name} ({cat.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Building Resilient Microservices with Next.js 15 and Edge Runtimes"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Abstract / Excerpt *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Brief summary of the publication displayed on index cards..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Full Publication Markdown Content
            </label>
            <textarea
              rows={5}
              placeholder="Full article content in Markdown format..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl p-3.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all font-mono leading-relaxed resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Estimated Read Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
                Author Name
              </label>
              <input
                type="text"
                placeholder="e.g. Randy Ojong"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-[#050714] text-accent-purple focus:ring-accent-purple"
                />
                <span className="text-xs font-semibold text-white">Feature in Hero</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Technology Tags (comma-separated) *
            </label>
            <input
              type="text"
              required
              placeholder="Next.js 15, TypeScript, Cloud, Vector Search"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full bg-[#050714] border border-white/15 rounded-2xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-accent-purple uppercase tracking-wider mb-1">
              Cover Graphic Image (Optional)
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
              {submitting ? "Saving..." : editingPost ? "Save Changes" : "Publish Article"}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
