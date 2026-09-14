'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useGetUpcomingTripsQuery } from '@/redux/features/app/app.api';

export default function UpcomingTrips() {
  const { data: trips, isLoading, isError } = useGetUpcomingTripsQuery();

  const tripList = Array.isArray(trips) ? trips : [];

  return (
    <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
          UPCOMING TRIPS
        </h2>
        <Link
          href="/scouting-trips"
          className="text-xs font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <span>ALL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Trips Content / States */}
      {isLoading ? (
        <div className="py-8 flex items-center justify-center gap-2 text-neutral-500 text-xs font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-[#ff3b30]" />
          <span>Loading upcoming trips...</span>
        </div>
      ) : isError ? (
        <div className="py-8 text-center text-red-500 text-xs font-medium">
          Failed to load upcoming trips.
        </div>
      ) : tripList.length === 0 ? (
        <div className="py-8 text-center text-neutral-400 text-xs font-medium">
          No upcoming trips scheduled.
        </div>
      ) : (
        <div className="space-y-3">
          {tripList.map((trip) => (
            <div
              key={trip.id}
              className="p-3 bg-neutral-50/60 rounded border border-neutral-100/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-neutral-800 uppercase tracking-tight text-xs">
                  {trip.client_name}
                </span>
                <span className="text-[11px] font-extrabold text-[#ff3b30] uppercase tracking-wider">
                  {trip.city}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                <span>{trip.timeline}</span>
                <span>{trip.guide_name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}