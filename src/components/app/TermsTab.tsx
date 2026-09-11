'use client';

import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

export default function TermsTab() {
  const [formData, setFormData] = useState({
    lastModified: 'October 2025',
    jurisdiction: 'Courts of Valencia, Spain and Lisbon, Portugal',
    retainerPolicy:
      'Scouting trip reservations require a 50% commitment fee to reserve private drivers, bilingual scouts, and property access windows.',
    cancellationNotice:
      'Notice of cancellation must be received at least 14 days prior to the first scouting itinerary date for a full refund.',
    transparencyClause:
      'Livable acts exclusively as an independent relocation concierge and buyer-advisory liaison. We do not accept undisclosed broker kickbacks.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Live Terms of Service saved and published!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-neutral-100 pb-3 space-y-1">
        <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
          <FileText className="w-4 h-4 text-[#ff3b30]" />
          <span>EDIT LIVE TERMS OF SERVICE (CLIENT ENGAGEMENT AGREEMENT)</span>
        </div>
        <p className="text-xs text-neutral-400 font-medium">
          Changes saved here are instantly published to the public Terms of Service page (/terms-of-service).
        </p>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LAST MODIFIED DATE */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            LAST MODIFIED DATE
          </label>
          <input
            type="text"
            value={formData.lastModified}
            onChange={(e) => setFormData({ ...formData, lastModified: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* GOVERNING JURISDICTION & CHOICE OF LAW */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            GOVERNING JURISDICTION & CHOICE OF LAW
          </label>
          <input
            type="text"
            value={formData.jurisdiction}
            onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* SCOUTING TRIP RETAINER & DEPOSIT POLICY */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          SCOUTING TRIP RETAINER & DEPOSIT POLICY
        </label>
        <textarea
          rows={3}
          value={formData.retainerPolicy}
          onChange={(e) => setFormData({ ...formData, retainerPolicy: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* CANCELLATION & RESCHEDULING WINDOW NOTICE */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          CANCELLATION & RESCHEDULING WINDOW NOTICE
        </label>
        <textarea
          rows={3}
          value={formData.cancellationNotice}
          onChange={(e) => setFormData({ ...formData, cancellationNotice: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* INDEPENDENT ADVISORY & NO-KICKBACK TRANSPARENCY CLAUSE */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          INDEPENDENT ADVISORY & NO-KICKBACK TRANSPARENCY CLAUSE
        </label>
        <textarea
          rows={3}
          value={formData.transparencyClause}
          onChange={(e) => setFormData({ ...formData, transparencyClause: e.target.value })}
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
          <span>SAVE & PUBLISH TERMS OF SERVICE</span>
        </button>
      </div>
    </form>
  );
}