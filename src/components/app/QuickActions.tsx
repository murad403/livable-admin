'use client';

import React from 'react';
import { UserPlus, Compass, Download } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs">
      <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
        QUICK ACTIONS
      </h2>

      <div className="space-y-2.5">
        {/* + NEW CLIENT */}
        <button className="w-full bg-[#1c1c1c] hover:bg-black text-white py-2.5 px-4 rounded font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-colors shadow-2xs cursor-pointer">
          <span>+ NEW CLIENT</span>
          <UserPlus className="w-4 h-4" />
        </button>

        {/* + SCHEDULE TRIP */}
        <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 py-2.5 px-4 rounded font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-colors shadow-2xs cursor-pointer">
          <span>+ SCHEDULE TRIP</span>
          <Compass className="w-4 h-4 text-[#ff3b30]" />
        </button>

        {/* EXPORT CSV */}
        <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 py-2.5 px-4 rounded font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-colors shadow-2xs cursor-pointer">
          <span>EXPORT CSV</span>
          <Download className="w-4 h-4 text-neutral-400" />
        </button>
      </div>
    </div>
  );
}