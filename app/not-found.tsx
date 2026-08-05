import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <span className="text-sm font-mono font-bold text-accent-purple tracking-widest uppercase mb-2">
        404 ERROR
      </span>
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-text-secondary max-w-md mb-8 text-sm sm:text-base">
        The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg" showArrow>
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
