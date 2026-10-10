export interface BlogPostItem {
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

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: "building-scalable-nextjs-apps",
    title: "Architecting High-Performance Next.js 15 & React 19 Systems for Enterprise",
    excerpt:
      "Deep dive into Server Actions, App Router architecture, zero-waterfall data fetching, ISR caching strategies, and Tailwind CSS design tokens for enterprise SaaS.",
    category: "ENGINEERING",
    categoryLabel: "FULL-STACK ENGINEERING",
    date: "Aug 04, 2026",
    readTime: "6 min read",
    author: "Randy Ojong",
    authorRole: "Founder & Lead Full Stack Dev",
    authorAvatar: "RO",
    tags: ["Next.js 15", "React 19", "TypeScript", "Performance", "Architecture"],
    featured: true,
  },
  {
    slug: "ai-rag-pipelines-saas",
    title: "Integrating LLMs, Vector DBs, and RAG Pipelines into Modern Software",
    excerpt:
      "A practical engineering guide to building retrieval-augmented generation memory pipelines using pgvector, OpenAI/Gemini APIs, and PyTorch inference engines.",
    category: "AI & ML",
    categoryLabel: "ARTIFICIAL INTELLIGENCE",
    date: "Jul 28, 2026",
    readTime: "8 min read",
    author: "Ayamelack Fotsa",
    authorRole: "AI Systems Researcher",
    authorAvatar: "AF",
    tags: ["AI", "PyTorch", "Vector DB", "RAG", "LLMs"],
    featured: false,
  },
  {
    slug: "zero-downtime-kubernetes",
    title: "Zero-Downtime Deployment Strategies with Kubernetes, Docker & AWS ECS",
    excerpt:
      "How to design resilient multi-region cloud infrastructure, rolling update strategies, automated canary deployments, and sub-15ms edge CDN caching.",
    category: "DEVOPS",
    categoryLabel: "CLOUD & DEVOPS",
    date: "Jul 15, 2026",
    readTime: "5 min read",
    author: "Precious Acha",
    authorRole: "CTO & Cloud Architect",
    authorAvatar: "PA",
    tags: ["AWS", "Docker", "Kubernetes", "DevOps", "CI/CD"],
    featured: false,
  },
  {
    slug: "2026-design-engineering-micro-physics",
    title: "The 2026 Guide to Design Engineering & Physical Web Motion",
    excerpt:
      "Why static UIs feel outdated. How to leverage Framer Motion, spring physics, glassmorphic depth, and responsive cursor shaders for high-conversion web apps.",
    category: "DESIGN",
    categoryLabel: "PRODUCT DESIGN",
    date: "Jul 02, 2026",
    readTime: "4 min read",
    author: "Mai Randy",
    authorRole: "Head of Product Design",
    authorAvatar: "MR",
    tags: ["UI/UX", "Framer Motion", "Design Systems", "Physics", "CSS"],
    featured: false,
  },
  {
    slug: "sub-15ms-edge-api-latency",
    title: "Achieving Sub-15ms Global Edge Latency: Caching & Database Pooling",
    excerpt:
      "A technical case study on reducing global API latency by 70% using Vercel Edge Functions, PgBouncer connection pooling, and Redis in-memory caches.",
    category: "ARCHITECTURE",
    categoryLabel: "SYSTEM ARCHITECTURE",
    date: "Jun 20, 2026",
    readTime: "7 min read",
    author: "Randy Ojong",
    authorRole: "Founder & Lead Full Stack Dev",
    authorAvatar: "RO",
    tags: ["API", "PostgreSQL", "Redis", "Edge", "Latency"],
    featured: false,
  },
  {
    slug: "agile-sprint-velocity-client-sync",
    title: "How Bi-Weekly Live Demos & Async Workflows Eliminate Project Scope Creep",
    excerpt:
      "Our internal playbook for transparent agile client collaboration: live staging links, continuous code reviews, and zero-bullshit engineering velocity.",
    category: "MANAGEMENT",
    categoryLabel: "AGILE DELIVERY",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    author: "Ngum Caleb",
    authorRole: "Agile Project Delivery Lead",
    authorAvatar: "NC",
    tags: ["Agile", "Scrum", "Client Sync", "Sprint", "Velocity"],
    featured: false,
  },
];
