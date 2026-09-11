'use client';

import React from 'react';

interface DestinationStat {
  name: string;
  count: number;
  percentage: number;
}

const destinationStats: DestinationStat[] = [
  { name: 'VALENCIA', count: 1, percentage: 20 },
  { name: 'LISBON', count: 1, percentage: 20 },
  { name: 'MADRID (SALAMANCA / CHAMBERÍ)', count: 1, percentage: 20 },
  { name: 'PORTO (FOZ DO DOURO)', count: 1, percentage: 20 },
  { name: 'BARCELONA (SARRIÀ-SANT GERVASI)', count: 1, percentage: 20 },
];

export default function Destinations() {
  return (
    <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
        <h2 className="text-xs font-extrabold text-neutral-800 uppercase tracking-widest">
          DESTINATIONS
        </h2>
        <span className="text-xs font-mono font-semibold text-neutral-400">
          5 Clients
        </span>
      </div>

      {/* List */}
      <div className="space-y-5">
        {destinationStats.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-neutral-800 uppercase tracking-tight">
                {item.name}
              </span>
              <span className="font-mono font-bold text-neutral-500">
                {item.count} ({item.percentage}%)
              </span>
            </div>
            {/* Progress line */}
            <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#ff3b30] h-full rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}