import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { BlogPostItem } from "@/data/blog";

export async function GET() {
  try {
    const dbPosts = await Promise.race([
      prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (dbPosts && dbPosts.length > 0) {
      dataStore.setBlogPosts(dbPosts as any);
      return NextResponse.json(dbPosts);
    }
  } catch (err) {}

  return NextResponse.json(dataStore.getBlogPosts());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      content,
      image,
      category,
      categoryLabel,
      readTime,
      author,
      authorRole,
      authorAvatar,
      tags,
      featured,
    } = body;

    if (!title || !excerpt) {
      return NextResponse.json(
        { error: "Title and excerpt are required" },
        { status: 400 }
      );
    }

    const postSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newPost: BlogPostItem = {
      slug: postSlug,
      title,
      excerpt,
      content: content || "",
      image: image || "",
      category: category || "ENGINEERING",
      categoryLabel: categoryLabel || "FULL-STACK ENGINEERING",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      readTime: readTime || "5 min read",
      author: author || "Randy Ojong",
      authorRole: authorRole || "Lead Full-Stack Developer",
      authorAvatar: authorAvatar || "RO",
      tags: Array.isArray(tags) ? tags : [],
      featured: !!featured,
    };

    dataStore.upsertBlogPost(newPost);

    await logAudit({
      action: "BLOG_CREATE",
      details: `Published blog article: "${newPost.title}" (slug: ${postSlug})`,
    });

    try {
      await prisma.post.upsert({
        where: { slug: postSlug },
        update: {
          title: newPost.title,
          excerpt: newPost.excerpt,
          content: newPost.content,
          image: newPost.image,
          category: newPost.category,
          categoryLabel: newPost.categoryLabel,
          readTime: newPost.readTime,
          author: newPost.author,
          authorRole: newPost.authorRole,
          authorAvatar: newPost.authorAvatar,
          tags: newPost.tags,
          featured: newPost.featured,
        },
        create: {
          slug: postSlug,
          title: newPost.title,
          excerpt: newPost.excerpt,
          content: newPost.content,
          image: newPost.image,
          category: newPost.category,
          categoryLabel: newPost.categoryLabel,
          date: newPost.date,
          readTime: newPost.readTime,
          author: newPost.author,
          authorRole: newPost.authorRole,
          authorAvatar: newPost.authorAvatar,
          tags: newPost.tags,
          featured: newPost.featured,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${postSlug}`);
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
