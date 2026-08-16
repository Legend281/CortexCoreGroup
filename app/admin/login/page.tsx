"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060E] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <SpotlightCard className="p-6 sm:p-10 bg-[#0A0D1B]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          {/* Brand Centerpiece */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-block mb-4 group">
              <Image
                src="/images/brand/cortex-logo.png"
                alt="Cortex Core Group"
                width={300}
                height={90}
                priority
                style={{ width: "auto" }}
                className="h-16 sm:h-20 max-w-[240px] object-contain brightness-115 contrast-105 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]"
              />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Enterprise Admin Portal
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Secure master access for Cortex Core Group operations
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider mb-2">
                Administrative Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
                  <Lock className="w-4 h-4 text-accent-purple" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter root passcode..."
                  required
                  className="w-full bg-[#050714] border border-white/15 rounded-2xl pl-10 pr-12 py-3 text-base sm:text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-secondary hover:text-white"
                  aria-label={showPassword ? "Hide passcode" : "Show passcode"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full shadow-glow-purple flex items-center justify-center font-bold min-h-[46px]"
            >
              {loading ? (
                <span>Authenticating Session...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Sign In to Command</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-text-secondary text-[11px] font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Session // SHA-256 Signature</span>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
