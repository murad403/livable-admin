'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Trip {
  id: string;
  client: string;
  location: string;
  dates: string;
  agents: string;
}

const trips: Trip[] = [
  {
    id: '1',
    client: 'ALEX & SARAH VANCE',
    location: 'VALENCIA',
    dates: 'Nov 12 - Nov 15, 2026',
    agents: 'Tiago Santos & Maria Gomez',
  },
  {
    id: '2',
    client: 'ELENA ROSSI & MARCUS COLE',
    location: 'LISBON',
    dates: 'Jan 22 - Jan 25, 2027',
    agents: 'Sofia Mendes',
  },
];

export default function UpcomingTrips() {
  return (
    <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
          UPCOMING TRIPS
        </h2>
        <a
          href="#"
          className="text-xs font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <span>ALL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="p-3 bg-neutral-50/60 rounded border border-neutral-100/80 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-neutral-800 uppercase tracking-tight text-xs">
                {trip.client}
              </span>
              <span className="text-[11px] font-extrabold text-[#ff3b30] uppercase tracking-wider">
                {trip.location}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
              <span>{trip.dates}</span>
              <span>{trip.agents}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}