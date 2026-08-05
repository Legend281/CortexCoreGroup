"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Something went wrong!</h2>
      <p className="text-text-secondary max-w-md mb-6 text-sm">
        An unexpected runtime error occurred. Our team has been notified.
      </p>
      <Button variant="primary" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
