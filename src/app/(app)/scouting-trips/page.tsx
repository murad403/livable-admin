'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import ScoutingTripsCard, {
  ScoutingTripData,
} from '@/components/shared/ScoutingTripsCard';
import AddScoutingTrips, {
  AddScoutingTripFormValues,
} from '@/components/modal/AddScoutingTrips';
import DeleteScoutingTrips from '@/components/modal/DeleteScoutingTrips';

const initialTrips: ScoutingTripData[] = [
  {
    id: '1',
    clientName: 'ALEX & SARAH VANCE',
    email: 'client@livable.co',
    location: 'VALENCIA, SPAIN',
    toursCount: 5,
    dates: 'Nov 12 - Nov 15, 2026',
    scout: 'Tiago Santos & Maria Gomez',
    status: 'Completed',
    itineraryStatus: 'CONFIRMED',
  },
  {
    id: '2',
    clientName: 'ELENA ROSSI & MARCUS COLE',
    email: 'elena.marcus@gmail.com',
    location: 'LISBON, PORTUGAL',
    toursCount: 4,
    dates: 'Jan 22 - Jan 25, 2027',
    scout: 'Sofia Mendes',
    status: 'Draft',
    itineraryStatus: 'DRAFT',
  },
  {
    id: '3',
    clientName: 'SOPHIA & LIAM CLARK',
    email: 'sophia.clark@venturecap.io',
    location: 'PORTO, PORTUGAL',
    toursCount: 4,
    dates: 'Oct 05 - Oct 08, 2026',
    scout: 'Tiago Santos',
    status: 'Scheduled',
    itineraryStatus: 'SENT',
  },
  {
    id: '4',
    clientName: 'JAMES & VICTORIA STERLING',
    email: 'jsterling@sterlingholdings.co.uk',
    location: 'BARCELONA, SPAIN',
    toursCount: 6,
    dates: 'Nov 20 - Nov 23, 2026',
    scout: 'Marta Pujol',
    status: 'Scheduled',
    itineraryStatus: 'CONFIRMED',
  },
];

export default function ScoutingTripsPage() {
  const [trips, setTrips] = useState<ScoutingTripData[]>(initialTrips);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingTrip, setDeletingTrip] = useState<ScoutingTripData | null>(null);

  // Search & Filtered Trips
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch =
        trip.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.scout.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        cityFilter === 'ALL' ||
        trip.location.toUpperCase().includes(cityFilter.toUpperCase());

      const matchesStatus =
        statusFilter === 'ALL' || trip.status === statusFilter;

      return matchesSearch && matchesCity && matchesStatus;
    });
  }, [trips, searchQuery, cityFilter, statusFilter]);

  // Create new Scouting Trip
  const handleAddTrip = (data: AddScoutingTripFormValues) => {
    const newEntry: ScoutingTripData = {
      id: Date.now().toString(),
      clientName: data.clientName.toUpperCase(),
      email: `${data.clientName.toLowerCase().replace(/[^a-z]/g, '')}@livable.co`,
      location: data.city,
      toursCount: parseInt(data.propertyViews || '4', 10),
      dates: data.dates,
      scout: data.assignedScout,
      status: 'Scheduled',
      itineraryStatus: 'DRAFT',
    };
    setTrips((prev) => [newEntry, ...prev]);
  };

  // Change Itinerary Status (DRAFT / SENT / CONFIRMED)
  const handleItineraryChange = (
    id: string,
    newStatus: 'DRAFT' | 'SENT' | 'CONFIRMED'
  ) => {
    setTrips((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, itineraryStatus: newStatus } : item
      )
    );
  };

  // Confirm Delete Trip
  const handleConfirmDelete = () => {
    if (deletingTrip) {
      setTrips((prev) => prev.filter((item) => item.id !== deletingTrip.id));
      setDeletingTrip(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Controls & Filter Header */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Bar Input */}
          <div className="relative flex items-center flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trips, client, scout..."
              className="pl-9 pr-3 py-2 bg-neutral-50/60 border border-neutral-200 rounded text-xs text-neutral-800 placeholder:text-neutral-400 w-full sm:w-64 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
          </div>

          {/* City Filter Dropdown */}
          <div className="relative">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="appearance-none bg-neutral-50/60 border border-neutral-200 rounded pl-3 pr-8 py-2 text-xs font-bold text-neutral-700 uppercase tracking-wider focus:outline-none focus:border-neutral-400 cursor-pointer"
            >
              <option value="ALL">ALL CITIES</option>
              <option value="VALENCIA">VALENCIA</option>
              <option value="LISBON">LISBON</option>
              <option value="PORTO">PORTO</option>
              <option value="BARCELONA">BARCELONA</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-neutral-50/60 border border-neutral-200 rounded pl-3 pr-8 py-2 text-xs font-bold text-neutral-700 uppercase tracking-wider focus:outline-none focus:border-neutral-400 cursor-pointer"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="Completed">COMPLETED</option>
              <option value="Draft">DRAFT</option>
              <option value="Scheduled">SCHEDULED</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right Action Button (+ + SCHEDULE TRIP) */}
        <div className="w-full sm:w-auto flex justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-black text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>SCHEDULE TRIP</span>
          </button>
        </div>
      </div>

      {/* Cards Responsive Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTrips.map((trip) => (
            <ScoutingTripsCard
              key={trip.id}
              trip={trip}
              onDelete={(data) => setDeletingTrip(data)}
              onItineraryChange={handleItineraryChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No scouting trips found matching your search.
        </div>
      )}

      {/* Add Scouting Trip Modal */}
      <AddScoutingTrips
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTrip}
      />

      {/* Delete Confirmation Modal */}
      <DeleteScoutingTrips
        isOpen={!!deletingTrip}
        clientName={deletingTrip?.clientName}
        onClose={() => setDeletingTrip(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}