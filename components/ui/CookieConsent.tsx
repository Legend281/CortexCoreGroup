"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cortex_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cortex_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cortex_cookie_consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-accent-purple font-semibold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Cookie & Privacy Settings</span>
            </div>
            <button
              onClick={handleDecline}
              className="text-text-secondary hover:text-white"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-text-secondary leading-relaxed">
            We use cookies to analyze site traffic and enhance your browsing experience. By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
          </p>
          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecline}
              className="text-xs"
            >
              Decline
            </Button>
            <Button variant="primary" size="sm" onClick={handleAccept}>
              Accept All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
