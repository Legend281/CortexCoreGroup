import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";

// Zod Schema validation for the contact form input
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional().nullable(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy terms",
  }),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate inputs
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot anti-spam check (if populated, silently discard or return success)
    if (data.honeypot) {
      console.warn("Spam detected via honeypot field");
      return NextResponse.json({ success: true, message: "Message received (spam)" });
    }

    // Save message to Supabase database via Prisma
    const savedMessage = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        service: data.service,
        budget: data.budget || null,
        message: data.message,
      },
    });

    // Send email notification using Resend
    const recipient = process.env.CONTACT_EMAIL_RECIPIENT || "info@cortexcoregroup.com";
    if (resend) {
      try {
        await resend.emails.send({
          from: "Cortex Contact Form <onboarding@resend.dev>",
          to: recipient,
          subject: `New Inquiry from ${data.name} - ${data.service}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || "N/A"}</p>
            <p><strong>Service Needed:</strong> ${data.service}</p>
            <p><strong>Estimated Budget:</strong> ${data.budget || "Not Specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send notification email via Resend:", emailError);
        // Note: We don't fail the request if just the email notification fails, 
        // since the message is already safely stored in the database.
      }
    } else {
      console.warn("Resend API key is missing. Skipping email notification.");
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully sent.",
      data: { id: savedMessage.id },
    });
  } catch (error) {
    console.error("Failed to process contact inquiry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
