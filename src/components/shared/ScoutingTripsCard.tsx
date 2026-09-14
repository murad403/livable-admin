'use client';

import React from 'react';
import { TScoutingTrip } from '@/redux/features/app/app.type';
import { Edit2, Trash2 } from 'lucide-react';

interface ScoutingTripsCardProps {
  trip: TScoutingTrip;
  onEdit?: (trip: TScoutingTrip) => void;
  onDelete?: (trip: TScoutingTrip) => void;
}

export default function ScoutingTripsCard({
  trip,
  onEdit,
  onDelete,
}: ScoutingTripsCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
              {trip.client_name}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {trip.email}
            </p>
          </div>
          {trip.visa && (
            <span className="text-[10px] font-bold px-2 py-0.5 border rounded-xs shrink-0 whitespace-nowrap bg-emerald-50 text-emerald-600 border-emerald-200">
              {trip.visa}
            </span>
          )}
        </div>

        {/* Middle Info Container */}
        <div className="bg-neutral-50/80 p-3.5 rounded-xs my-3 text-xs space-y-2 border border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-neutral-900 text-xs uppercase tracking-tight">
              {trip.city}
            </span>
            <span className="text-neutral-400 text-xs font-semibold">
              {trip.property_views} Property Views
            </span>
          </div>

          <div className="text-xs text-neutral-500 font-mono">
            {trip.timeline}
          </div>

          <div className="text-xs text-neutral-600">
            <span className="text-neutral-400 font-medium">Guide: </span>
            <span className="font-bold text-neutral-800">{trip.guide_name}</span>
          </div>
        </div>
      </div>

      {/* Footer Links Bar */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px]">
        <button
          onClick={() => onEdit?.(trip)}
          className="font-bold text-neutral-600 hover:text-neutral-900 uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>EDIT</span>
        </button>

        <button
          onClick={() => onDelete?.(trip)}
          className="font-bold text-neutral-400 hover:text-red-500 uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>DELETE</span>
        </button>
      </div>
    </div>
  );
}