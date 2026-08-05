"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Pill } from "@/components/ui/Pill";
import { Code2, Server, Cpu, Cloud, Database, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface TechItem {
  name: string;
  desc: string;
  snippet: string;
}

interface TechCategory {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
  tagline: string;
  description: string;
  stack: TechItem[];
}

const TECH_MATRIX: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend & UX",
    icon: Code2,
    tagline: "High-Performance Modern Web Interfaces",
    description: "We craft lightning-fast web applications with 100% type safety, responsive micro-animations, and server-side rendering.",
    stack: [
      {
        name: "Next.js 15",
        desc: "App Router, Server Actions & ISR",
        snippet: `export async function GET() {\n  const data = await prisma.project.findMany();\n  return NextResponse.json(data);\n}`,
      },
      {
        name: "React 19",
        desc: "Concurrent rendering & Server Components",
        snippet: `// Server Component\nexport default async function Page() {\n  const res = await fetch(url, { next: { revalidate: 60 } });\n}`,
      },
      {
        name: "TypeScript",
        desc: "Strict type safety across full stack",
        snippet: `interface ProjectProps {\n  id: string;\n  title: string;\n  status: "active" | "archived";\n}`,
      },
      {
        name: "TailwindCSS",
        desc: "Utility-first modern design system",
        snippet: `className="bg-surface/50 backdrop-blur-xl border border-white/10 hover:border-accent-purple"`,
      },
      {
        name: "Framer Motion",
        desc: "Hardware-accelerated micro-physics",
        snippet: `<motion.div animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300 }} />`,
      },
      {
        name: "WebGL / Canvas",
        desc: "Interactive 3D particle & data visuals",
        snippet: `ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);\nctx.fillStyle = "#00F0FF";`,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Server,
    tagline: "High-Concurrency Distributed Microservices",
    description: "Robust backend architectures engineered for low latency, high throughput, and seamless third-party integrations.",
    stack: [
      {
        name: "Node.js / Express",
        desc: "Asymmetric event loop microservices",
        snippet: `app.use('/api/v1', router);\napp.listen(8080, () => console.log('Cluster ready'));`,
      },
      {
        name: "Go (Golang)",
        desc: "High-throughput concurrent services",
        snippet: `func HandleRequest(w http.ResponseWriter, r *http.Request) {\n  go processAnalytics(r.Context())\n}`,
      },
      {
        name: "Python / FastAPI",
        desc: "AI model serving & async endpoints",
        snippet: `@app.post("/synthesize")\nasync def infer(payload: QueryPayload):\n  return await ai_engine.predict(payload)`,
      },
      {
        name: "GraphQL & REST",
        desc: "Type-safe query endpoints",
        snippet: `type Query {\n  project(id: ID!): Project\n  team: [TeamMember!]!\n}`,
      },
      {
        name: "gRPC",
        desc: "Low-latency binary inter-service RPC",
        snippet: `service InferenceService {\n  rpc Predict (InferenceRequest) returns (InferenceResponse);\n}`,
      },
      {
        name: "WebSockets",
        desc: "Bi-directional real-time data streaming",
        snippet: `wss.on('connection', (ws) => {\n  ws.send(JSON.stringify({ type: 'SYNC', latency: 12 }));\n});`,
      },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: Cpu,
    tagline: "Generative AI, LLMs & Vector Pipelines",
    description: "Embedding intelligence directly into software products via RAG memory, custom embeddings, and automated agent workflows.",
    stack: [
      {
        name: "PyTorch & TensorFlow",
        desc: "Deep learning model training & inference",
        snippet: `output = model(tensor_input)\nloss = criterion(output, target)\nloss.backward()`,
      },
      {
        name: "OpenAI & Gemini APIs",
        desc: "State-of-the-art LLM integration",
        snippet: `const response = await ai.generateContent({\n  model: "gemini-1.5-pro",\n  prompt: userQuery,\n});`,
      },
      {
        name: "Vector Databases",
        desc: "Pinecone, pgvector & Qdrant memory",
        snippet: `SELECT * FROM embeddings\nORDER BY embedding <-> '[0.012, 0.452, ...]' LIMIT 5;`,
      },
      {
        name: "RAG Pipelines",
        desc: "Retrieval-augmented generation memory",
        snippet: `const docs = await vectorStore.similaritySearch(query, 3);\nconst answer = await ragChain.invoke({ docs, query });`,
      },
      {
        name: "LangChain & Agents",
        desc: "Autonomous AI agent orchestration",
        snippet: `const agent = createReactAgent({ llm, tools: [searchTool, dbTool] });`,
      },
      {
        name: "Fine-Tuning",
        desc: "Domain-specific model optimization",
        snippet: `fine_tune_job = openai.FineTuningJob.create(training_file=file_id, model="gpt-4o")`,
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    tagline: "Automated Deployment & High SLA Scaling",
    description: "Multi-cloud infrastructure managed through code with automated CI/CD pipelines, container orchestration, and continuous monitoring.",
    stack: [
      {
        name: "AWS Infrastructure",
        desc: "ECS, Lambda, S3, CloudFront & RDS",
        snippet: `resource "aws_ecs_service" "cortex_app" {\n  name = "cortex-api"\n  cluster = aws_ecs_cluster.main.id\n}`,
      },
      {
        name: "Google Cloud Platform",
        desc: "Cloud Run, BigQuery & Vertex AI",
        snippet: `gcloud run deploy cortex-api --image gcr.io/cortex/api:latest --region us-central1`,
      },
      {
        name: "Docker & Kubernetes",
        desc: "Containerized microservice scaling",
        snippet: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: cortex-service`,
      },
      {
        name: "Vercel Edge Network",
        desc: "Global edge deployment & CDN",
        snippet: `export const config = { runtime: 'edge' };\nexport default function handler() { return new Response('Edge OK'); }`,
      },
      {
        name: "GitHub Actions",
        desc: "Automated CI/CD testing & deployment",
        snippet: `- name: Run Tests\n  run: npm run test\n- name: Deploy\n  run: npm run deploy`,
      },
      {
        name: "Terraform",
        desc: "Infrastructure as Code (IaC) blueprints",
        snippet: `module "vpc" {\n  source = "terraform-aws-modules/vpc/aws"\n  cidr = "10.0.0.0/16"\n}`,
      },
    ],
  },
  {
    id: "data",
    title: "Database & Security",
    icon: Database,
    tagline: "ACID Compliance, Caching & Encryption",
    description: "Resilient data storage layer with row-level security, connection pooling, and multi-region replication.",
    stack: [
      {
        name: "PostgreSQL",
        desc: "Relational core database with PgBouncer",
        snippet: `CREATE TABLE team_members (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name TEXT NOT NULL\n);`,
      },
      {
        name: "Supabase",
        desc: "Postgres backend with RLS & Realtime",
        snippet: `const { data } = await supabase.from('team').select('*');`,
      },
      {
        name: "Prisma ORM",
        desc: "Type-safe database querying layer",
        snippet: `datasource db {\n  provider = "postgresql"\n  url = env("DATABASE_URL")\n}`,
      },
      {
        name: "Redis",
        desc: "In-memory caching & pub/sub messaging",
        snippet: `await redis.set('rate_limit:user_1', '10', 'EX', 60);`,
      },
      {
        name: "MongoDB",
        desc: "NoSQL document storage for unstructured data",
        snippet: `db.logs.createIndex({ timestamp: -1 });`,
      },
      {
        name: "AES-256 Encryption",
        desc: "At-rest and in-transit data security",
        snippet: `const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);`,
      },
    ],
  },
];

export const AboutTechMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const currentCategory = TECH_MATRIX.find((t) => t.id === activeTab) || TECH_MATRIX[0];
  const activeTech = currentCategory.stack[selectedItemIdx] || currentCategory.stack[0];

  return (
    <section className="py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="OUR TECH STACK"
          title="Battle-Tested Architecture & Code Snippets"
          gradientWord="Architecture"
          description="Click any technology to preview live production code snippets."
          align="center"
        />

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {TECH_MATRIX.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedItemIdx(0);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-gradient-accent text-white shadow-glow-purple"
                    : "bg-surface/50 border border-white/10 text-text-secondary hover:border-white/20 hover:text-white"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tech Stack Panel with Interactive Code Preview Window */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <SpotlightCard
              className="p-8 sm:p-12 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
              innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Technology List */}
              <div className="lg:col-span-7">
                <div className="mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <currentCategory.icon className="w-6 h-6 text-accent-purple" />
                    <h3 className="text-2xl font-bold text-white">{currentCategory.title}</h3>
                  </div>
                  <p className="text-xs text-text-secondary">{currentCategory.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCategory.stack.map((item, idx) => {
                    const isSelected = idx === selectedItemIdx;
                    return (
                      <div
                        key={item.name}
                        onClick={() => setSelectedItemIdx(idx)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-accent-purple/20 border-accent-purple shadow-glow-purple text-white"
                            : "bg-[#060814] border-white/10 text-text-secondary hover:border-white/30 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-accent-cyan" : "text-emerald-400"}`} />
                          <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Production Syntax Code Window */}
              <div className="lg:col-span-5 bg-[#040612] rounded-2xl border border-white/15 p-4 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                    <span className="text-white font-bold">{activeTech.name} {"//"} Code Snippet</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">cortex-spec</span>
                </div>

                <pre className="text-accent-cyan leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  <code>{activeTech.snippet}</code>
                </pre>
              </div>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
