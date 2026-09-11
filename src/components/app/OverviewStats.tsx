'use client';

import React from 'react';
import { Users, Compass, MessageSquare, TrendingUp } from 'lucide-react';

export default function OverviewStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Active Clients */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            ACTIVE CLIENTS
          </span>
          <Users className="w-4 h-4 text-neutral-400" />
        </div>
        <div>
          <div className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            5
          </div>
        </div>
        <div className="text-xs font-semibold text-neutral-400 tracking-wider">
          ES : 3 · PT : 2
        </div>
      </div>

      {/* Card 2: Scouting Trips */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            SCOUTING TRIPS
          </span>
          <Compass className="w-4 h-4 text-[#ff3b30]" />
        </div>
        <div>
          <div className="text-3xl font-extrabold text-[#ff3b30] tracking-tight">
            3
          </div>
        </div>
        <div className="text-xs font-semibold text-neutral-400 tracking-wider">
          4 Scheduled
        </div>
      </div>

      {/* Card 3: Support Queue */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            SUPPORT QUEUE
          </span>
          <MessageSquare className="w-4 h-4 text-neutral-400" />
        </div>
        <div>
          <div className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            2
          </div>
        </div>
        <div className="text-xs font-bold text-[#ff3b30] tracking-wider">
          Action Needed
        </div>
      </div>

      {/* Card 4: Avg Progress */}
      <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs flex flex-col justify-between h-32">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
            AVG PROGRESS
          </span>
          <TrendingUp className="w-4 h-4 text-neutral-400" />
        </div>
        <div>
          <div className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            65%
          </div>
        </div>
        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#ff3b30] h-full w-[65%] rounded-full" />
        </div>
      </div>
    </div>
  );
}