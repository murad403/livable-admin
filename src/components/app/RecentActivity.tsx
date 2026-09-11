'use client';

import React from 'react';

interface Activity {
  id: string;
  author: string;
  time: string;
  description: string;
}

const activities: Activity[] = [
  {
    id: '1',
    author: 'Tiago Santos',
    time: '12 mins ago',
    description: 'DISPATCHED SCOUTING ITINERARY: A...',
  },
  {
    id: '2',
    author: 'Admin System',
    time: '45 mins ago',
    description: 'NIE DOCUMENT VERIFIED: DAVID CHE...',
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs">
      {/* Header */}
      <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
        RECENT ACTIVITY
      </h2>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-neutral-600">
                {item.author}
              </span>
              <span className="text-neutral-400 font-mono text-[10px]">
                {item.time}
              </span>
            </div>
            <div className="text-xs font-extrabold text-neutral-800 uppercase tracking-tight truncate">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}