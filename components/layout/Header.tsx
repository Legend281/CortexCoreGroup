"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, Mail, Phone, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/", number: "01" },
  { name: "About Us", href: "/about", number: "02" },
  { name: "Services", href: "/services", number: "03" },
  { name: "Our Work", href: "/our-work", number: "04" },
  { name: "Team", href: "/team", number: "05" },
  { name: "Blog", href: "/blog", number: "06" },
  { name: "Contact", href: "/contact", number: "07" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on route change or ESC
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-2.5 sm:py-3"
            : "bg-transparent py-3 sm:py-4"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo — Optimized scaling on small screens */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/brand/cortex-logo.png"
                alt="Cortex Core Group"
                width={260}
                height={80}
                priority
                style={{ width: "auto" }}
                className="h-11 sm:h-15 md:h-18 object-contain brightness-110 contrast-105 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full active:scale-95",
                    isActive
                      ? "text-white font-semibold"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-accent-purple/20 border border-accent-purple/40 rounded-full shadow-glow-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md" showArrow>
                Let&apos;s Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button with Touch Ripple Effect */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white bg-surface/90 backdrop-blur-md rounded-2xl border border-white/15 active:scale-90 transition-all focus:outline-none hover:border-accent-purple/50 shadow-md"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#06060E]/98 backdrop-blur-3xl flex flex-col justify-between p-5 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <Image
                  src="/images/brand/cortex-logo.png"
                  alt="Cortex Core Group"
                  width={200}
                  height={65}
                  priority
                  style={{ width: "auto" }}
                  className="h-10 sm:h-12 object-contain brightness-110"
                />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/15 text-text-secondary hover:text-white hover:bg-white/10 active:scale-90 transition-all shadow-md"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-4 sm:py-6 space-y-1.5 sm:space-y-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between text-base font-semibold py-3 px-4 rounded-2xl transition-all min-h-[48px] sm:min-h-[52px] active:scale-[0.98]",
                        isActive
                          ? "text-white bg-accent-purple/20 border border-accent-purple/40 shadow-glow-purple font-bold"
                          : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-accent-purple">
                          {link.number}
                        </span>
                        <span className="tracking-wide text-sm sm:text-base">{link.name}</span>
                      </div>
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isActive ? "text-accent-cyan translate-x-1" : "text-white/20"
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 space-y-3 sm:space-y-4">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  className="w-full shadow-glow-purple min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm font-bold active:scale-95"
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-accent-cyan" />
                  <span>Book Scope Consultation</span>
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="mailto:info@cortexcoregroup.com"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface border border-white/10 text-[11px] font-mono text-text-secondary hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                  <span className="truncate">Email Studio</span>
                </a>
                <a
                  href="https://wa.me/237670000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface border border-white/10 text-[11px] font-mono text-emerald-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
