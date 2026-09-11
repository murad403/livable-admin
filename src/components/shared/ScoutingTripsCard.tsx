'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface ScoutingTripData {
  id: string;
  clientName: string;
  email: string;
  location: string;
  toursCount: number;
  dates: string;
  scout: string;
  status: 'Completed' | 'Draft' | 'Scheduled' | string;
  itineraryStatus: 'DRAFT' | 'SENT' | 'CONFIRMED';
}

interface ScoutingTripsCardProps {
  trip: ScoutingTripData;
  onDelete?: (trip: ScoutingTripData) => void;
  onItineraryChange?: (id: string, newStatus: 'DRAFT' | 'SENT' | 'CONFIRMED') => void;
}

export default function ScoutingTripsCard({
  trip,
  onDelete,
  onItineraryChange,
}: ScoutingTripsCardProps) {
  // Render status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Draft':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  // Render Itinerary status button style
  const getItineraryBtnStyle = (tab: 'DRAFT' | 'SENT' | 'CONFIRMED') => {
    if (trip.itineraryStatus === tab) {
      if (tab === 'CONFIRMED') {
        return 'bg-emerald-600 text-white font-extrabold shadow-2xs';
      }
      if (tab === 'SENT') {
        return 'bg-[#ff3b30] text-white font-extrabold shadow-2xs';
      }
      return 'bg-[#1c1c1c] text-white font-extrabold shadow-2xs';
    }
    return 'text-neutral-400 hover:text-neutral-700 font-semibold';
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
              {trip.clientName}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {trip.email}
            </p>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 border rounded-xs shrink-0 whitespace-nowrap ${getStatusBadgeStyle(
              trip.status
            )}`}
          >
            {trip.status}
          </span>
        </div>

        {/* Middle Info Container */}
        <div className="bg-neutral-50/80 p-3.5 rounded-xs my-3 text-xs space-y-2 border border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-neutral-900 text-xs uppercase tracking-tight">
              {trip.location}
            </span>
            <span className="text-neutral-400 text-xs font-semibold">
              {trip.toursCount} Tours
            </span>
          </div>

          <div className="text-xs text-neutral-500 font-mono">
            {trip.dates}
          </div>

          <div className="text-xs text-neutral-600">
            <span className="text-neutral-400 font-medium">Scout: </span>
            <span className="font-bold text-neutral-800">{trip.scout}</span>
          </div>
        </div>

        {/* Itinerary Status Row */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-4">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
            ITINERARY:
          </span>
          <div className="inline-flex items-center gap-1">
            {(['DRAFT', 'SENT', 'CONFIRMED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => onItineraryChange?.(trip.id, tab)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${getItineraryBtnStyle(
                  tab
                )}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links Bar */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px]">
        <button
          onClick={() => onDelete?.(trip)}
          className="font-bold text-neutral-400 hover:text-red-500 uppercase tracking-wider transition-colors cursor-pointer"
        >
          DELETE
        </button>

        <a
          href="#"
          className="font-extrabold text-neutral-800 hover:text-[#ff3b30] uppercase tracking-wider flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>DETAILS</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}