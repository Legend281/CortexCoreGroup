"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS, BlogPostItem } from "@/data/blog";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, ArrowRight, Sparkles, Terminal, Code2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export interface BlogFeaturedProps {
  posts?: BlogPostItem[];
}

export const BlogFeatured: React.FC<BlogFeaturedProps> = ({ posts }) => {
  const list = posts || BLOG_POSTS;
  const featured = list.find((p) => p.featured) || list[0];
  const shouldReduceMotion = useReducedMotion();

  if (!featured) return null;

  return (
    <section className="py-12 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SpotlightCard
            className="p-8 sm:p-12 bg-surface/60 backdrop-blur-xl border border-accent-purple/30 rounded-3xl shadow-2xl overflow-hidden group"
            innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left Column: Article Metadata & Lead Text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <Pill variant="eyebrow" className="text-[10px] py-0.5 px-2.5">
                  FEATURED PUBLICATION
                </Pill>
                <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                  <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featured.readTime}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4 group-hover:text-accent-purple transition-colors">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                {featured.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.tags.map((tag) => (
                  <Pill key={tag} variant="tag">
                    {tag}
                  </Pill>
                ))}
              </div>

              {/* Author & Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-xs font-bold shadow-glow-purple">
                    {featured.authorAvatar}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">{featured.author}</span>
                    <span className="text-xs text-text-secondary">{featured.authorRole}</span>
                  </div>
                </div>

                <Link href={`/blog/${featured.slug}`}>
                  <Button variant="primary" size="md" showArrow className="shadow-glow-purple">
                    Read Publication
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 3D MacOS Terminal Frame with Syntax Preview */}
            <div className="lg:col-span-5">
              <TiltCard maxTilt={8}>
                <div className="rounded-2xl bg-[#040612] border border-white/15 p-5 shadow-2xl font-mono text-xs">
                  {/* MacOS Controls */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                      <span className="text-[10px] text-text-secondary ml-2 flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-accent-purple" />
                        <span>nextjs15-architecture.tsx</span>
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">CODE SPEC</span>
                  </div>

                  {/* Code Snippet */}
                  <pre className="text-accent-cyan leading-relaxed overflow-x-auto whitespace-pre-wrap text-[11px]">
                    <code>{`// Next.js 15 Server Action Spec
export async function updateSystemConfig(
  formData: FormData
) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  
  await prisma.config.update({
    where: { tenantId: session.tenantId },
    data: { latencySlaMs: 15 },
  });
  
  revalidatePath('/dashboard');
}`}</code>
                  </pre>
                </div>
              </TiltCard>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
