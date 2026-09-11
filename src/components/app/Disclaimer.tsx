'use client';

import React, { useState } from 'react';
import { AlertCircle, Save } from 'lucide-react';

export default function Disclaimer() {
  const [formData, setFormData] = useState({
    frameworkVersion: 'Current Edition (US, Spanish & Portuguese Regulatory Framework)',
    barAssociationNotice:
      'Livable is not a law firm. Visa and immigration petitions are formally filed through vetted, independent local Bar-certified attorneys (Colegio de Abogados / Ordem dos Advogados).',
    cpaDisclaimer:
      'Beckham Law, NHR 2.0, and tax residency calculations represent informational modeling and must be certified by an independent Certified Public Accountant (Gestor / Contabilista Certificado).',
    realEstateNotice:
      'Real estate valuations and scouting dossiers represent market analysis and do not constitute formal bank appraisal guarantees.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Live Legal Disclaimer saved and published!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-neutral-100 pb-3 space-y-1">
        <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-[#ff3b30]" />
          <span>EDIT LIVE LEGAL DISCLAIMER (REGULATORY & ADVISORY SCOPE)</span>
        </div>
        <p className="text-xs text-neutral-400 font-medium">
          Changes saved here are instantly published to the public Legal Disclaimer page (/legal-disclaimer).
        </p>
      </div>

      {/* EDITION / REGULATORY FRAMEWORK VERSION */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          EDITION / REGULATORY FRAMEWORK VERSION
        </label>
        <input
          type="text"
          value={formData.frameworkVersion}
          onChange={(e) => setFormData({ ...formData, frameworkVersion: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
        />
      </div>

      {/* BAR ASSOCIATION & NON-LEGAL REPRESENTATION STATUTORY NOTICE */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          BAR ASSOCIATION & NON-LEGAL REPRESENTATION STATUTORY NOTICE
        </label>
        <textarea
          rows={3}
          value={formData.barAssociationNotice}
          onChange={(e) => setFormData({ ...formData, barAssociationNotice: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* TAX AUTHORITY / CERTIFIED PUBLIC ACCOUNTANT DISCLAIMER */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          TAX AUTHORITY / CERTIFIED PUBLIC ACCOUNTANT DISCLAIMER
        </label>
        <textarea
          rows={3}
          value={formData.cpaDisclaimer}
          onChange={(e) => setFormData({ ...formData, cpaDisclaimer: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* REAL ESTATE VALUATION & DOSSIER LIABILITY NOTICE */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          REAL ESTATE VALUATION & DOSSIER LIABILITY NOTICE
        </label>
        <textarea
          rows={3}
          value={formData.realEstateNotice}
          onChange={(e) => setFormData({ ...formData, realEstateNotice: e.target.value })}
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
          <span>SAVE & PUBLISH LEGAL DISCLAIMER</span>
        </button>
      </div>
    </form>
  );
}