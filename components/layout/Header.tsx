"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, Mail, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Work", href: "/our-work" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo — Full Cortex Core Group brand image, no separate text */}
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/images/brand/cortex-logo.png"
            alt="Cortex Core Group"
            width={180}
            height={48}
            priority
            className="h-10 sm:h-12 w-auto object-contain group-hover:brightness-110 transition-all duration-300"
          />
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

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <Button variant="primary" size="md" showArrow>
              Let&apos;s Talk
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center text-white bg-surface rounded-xl border border-white/10 active:scale-95 transition-all focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-accent-purple" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden fixed top-[64px] left-0 right-0 bottom-0 bg-[#06060E]/98 backdrop-blur-2xl px-6 py-6 overflow-y-auto flex flex-col justify-between border-t border-white/10 shadow-2xl z-50"
          >
            <div className="space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between text-base font-semibold py-3 px-4 rounded-xl transition-all min-h-[48px]",
                      isActive
                        ? "text-white bg-accent-purple/20 border border-accent-purple/40 shadow-glow-purple"
                        : "text-text-secondary hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={cn("w-4 h-4 transition-transform", isActive ? "text-accent-cyan" : "text-white/20")} />
                  </Link>
                );
              })}
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-4 mb-16">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" showArrow className="w-full shadow-glow-purple min-h-[48px]">
                  Book Scope Consultation
                </Button>
              </Link>

              <div className="flex items-center justify-around text-xs font-mono text-text-secondary pt-2">
                <a
                  href="mailto:info@cortexcoregroup.com"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent-purple" />
                  <span>Email Us</span>
                </a>
                <span>•</span>
                <a
                  href="tel:+237612345676"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent-cyan" />
                  <span>+237 612 345 676</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
