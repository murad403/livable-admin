'use client';

import React from 'react';
import { Trash2, X, AlertTriangle, Loader2 } from 'lucide-react';
import { TScoutingTrip } from '@/redux/features/app/app.type';
import { useDeleteScoutingTripMutation } from '@/redux/features/app/app.api';
import { toast } from 'sonner';

interface DeleteScoutingTripsProps {
  isOpen: boolean;
  trip: TScoutingTrip | null;
  onClose: () => void;
}

export default function DeleteScoutingTrips({
  isOpen,
  trip,
  onClose,
}: DeleteScoutingTripsProps) {
  const [deleteScoutingTrip, { isLoading: isDeleting }] = useDeleteScoutingTripMutation();

  if (!isOpen || !trip) return null;

  const handleConfirmDelete = async () => {
    try {
      await deleteScoutingTrip({
        clientId: trip.client_id,
        id: trip.id,
      }).unwrap();
      toast.success('Scouting trip deleted successfully!');
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete scouting trip');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trash2 className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
              DELETE SCOUTING TRIP
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3.5 bg-red-50/60 border border-red-100 p-3.5 rounded-xs">
            <AlertTriangle className="w-5 h-5 text-[#ff3b30] shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-700 leading-relaxed">
              Are you sure you want to delete the scouting trip schedule for{' '}
              <span className="font-extrabold text-neutral-900 uppercase">
                {trip.client_name || 'this client'}
              </span>
              ? This action cannot be undone.
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-neutral-50/50 border-t border-neutral-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleConfirmDelete}
            className="px-5 py-2 bg-[#ff3b30] hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
          >
            {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>DELETE TRIP</span>
          </button>
        </div>
      </div>
    </div>
  );
}