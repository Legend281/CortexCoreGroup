import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PublicOrAdminShell } from "@/components/layout/PublicOrAdminShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cortex Core Group — Smart Solutions. Real Impact.",
  description:
    "Cortex Core Group is a tech consulting & product development studio building intelligent digital solutions, web apps, mobile apps, data platforms, and cloud infrastructure.",
  keywords: [
    "Tech Consulting",
    "Software Development",
    "Product Studio",
    "Next.js",
    "AI Solutions",
    "Cloud Architecture",
    "Mobile Apps",
  ],
  authors: [{ name: "Cortex Core Group" }],
  openGraph: {
    title: "Cortex Core Group — Smart Solutions. Real Impact.",
    description:
      "Transforming business ideas into intelligent digital experiences through innovation, creativity, and the power of AI.",
    url: "https://cortexcoregroup.com",
    siteName: "Cortex Core Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortex Core Group",
    description: "Smart Tech Solutions for a Smarter Future.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/brand/favicon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/images/brand/favicon.png"],
    apple: [
      { url: "/images/brand/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-background text-white font-sans antialiased min-h-screen flex flex-col selection:bg-accent-purple/30 selection:text-white">
        <PublicOrAdminShell>{children}</PublicOrAdminShell>
      </body>
    </html>
  );
}

