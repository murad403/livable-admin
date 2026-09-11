'use client';

import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

export default function PrivacyTab() {
  const [formData, setFormData] = useState({
    effectiveDate: 'October 24, 2025',
    versionString: 'Version 2.4 (Iberian Jurisdictions)',
    dpoEmail: 'compliance@livable.co',
    subprocessors:
      'AWS EU (Frankfurt), Stripe Payments (EU), Google Workspace Enterprise (Ireland)',
    retentionClause:
      'Client dossiers and identification records are encrypted and retained for 5 years in compliance with EU Anti-Money Laundering (AML) directives.',
    biometricsClause:
      'All NIE/NIF biometric scheduling documentation is encrypted at rest using AES-256 and purged upon formal residency grant.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Live Privacy Policy saved and published!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-neutral-100 pb-3 space-y-1">
        <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
          <FileText className="w-4 h-4 text-[#ff3b30]" />
          <span>EDIT LIVE PRIVACY POLICY (GDPR / CCPA STANDARDS)</span>
        </div>
        <p className="text-xs text-neutral-400 font-medium">
          Changes saved here are instantly published to the public Privacy Policy page (/privacy-policy).
        </p>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EFFECTIVE DATE DISPLAY */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            EFFECTIVE DATE DISPLAY
          </label>
          <input
            type="text"
            value={formData.effectiveDate}
            onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* COMPLIANCE VERSION STRING */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            COMPLIANCE VERSION STRING
          </label>
          <input
            type="text"
            value={formData.versionString}
            onChange={(e) => setFormData({ ...formData, versionString: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* DATA PROTECTION OFFICER (DPO) CONTACT EMAIL */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            DATA PROTECTION OFFICER (DPO) CONTACT EMAIL
          </label>
          <input
            type="email"
            value={formData.dpoEmail}
            onChange={(e) => setFormData({ ...formData, dpoEmail: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* AUTHORIZED SUBPROCESSORS (CLOUD / GATEWAYS) */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            AUTHORIZED SUBPROCESSORS (CLOUD / GATEWAYS)
          </label>
          <input
            type="text"
            value={formData.subprocessors}
            onChange={(e) => setFormData({ ...formData, subprocessors: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* DATA RETENTION & AML REGULATORY CLAUSE */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          DATA RETENTION & AML REGULATORY CLAUSE
        </label>
        <textarea
          rows={3}
          value={formData.retentionClause}
          onChange={(e) => setFormData({ ...formData, retentionClause: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* BIOMETRICS & DOCUMENT ENCRYPTION SPECIAL CLAUSE */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          BIOMETRICS & DOCUMENT ENCRYPTION SPECIAL CLAUSE
        </label>
        <textarea
          rows={3}
          value={formData.biometricsClause}
          onChange={(e) => setFormData({ ...formData, biometricsClause: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Save & Publish Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-[#ff3b30] hover:bg-red-600 text-white px-6 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>SAVE & PUBLISH PRIVACY POLICY</span>
        </button>
      </div>
    </form>
  );
}