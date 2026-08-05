"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { CheckCircle2, AlertCircle, Send, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional().nullable(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select an estimated budget"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to submit an inquiry",
  }),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const SERVICES = [
  "Software Development",
  "Data & AI Solutions",
  "Cloud & DevOps",
  "Mobile App Development",
  "UI/UX Design",
  "Cybersecurity & Audits",
  "IT Consulting",
];

const BUDGETS = ["$5k – $15k", "$15k – $50k", "$50k – $100k+", "Enterprise Custom"];

export const ContactFormSection: React.FC = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("$15k – $50k");

  const initialService = searchParams?.get("service") || "Software Development";
  const initialConsultant = searchParams?.get("consultant") || "";
  const initialProject = searchParams?.get("project") || "";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: initialService,
      budget: "$15k – $50k",
      message: initialConsultant
        ? `Hello! I would like to schedule an introductory consultation call with ${initialConsultant}.`
        : initialProject
        ? `Hello! I am interested in building a system similar to ${initialProject}.`
        : "",
      gdprConsent: false,
      honeypot: "",
    },
  });

  useEffect(() => {
    if (initialService) setValue("service", initialService);
    setValue("budget", selectedBudget);
  }, [initialService, selectedBudget, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit form");
      }

      setStatus("success");
      reset();
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="inquiry-form" className="py-24 relative bg-[#070712] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <SectionHeader
          eyebrow="INQUIRY FORM"
          title="Tell Us About Your Project Vision"
          gradientWord="Vision"
          description="Configure your project parameters below. An engineering lead will review your scope within 12 hours."
          align="center"
        />

        <SpotlightCard className="p-8 sm:p-12 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
          {status === "success" ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-6 shadow-glow-purple">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Inquiry Submitted!</h3>
              <p className="text-sm text-text-secondary max-w-md leading-relaxed mb-6">
                Thank you for reaching out to Cortex Core Group. Our principal technical leads have received your scope parameters and will respond within 12 hours.
              </p>
              <div className="p-4 rounded-2xl bg-surface/80 border border-white/10 text-xs font-mono text-emerald-400 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Ticket Created // Lead Engineer Assigned</span>
              </div>
              <Button variant="secondary" onClick={() => setStatus("idle")}>
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Honeypot hidden input */}
              <input
                type="text"
                {...register("honeypot")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {status === "error" && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    {...register("name")}
                    className="w-full bg-[#050714] border border-white/15 rounded-2xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-2">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    {...register("email")}
                    className="w-full bg-[#050714] border border-white/15 rounded-2xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Company & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Global SaaS"
                    {...register("company")}
                    className="w-full bg-[#050714] border border-white/15 rounded-2xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-2">
                    Service Capability Needed *
                  </label>
                  <select
                    {...register("service")}
                    className="w-full bg-[#050714] border border-white/15 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent-purple transition-all"
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-[#050714] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Estimated Budget Range Selection Pills */}
              <div>
                <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-3">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BUDGETS.map((b) => {
                    const isSel = selectedBudget === b;
                    return (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        className={`p-3 rounded-2xl border text-xs font-mono font-semibold text-center transition-all ${
                          isSel
                            ? "bg-accent-purple/20 border-accent-purple text-white shadow-glow-purple"
                            : "bg-[#050714] border-white/10 text-text-secondary hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Project Message */}
              <div>
                <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-2">
                  Project Scope & Timeline Details *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your product goals, technical stack preferences, desired launch date, and key features..."
                  {...register("message")}
                  className="w-full bg-[#050714] border border-white/15 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Row 5: GDPR Privacy Checkbox */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdpr"
                    {...register("gdprConsent")}
                    className="mt-1 accent-accent-purple w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="gdpr" className="text-xs text-text-secondary cursor-pointer leading-relaxed">
                    I agree to the processing of my personal data according to Cortex&apos;s{" "}
                    <a href="/privacy" className="text-accent-purple underline">
                      Privacy Policy
                    </a>
                    . 100% Confidential & NDA Protected.
                  </label>
                </div>
                {errors.gdprConsent && (
                  <p className="text-xs text-rose-400">{errors.gdprConsent.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "submitting"}
                className="w-full shadow-glow-purple"
              >
                {status === "submitting" ? "Submitting Scope..." : "Submit Project Scope"}
              </Button>
            </form>
          )}
        </SpotlightCard>
      </div>
    </section>
  );
};
