import React from "react";
import { BlogHero } from "@/components/sections/BlogHero";
import { BlogFeatured } from "@/components/sections/BlogFeatured";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { BlogNewsletter } from "@/components/sections/BlogNewsletter";
import { BottomCTA } from "@/components/sections/BottomCTA";
import { BLOG_POSTS } from "@/data/blog";

async function getPosts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return BLOG_POSTS;
    return res.json();
  } catch {
    return BLOG_POSTS;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Canvas Background & Reader Stats */}
      <BlogHero />

      {/* 2. Featured Lead Article Spotlight Card */}
      <BlogFeatured posts={posts} />

      {/* 3. Interactive Searchable & Filterable Articles Directory Grid */}
      <BlogGrid posts={posts} />

      {/* 4. Monthly Technical Newsletter Subscription Bar */}
      <BlogNewsletter />

      {/* 5. High-Converting Bottom Action Banner */}
      <BottomCTA />
    </div>
  );
}
