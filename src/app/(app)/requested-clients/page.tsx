'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, UserCheck } from 'lucide-react';
import { useGetRequestedClientsQuery } from '@/redux/features/app/app.api';
import { TRequestedClient } from '@/redux/features/app/app.type';

export default function RequestedClientsPage() {
  const { data: requestedClients, isLoading, isError } = useGetRequestedClientsQuery();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Navigation Header */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/client-dossiers"
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>DOSSIERS</span>
          </Link>
          <div className="h-4 w-px bg-neutral-200" />
          <h1 className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#ff3b30]" />
            <span>REQUESTED CLIENTS BOOKING LIST</span>
          </h1>
        </div>
      </div>

      {/* Main Content / Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-neutral-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs font-medium uppercase tracking-wider">Loading requested clients...</span>
        </div>
      ) : isError ? (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-red-500 text-sm font-medium">
          Failed to load requested clients. Please check your connection or backend server.
        </div>
      ) : requestedClients && requestedClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {requestedClients.map((client: TRequestedClient) => (
            <div
              key={client.id}
              className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs"
            >
              <div className="space-y-3">
                {/* Header */}
                <div>
                  <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
                    {client.full_name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    {client.email} {client.phone_number ? `• ${client.phone_number}` : ''}
                  </p>
                </div>

                {/* Info Container */}
                <div className="bg-neutral-50/80 p-3 rounded-xs text-xs space-y-2 border border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
                      RELOCATION PROCESS:
                    </span>
                    <span className="font-extrabold text-neutral-900 text-right truncate pl-2 capitalize">
                      {client.relocation_process_type ? client.relocation_process_type.replace(/_/g, ' ') : 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide shrink-0">
                      CONSIDERING PLACES:
                    </span>
                    <span className="font-medium text-neutral-800 text-right truncate pl-2 capitalize">
                      {Array.isArray(client.considering_places_type) && client.considering_places_type.length > 0
                        ? client.considering_places_type.map((p) => p.replace(/_/g, ' ')).join(', ')
                        : 'None specified'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
                      SCOUTING GROUP:
                    </span>
                    <span className="font-medium text-neutral-800 text-right truncate pl-2 capitalize">
                      {client.scouting_people_type ? client.scouting_people_type.replace(/_/g, ' ') : 'N/A'}
                    </span>
                  </div>

                  {client.created_at && (
                    <div className="flex justify-between items-center border-t border-neutral-100 pt-1.5 mt-1.5">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                        SUBMITTED:
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500 text-right">
                        {new Date(client.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No requested clients found.
        </div>
      )}
    </div>
  );
}