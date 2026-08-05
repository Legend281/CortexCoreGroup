import React from "react";

export default function TermsPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-text-secondary space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p>Last updated: August 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using the website operated by Cortex Core Group, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not access the site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. Intellectual Property</h2>
          <p>
            All content, visual interfaces, graphics, code, and design materials on this site are the intellectual property of Cortex Core Group and are protected by applicable copyright and trademark laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Limitation of Liability</h2>
          <p>
            Cortex Core Group will not be liable for any indirect, incidental, or consequential damages resulting from your access to or inability to access this website or our consulting services.
          </p>
        </section>
      </div>
    </div>
  );
}
