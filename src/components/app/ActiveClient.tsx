'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useGetScoutingTripsQuery } from '@/redux/features/app/app.api';

export default function ActiveClient() {
  const { data, isLoading, isError } = useGetScoutingTripsQuery();

  const tripList = Array.isArray(data?.trips) ? data.trips : [];

  return (
    <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-bold text-neutral-800 uppercase tracking-widest">
          ACTIVE CLIENT DOSSIERS
        </h2>
        <Link
          href="/scouting-trips"
          className="text-xs font-bold text-[#ff3b30] hover:text-red-600 uppercase tracking-wider flex items-center gap-0.5 transition-colors"
        >
          <span>VIEW ALL</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table Content / States */}
      {isLoading ? (
        <div className="py-12 flex items-center justify-center gap-2 text-neutral-500 text-xs font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-[#ff3b30]" />
          <span>Loading client dossiers...</span>
        </div>
      ) : isError ? (
        <div className="py-12 text-center text-red-500 text-xs font-medium">
          Failed to load active clients.
        </div>
      ) : tripList.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 text-xs font-medium">
          No active client dossiers found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                <th className="py-2.5 px-3 font-bold">CLIENT</th>
                <th className="py-2.5 px-3 font-bold">DESTINATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {tripList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-50/60 transition-colors"
                >
                  {/* Client Name & Email */}
                  <td className="py-4 px-3 align-middle min-w-50">
                    <div className="font-extrabold text-neutral-800 uppercase tracking-tight text-xs">
                      {item.client_name}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      {item.email}
                    </div>
                  </td>

                  {/* Destination (City) */}
                  <td className="py-4 px-3 align-middle font-bold text-neutral-800 uppercase text-xs tracking-tight max-w-50">
                    {item.city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}