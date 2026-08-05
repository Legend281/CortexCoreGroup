import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-background text-white font-sans antialiased min-h-screen flex flex-col selection:bg-accent-purple/30 selection:text-white">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
