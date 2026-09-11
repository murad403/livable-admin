'use client';

import React from 'react';

export interface DestinationData {
  id: string;
  name: string;
  country: string;
  clientsCount: number;
  leadScout: string;
  updatedDate: string;
  neighborhoods: string[];
  status: 'Published' | 'Draft' | 'Archived' | string;
}

interface DestinationsCardProps {
  destination: DestinationData;
  onEditStatus?: (destination: DestinationData) => void;
}

export default function DestinationsCard({
  destination,
  onEditStatus,
}: DestinationsCardProps) {
  const getBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'draft':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'archived':
        return 'bg-neutral-100 text-neutral-500 border-neutral-200';
      default:
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs">
      <div>
        {/* Top Row: Name, Country & Status */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
              {destination.name}
            </h3>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
              {destination.country}
            </p>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 border rounded-xs shrink-0 capitalize ${getBadgeStyle(
              destination.status
            )}`}
          >
            {destination.status}
          </span>
        </div>

        {/* Middle Details Box */}
        <div className="bg-neutral-50/80 p-3.5 rounded-xs my-3 text-xs space-y-1.5 border border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              CLIENTS:
            </span>
            <span className="font-extrabold text-neutral-900 text-xs">
              {destination.clientsCount}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              LEAD SCOUT:
            </span>
            <span className="font-medium text-neutral-800 text-xs">
              {destination.leadScout}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              UPDATED:
            </span>
            <span className="font-mono text-neutral-400 text-xs">
              {destination.updatedDate}
            </span>
          </div>
        </div>

        {/* Neighborhood Tags List */}
        <div className="flex flex-wrap gap-2 my-4">
          {destination.neighborhoods.map((tag, idx) => (
            <span
              key={idx}
              className="border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-bold text-neutral-700 uppercase tracking-wide rounded-xs shadow-2xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-start">
        <button
          onClick={() => onEditStatus?.(destination)}
          className="text-[11px] font-bold text-neutral-800 hover:text-[#ff3b30] uppercase tracking-wider transition-colors cursor-pointer"
        >
          EDIT STATUS
        </button>
      </div>
    </div>
  );
}