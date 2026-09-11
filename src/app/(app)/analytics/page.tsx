'use client';

import React from 'react';
import { Download } from 'lucide-react';
import AnalyticsStats from '@/components/app/AnalyticsStats';
import Destinations from '@/components/app/Destinations';
import VisaRegimes from '@/components/app/VisaRegimes';

export default function AnalyticsPage() {
  const handleExportCSV = () => {
    alert('Exporting Analytics CSV Report...');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top 3 Velocity & Performance Cards */}
      <AnalyticsStats />

      {/* Distribution Breakdown Cards (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Destinations />
        <VisaRegimes />
      </div>

      {/* Bottom Export CSV Report Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleExportCSV}
          className="border border-neutral-200 bg-white hover:bg-neutral-50 px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider text-neutral-800 flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
        >
          <Download className="w-4 h-4 text-neutral-500" />
          <span>EXPORT CSV REPORT</span>
        </button>
      </div>
    </div>
  );
}