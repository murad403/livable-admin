'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import ScoutingTripsCard from '@/components/shared/ScoutingTripsCard';
import AddScoutingTrips from '@/components/modal/AddScoutingTrips';
import UpdateScountingTrips from '@/components/modal/UpdateScountingTrips';
import DeleteScoutingTrips from '@/components/modal/DeleteScoutingTrips';
import { useGetScoutingTripsQuery } from '@/redux/features/app/app.api';
import { TScoutingTrip } from '@/redux/features/app/app.type';

export default function ScoutingTripsPage() {
  const { data: response, isLoading, isError } = useGetScoutingTripsQuery();

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<TScoutingTrip | null>(null);
  const [deletingTrip, setDeletingTrip] = useState<TScoutingTrip | null>(null);

  const tripList = Array.isArray(response?.trips)
    ? response.trips
    : Array.isArray(response)
      ? response
      : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Action Header */}
      <div className="bg-[#ffffff] border border-neutral-200 rounded p-4 shadow-2xs flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
            SCOUTING TRIPS
          </h1>
          <p className="text-xs text-neutral-500 font-medium">
            Manage client relocation scouting trip schedules
          </p>
        </div>

        {/* Right Action Button (+ SCHEDULE TRIP) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1c1c1c] hover:bg-black text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>SCHEDULE TRIP</span>
        </button>
      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="bg-white border border-neutral-200 rounded p-12 flex items-center justify-center gap-2 text-neutral-500 text-sm font-medium">
          <Loader2 className="w-5 h-5 animate-spin text-[#ff3b30]" />
          <span>Loading scouting trips...</span>
        </div>
      ) : isError ? (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-red-500 text-sm font-medium">
          Failed to load scouting trips. Please check your network connection.
        </div>
      ) : tripList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tripList.map((trip) => (
            <ScoutingTripsCard
              key={trip.id}
              trip={trip}
              onEdit={(data) => setEditingTrip(data)}
              onDelete={(data) => setDeletingTrip(data)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No scouting trips found. Click &quot;SCHEDULE TRIP&quot; to create one.
        </div>
      )}

      {/* Add Scouting Trip Modal */}
      <AddScoutingTrips
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Update Scouting Trip Modal */}
      <UpdateScountingTrips
        key={editingTrip?.id}
        isOpen={!!editingTrip}
        trip={editingTrip}
        onClose={() => setEditingTrip(null)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteScoutingTrips
        isOpen={!!deletingTrip}
        trip={deletingTrip}
        onClose={() => setDeletingTrip(null)}
      />
    </div>
  );
}