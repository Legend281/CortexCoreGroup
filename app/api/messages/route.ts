import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service: string;
  budget?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export async function GET() {
  try {
    const dbMessages = await Promise.race([
      prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);

    if (dbMessages && dbMessages.length > 0) {
      dataStore.setAuditLogs(dbMessages);
      return NextResponse.json(dbMessages);
    }
  } catch (error) {}

  return NextResponse.json(dataStore.getMessages());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

    const newMessage: MessageItem = {
      id: String(Date.now()),
      name,
      email,
      company: company || null,
      service: service || "General Inquiry",
      budget: budget || null,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    dataStore.addMessage(newMessage);

    await logAudit({
      action: "LEAD_SUBMITTED",
      details: `New client inquiry received from ${newMessage.name} (${newMessage.email}, Service: ${newMessage.service})`,
    });

    try {
      await prisma.message.create({
        data: {
          name,
          email,
          company: company || null,
          service: service || "General Inquiry",
          budget: budget || null,
          message,
        },
      });
    } catch (_) {}

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create message" },
      { status: 500 }
    );
  }
}
