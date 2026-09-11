'use client';

import React from 'react';

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Intake to Scouting Velocity */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
          INTAKE TO SCOUTING VELOCITY
        </span>
        <div>
          <div className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            38 DAYS
          </div>
        </div>
        <div className="text-xs font-bold text-emerald-600 font-mono">
          -12% vs 2025 avg
        </div>
      </div>

      {/* Card 2: Scouting-to-Lease Rate */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
          SCOUTING-TO-LEASE RATE
        </span>
        <div>
          <div className="text-2xl font-extrabold text-[#ff3b30] tracking-tight">
            94.2%
          </div>
        </div>
        <div className="text-xs font-semibold text-neutral-400">
          Direct lease signed
        </div>
      </div>

      {/* Card 3: Avg Support Response */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
          AVG SUPPORT RESPONSE
        </span>
        <div>
          <div className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            1.8 HOURS
          </div>
        </div>
        <div className="text-xs font-semibold text-emerald-600">
          Queue resolution speed
        </div>
      </div>
    </div>
  );
}