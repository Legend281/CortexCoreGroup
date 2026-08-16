"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminCommandPalette } from "@/components/admin/AdminCommandPalette";

export const AdminLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  const handleCloseMobile = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const handleOpenMobile = useCallback(() => {
    setMobileSidebarOpen(true);
  }, []);

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    // Verify session
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setCheckingAuth(false);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="h-screen w-screen bg-[#06060E] flex items-center justify-center text-sm font-mono text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-ping" />
          <span>Authenticating Cortex Admin Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#06060E] text-white flex overflow-hidden">
      {/* Desktop & Mobile Responsive Sidebar Drawer */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={handleCloseMobile}
      />

      {/* Main Panel */}
      <div className="flex-1 lg:pl-64 flex flex-col h-full overflow-hidden w-full">
        <AdminHeader onOpenMobileSidebar={handleOpenMobile} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Admin Command Palette (CTRL+K) */}
      <AdminCommandPalette />
    </div>
  );
};
