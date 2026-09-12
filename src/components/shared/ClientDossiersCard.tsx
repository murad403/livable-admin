'use client';

import React from 'react';
import { TClient } from '@/redux/features/app/app.type';

interface ClientDossiersCardProps {
  dossier: TClient;
  onEdit?: (dossier: TClient) => void;
  onDelete?: (id: number) => void;
}

export default function ClientDossiersCard({
  dossier,
  onEdit,
  onDelete,
}: ClientDossiersCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs">
      <div className="space-y-3">
        {/* Top Header Row */}
        <div>
          <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
            {dossier.full_name}
          </h3>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            {dossier.email} {dossier.phone ? `• ${dossier.phone}` : ''}
          </p>
        </div>

        {/* Middle Info Container */}
        <div className="bg-neutral-50/80 p-3 rounded-xs text-xs space-y-2 border border-neutral-100">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              DESTINATION:
            </span>
            <span className="font-extrabold text-neutral-900 text-right truncate pl-2">
              {dossier.target_destination}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              VISA:
            </span>
            <span className="font-medium text-neutral-800 text-right truncate pl-2">
              {dossier.visa}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              TIMELINE:
            </span>
            <span className="font-medium text-neutral-800 text-right truncate pl-2">
              {dossier.target_arrival_timeline}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              HOUSEHOLD:
            </span>
            <span className="font-medium text-neutral-800 text-right truncate pl-2">
              {dossier.household_size}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              ADVISOR:
            </span>
            <span className="font-medium text-neutral-800 text-right truncate pl-2">
              {dossier.lead_advisor_name}
            </span>
          </div>
        </div>

        {/* Notes section if present */}
        {dossier.notes && (
          <div className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded border border-neutral-100">
            <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-0.5">
              NOTES:
            </span>
            <p className="line-clamp-2">{dossier.notes}</p>
          </div>
        )}
      </div>

      {/* Footer Links Bar - EDIT & DELETE Buttons */}
      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-3 font-bold text-neutral-400 uppercase tracking-wider">
          <button
            onClick={() => onEdit?.(dossier)}
            className="hover:text-neutral-800 transition-colors cursor-pointer"
          >
            EDIT
          </button>
          <span>·</span>
          <button
            onClick={() => onDelete?.(dossier.id)}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}