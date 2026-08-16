import React from "react";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";

export const metadata = {
  title: "Cortex Admin — Enterprise Management Portal",
  description: "Master Control Panel for Cortex Core Group Platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
