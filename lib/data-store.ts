import { SERVICES, ServiceItem } from "@/data/services";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { BLOG_POSTS, BlogPostItem } from "@/data/blog";

// Global singleton in-memory data store across all Next.js API routes & Server Components
const globalStore = global as unknown as {
  _cortexServices?: ServiceItem[];
  _cortexProjects?: ProjectItem[];
  _cortexTeam?: TeamMember[];
  _cortexBlog?: BlogPostItem[];
  _cortexTestimonials?: any[];
  _cortexMessages?: any[];
  _cortexAuditLogs?: any[];
};

if (!globalStore._cortexAuditLogs) {
  globalStore._cortexAuditLogs = [
    {
      id: "log-init-1",
      action: "AUTH_LOGIN",
      details: "Admin session authenticated successfully for superadmin",
      ipAddress: "127.0.0.1",
      userAgent: "Cortex Admin Shell (Next.js)",
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: "log-init-2",
      action: "SERVICE_UPDATE",
      details: "Updated service 'Software Development' with custom architecture image",
      ipAddress: "127.0.0.1",
      userAgent: "Cortex Admin Shell (Next.js)",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "log-init-3",
      action: "SYSTEM_INITIALIZED",
      details: "Database connection verified and in-memory cache synchronized",
      ipAddress: "127.0.0.1",
      userAgent: "Cortex Core Engine",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ];
}

if (!globalStore._cortexServices) {
  globalStore._cortexServices = [...SERVICES];
}

if (!globalStore._cortexProjects) {
  globalStore._cortexProjects = [...PROJECTS];
}

if (!globalStore._cortexTeam) {
  globalStore._cortexTeam = [...TEAM_MEMBERS];
}

if (!globalStore._cortexBlog) {
  globalStore._cortexBlog = [...BLOG_POSTS];
}

if (!globalStore._cortexTestimonials) {
  globalStore._cortexTestimonials = [
    {
      id: "1",
      quote:
        "Cortex Core Group delivered beyond our expectations. Their innovative approach and professionalism are unmatched.",
      author: "CEO, TechNova Solutions",
      initial: "T",
      rating: 5,
    },
    {
      id: "2",
      quote:
        "Their team transformed our idea into a powerful digital solution. We've seen real growth since launch!",
      author: "Product Manager, FinEdge",
      initial: "F",
      rating: 5,
    },
    {
      id: "3",
      quote:
        "Reliable, creative and results-driven. Cortex Core Group is our go-to technology partner.",
      author: "CTO, Nexora Systems",
      initial: "N",
      rating: 5,
    },
  ];
}

if (!globalStore._cortexMessages) {
  globalStore._cortexMessages = [
    {
      id: "lead-101",
      name: "Alexandre Dupont",
      email: "alexandre.dupont@novatech.eu",
      company: "NovaTech Solutions",
      service: "AI & Machine Learning Systems",
      budget: "$25,000 - $50,000",
      message:
        "We are looking to build a multi-agent AI pipeline for our automated financial auditing software. Can we schedule an architecture review?",
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "lead-102",
      name: "Sarah Jenkins",
      email: "s.jenkins@healthfirst.io",
      company: "HealthFirst Telehealth",
      service: "Custom Software Development",
      budget: "$50,000+",
      message:
        "Need a modern HIPAA-compliant web & mobile dashboard with real-time video consultations and patient scheduling.",
      read: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ];
}

export const dataStore = {
  // Services
  getServices: (): ServiceItem[] => globalStore._cortexServices!,
  setServices: (services: ServiceItem[]) => {
    globalStore._cortexServices = services;
  },
  upsertService: (service: ServiceItem) => {
    const existing = globalStore._cortexServices!.findIndex((s) => s.id === service.id);
    if (existing >= 0) {
      globalStore._cortexServices![existing] = service;
    } else {
      globalStore._cortexServices!.push(service);
    }
  },
  deleteService: (id: string) => {
    globalStore._cortexServices = globalStore._cortexServices!.filter((s) => s.id !== id);
  },

  // Projects
  getProjects: (): ProjectItem[] => globalStore._cortexProjects!,
  setProjects: (projects: ProjectItem[]) => {
    globalStore._cortexProjects = projects;
  },
  upsertProject: (project: ProjectItem) => {
    const existing = globalStore._cortexProjects!.findIndex((p) => p.id === project.id);
    if (existing >= 0) {
      globalStore._cortexProjects![existing] = project;
    } else {
      globalStore._cortexProjects!.push(project);
    }
  },
  deleteProject: (id: string) => {
    globalStore._cortexProjects = globalStore._cortexProjects!.filter((p) => p.id !== id);
  },

  // Team
  getTeam: (): TeamMember[] => globalStore._cortexTeam!,
  setTeam: (team: TeamMember[]) => {
    globalStore._cortexTeam = team;
  },
  upsertTeamMember: (member: TeamMember) => {
    const existing = globalStore._cortexTeam!.findIndex((m) => m.id === member.id);
    if (existing >= 0) {
      globalStore._cortexTeam![existing] = member;
    } else {
      globalStore._cortexTeam!.push(member);
    }
  },
  deleteTeamMember: (id: string) => {
    globalStore._cortexTeam = globalStore._cortexTeam!.filter((m) => m.id !== id);
  },

  // Blog
  getBlogPosts: (): BlogPostItem[] => globalStore._cortexBlog!,
  setBlogPosts: (posts: BlogPostItem[]) => {
    globalStore._cortexBlog = posts;
  },
  upsertBlogPost: (post: BlogPostItem) => {
    const existing = globalStore._cortexBlog!.findIndex((p) => p.slug === post.slug);
    if (existing >= 0) {
      globalStore._cortexBlog![existing] = post;
    } else {
      globalStore._cortexBlog!.unshift(post);
    }
  },
  deleteBlogPost: (slug: string) => {
    globalStore._cortexBlog = globalStore._cortexBlog!.filter((p) => p.slug !== slug);
  },

  // Testimonials
  getTestimonials: (): any[] => globalStore._cortexTestimonials!,
  addTestimonial: (t: any) => {
    globalStore._cortexTestimonials!.unshift(t);
  },
  updateTestimonial: (id: string, updated: any) => {
    const idx = globalStore._cortexTestimonials!.findIndex((t) => t.id === id);
    if (idx >= 0) globalStore._cortexTestimonials![idx] = { ...globalStore._cortexTestimonials![idx], ...updated };
  },
  deleteTestimonial: (id: string) => {
    globalStore._cortexTestimonials = globalStore._cortexTestimonials!.filter((t) => t.id !== id);
  },

  // Messages
  getMessages: (): any[] => globalStore._cortexMessages!,
  addMessage: (m: any) => {
    globalStore._cortexMessages!.unshift(m);
  },
  deleteMessage: (id: string) => {
    globalStore._cortexMessages = globalStore._cortexMessages!.filter((m) => m.id !== id);
  },

  // Audit Logs
  getAuditLogs: (): any[] => globalStore._cortexAuditLogs || [],
  setAuditLogs: (logs: any[]) => {
    globalStore._cortexAuditLogs = logs;
  },
  addAuditLog: (log: any) => {
    if (!globalStore._cortexAuditLogs) {
      globalStore._cortexAuditLogs = [];
    }
    const entry = {
      id: log.id || `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action: log.action || "ADMIN_ACTION",
      details: log.details || "",
      ipAddress: log.ipAddress || "127.0.0.1",
      userAgent: log.userAgent || "Cortex Admin Portal (Next.js)",
      createdAt: log.createdAt || new Date().toISOString(),
    };
    globalStore._cortexAuditLogs.unshift(entry);
    // Limit store to latest 300 logs
    if (globalStore._cortexAuditLogs.length > 300) {
      globalStore._cortexAuditLogs = globalStore._cortexAuditLogs.slice(0, 300);
    }
    return entry;
  },
};
