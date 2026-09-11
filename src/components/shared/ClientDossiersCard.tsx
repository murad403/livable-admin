'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface DossierData {
  id: string;
  name: string;
  email: string;
  destination: string;
  visaType: string;
  advisor: string;
  currentPhase: number; // 1, 2, or 3
  totalPhases: number; // 3
  progress: number; // 0 - 100
  status: 'Post-Trip Filing' | 'Pre-Scouting' | 'Scouting Trip Active' | string;
  notes?: string;
}

interface ClientDossiersCardProps {
  dossier: DossierData;
  onEdit?: (dossier: DossierData) => void;
  onDelete?: (id: string) => void;
}

export default function ClientDossiersCard({
  dossier,
  onEdit,
  onDelete,
}: ClientDossiersCardProps) {
  // Render status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Post-Trip Filing':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pre-Scouting':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      case 'Scouting Trip Active':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  // Render phase tab button style based on current phase
  const getPhaseTabStyle = (phaseNumber: number) => {
    if (dossier.currentPhase === phaseNumber) {
      if (phaseNumber === 3) {
        return 'bg-emerald-600 text-white font-extrabold border-emerald-600';
      }
      if (phaseNumber === 2) {
        return 'bg-[#ff3b30] text-white font-extrabold border-[#ff3b30]';
      }
      return 'bg-[#1c1c1c] text-white font-extrabold border-[#1c1c1c]';
    }
    return 'bg-white text-neutral-600 border-neutral-200 font-semibold hover:bg-neutral-50';
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-2xs flex flex-col justify-between h-full transition-shadow hover:shadow-xs">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-[#1a1a1a] text-sm tracking-tight uppercase">
              {dossier.name}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {dossier.email}
            </p>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 border rounded-xs shrink-0 whitespace-nowrap ${getStatusBadge(
              dossier.status
            )}`}
          >
            {dossier.status}
          </span>
        </div>

        {/* Middle Info Container */}
        <div className="bg-neutral-50/80 p-3 rounded-xs my-3 text-xs space-y-1.5 border border-neutral-100">
          <div className="flex justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              DESTINATION:
            </span>
            <span className="font-extrabold text-neutral-900 text-right truncate pl-2">
              {dossier.destination}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              VISA:
            </span>
            <span className="font-medium text-neutral-800 text-right truncate pl-2">
              {dossier.visaType}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
              ADVISOR:
            </span>
            <span className="font-medium text-neutral-800 text-right truncate pl-2">
              {dossier.advisor}
            </span>
          </div>
        </div>

        {/* Phase Progress Header */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-extrabold text-xs text-neutral-800 uppercase tracking-tight">
            PHASE 0{dossier.currentPhase} / 0{dossier.totalPhases}
          </span>
          <span className="font-mono font-bold text-xs text-neutral-500">
            {dossier.progress}%
          </span>
        </div>

        {/* Red Progress Bar */}
        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden my-2.5">
          <div
            className="bg-[#ff3b30] h-full rounded-full transition-all duration-300"
            style={{ width: `${dossier.progress}%` }}
          />
        </div>

        {/* Phase Tabs Bar */}
        <div className="grid grid-cols-3 gap-1.5 mt-3">
          <button
            type="button"
            className={`py-2 text-[11px] uppercase tracking-wider rounded-xs border text-center transition-colors ${getPhaseTabStyle(
              1
            )}`}
          >
            PHASE 1
          </button>
          <button
            type="button"
            className={`py-2 text-[11px] uppercase tracking-wider rounded-xs border text-center transition-colors ${getPhaseTabStyle(
              2
            )}`}
          >
            PHASE 2
          </button>
          <button
            type="button"
            className={`py-2 text-[11px] uppercase tracking-wider rounded-xs border text-center transition-colors ${getPhaseTabStyle(
              3
            )}`}
          >
            PHASE 3
          </button>
        </div>
      </div>

      {/* Footer Links Bar */}
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