import React from "react";

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-text-secondary space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p>Last updated: August 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
          <p>
            Cortex Core Group collects personal information that you voluntarily provide to us when submitting inquiries through our contact forms, subscribing to updates, or engaging with our consulting services. This data may include your name, email address, company name, phone number, and project details.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
          <p>
            We use the collected information solely to provide, operate, and maintain our consulting services, respond to your inquiries, send project proposals, and improve website performance. We do not sell your personal data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">3. Data Protection & GDPR Compliance</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal data. European Union citizens have rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, or erase personal data upon request.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">4. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at <a href="mailto:info@cortexcoregroup.com" className="text-accent-purple underline">info@cortexcoregroup.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
