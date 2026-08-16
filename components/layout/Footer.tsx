import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07070F] border-t border-white/10 pt-12 sm:pt-16 pb-8 relative overflow-hidden">
      {/* Top Pre-Footer Callout Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className="relative rounded-3xl bg-surface border border-white/10 p-6 sm:p-12 overflow-hidden shadow-glow-purple flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to Build Something <span className="text-gradient">Amazing?</span>
            </h3>
            <p className="mt-2 text-text-secondary max-w-xl text-xs sm:text-base leading-relaxed">
              Let&apos;s turn your vision into an intelligent, high-impact digital platform. Partner with Cortex Core Group today.
            </p>
          </div>
          <div className="relative z-10 w-full sm:w-auto flex-shrink-0">
            <Link href="/contact" className="block w-full sm:w-auto">
              <Button variant="primary" size="lg" showArrow className="w-full sm:w-auto shadow-glow-purple font-bold">
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Responsive Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
        {/* Col 1: Brand & Socials */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <Link href="/" className="inline-block">
            <Image
              src="/images/brand/cortex-logo.png"
              alt="Cortex Core Group"
              width={240}
              height={75}
              style={{ width: "auto" }}
              className="h-12 sm:h-16 md:h-18 object-contain brightness-110 contrast-105 drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            />
          </Link>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Pioneering digital engineering studio creating enterprise web applications, mobile platforms, data systems, and intelligent AI architectures.
          </p>
          <div className="flex items-center gap-2.5 mt-2">
            {[
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-purple hover:bg-accent-purple/10 transition-all duration-200"
              >
                <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Services Catalog", href: "/services" },
              { name: "Our Work", href: "/our-work" },
              { name: "Team & Leadership", href: "/team" },
              { name: "Blog & Insights", href: "/blog" },
              { name: "Contact Studio", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors duration-200 inline-block py-0.5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Capabilities */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
            Specializations
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
            {[
              "Custom Software Engineering",
              "Mobile App Development",
              "AI & Machine Learning",
              "UI/UX & Product Design",
              "Cloud & DevOps Architecture",
              "Cybersecurity & Security Audits",
            ].map((service, i) => (
              <li key={i}>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors duration-200 inline-block py-0.5"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Us */}
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
            Headquarters & Inquiries
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
              <span>Buea, South West Region, Cameroon</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-accent-cyan shrink-0" />
              <a
                href="mailto:info@cortexcoregroup.com"
                className="hover:text-white transition-colors truncate"
              >
                info@cortexcoregroup.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href="tel:+237612345676"
                className="hover:text-white transition-colors"
              >
                +237 6 12 34 56 76
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-text-secondary gap-3 sm:gap-4 text-center sm:text-left">
        <p>© 2026 Cortex Core Group. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/admin" className="hover:text-white transition-colors font-mono">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};
