"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { QuickConsultationFab } from "@/components/ui/QuickConsultationFab";

export const PublicOrAdminShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Render clean admin environment without public marketing header/footer/cookie banner
    return <div className="min-h-screen bg-[#06060E] text-white flex flex-col">{children}</div>;
  }

  // Render public website shell with marketing header, main padding, footer, and quick FAB
  return (
    <>
      <Header />
      <main className="flex-grow pt-20 sm:pt-24">{children}</main>
      <Footer />
      <CookieConsent />
      <QuickConsultationFab />
    </>
  );
};
