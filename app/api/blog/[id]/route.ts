import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    dataStore.deleteBlogPost(params.id);

    await logAudit({
      action: "BLOG_DELETE",
      details: `Deleted blog article (slug: ${params.id})`,
    });

    try {
      await prisma.post.delete({
        where: { slug: params.id },
      });
    } catch (_) {}

    try {
      revalidatePath("/blog");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
