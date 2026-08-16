import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const message = await prisma.message.findUnique({
      where: { id: params.id },
    });
    if (message) return NextResponse.json(message);
  } catch (error) {}

  const local = dataStore.getMessages().find((m) => m.id === params.id);
  if (local) return NextResponse.json(local);

  return NextResponse.json({ error: "Message not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { read } = body;

    const messages = dataStore.getMessages();
    const existing = messages.find((m) => m.id === params.id);
    if (existing) {
      existing.read = read !== undefined ? read : true;
    }

    await logAudit({
      action: "MESSAGE_READ",
      details: `Marked client inquiry #${params.id} (${existing?.name || "Lead"}) as ${read ? "Read" : "Unread"}`,
    });

    try {
      await (prisma.message as any).update({
        where: { id: params.id },
        data: { read: !!read },
      });
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Inquiry status updated" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const messages = dataStore.getMessages();
    const existing = messages.find((m) => m.id === params.id);

    dataStore.deleteMessage(params.id);

    await logAudit({
      action: "MESSAGE_DELETE",
      details: `Deleted client inquiry #${params.id} (${existing?.name || "Lead"})`,
    });

    try {
      await prisma.message.delete({
        where: { id: params.id },
      });
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
