import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07070F] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* CTA Banner Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="relative rounded-3xl bg-surface border border-white/10 p-8 sm:p-12 overflow-hidden shadow-glow-purple flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to Build Something <span className="text-gradient">Amazing?</span>
            </h3>
            <p className="mt-2 text-text-secondary max-w-xl text-sm sm:text-base">
              Let&apos;s turn your ideas into intelligent digital solutions. Partner with Cortex Core Group today.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <Link href="/contact">
              <Button variant="primary" size="lg" showArrow>
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        {/* Col 1: Brand & Socials */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <Image
              src="/images/brand/cortex-logo.png"
              alt="Cortex Core Group"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-text-secondary leading-relaxed">
            We are a technology company building smart, innovative and scalable digital solutions for global enterprises.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {[
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-purple hover:bg-accent-purple/10 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "Our Work", href: "/our-work" },
              { name: "Team", href: "/team" },
              { name: "Blog", href: "/blog" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            {[
              "Software Development",
              "Mobile App Development",
              "AI & Automation",
              "UI/UX Design",
              "Cloud Solutions",
              "IT Consulting",
            ].map((service, i) => (
              <li key={i}>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors duration-200"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Us */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent-purple shrink-0 mt-1" />
              <span>Buea, South West Region, Cameroon</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent-purple shrink-0" />
              <a
                href="mailto:info@cortexcoregroup.com"
                className="hover:text-white transition-colors"
              >
                info@cortexcoregroup.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent-purple shrink-0" />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-secondary gap-4">
        <p>© 2026 Cortex Core Group. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
