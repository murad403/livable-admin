'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import ClientDossiersCard, {
  DossierData,
} from '@/components/shared/ClientDossiersCard';
import AddClientDossiers, {
  AddDossierFormValues,
} from '@/components/modal/AddClientDossiers';
import UpdateClientDossiers, {
  UpdateDossierFormValues,
} from '@/components/modal/UpdateClientDossiers';
import DeleteClientDossiers from '@/components/modal/DeleteClientDossiers';

const initialDossiers: DossierData[] = [
  {
    id: '1',
    name: 'ALEX & SARAH VANCE',
    email: 'client@livable.co',
    destination: 'Valencia & Porto',
    visaType: 'Beckham Law & Spanish D...',
    advisor: 'Tiago Santos (Valencia Lead)',
    currentPhase: 3,
    totalPhases: 3,
    progress: 100,
    status: 'Post-Trip Filing',
    notes: 'All documents submitted for post-trip filing.',
  },
  {
    id: '2',
    name: 'ELENA ROSSI & MARCUS COLE',
    email: 'elena.marcus@gmail.com',
    destination: 'Lisbon & Cascais',
    visaType: 'Portugal D7 / NHR 2.0 Tax ...',
    advisor: 'Sofia Mendes (Lisbon Scout)',
    currentPhase: 1,
    totalPhases: 3,
    progress: 33,
    status: 'Pre-Scouting',
    notes: 'Initial consultation done. Preparing scouting itinerary.',
  },
  {
    id: '3',
    name: 'DAVID CHEN',
    email: 'david.chen.tech@outlook.com',
    destination: 'Madrid (Salamanca / Chamberí)',
    visaType: 'Spanish Beckham Law Exp...',
    advisor: 'Carlos Almodovar (Madrid Lead)',
    currentPhase: 3,
    totalPhases: 3,
    progress: 88,
    status: 'Post-Trip Filing',
    notes:
      'Trip completed in Chamberí. NIE issued. Lease agreement currently in legal review by our Madrid counsel.',
  },
  {
    id: '4',
    name: 'SOPHIA & LIAM CLARK',
    email: 'sophia.clark@venturecap.io',
    destination: 'Porto (Foz do Douro)',
    visaType: 'Portugal Digital Nomad Vi...',
    advisor: 'Tiago Santos (Porto Partner)',
    currentPhase: 1,
    totalPhases: 3,
    progress: 45,
    status: 'Pre-Scouting',
    notes: 'Evaluating schooling options in Foz do Douro.',
  },
  {
    id: '5',
    name: 'JAMES & VICTORIA STERLING',
    email: 'jsterling@sterlingholdings.co.uk',
    destination: 'Barcelona (Sarrià-Sant Gervasi)',
    visaType: 'Spanish Non-Lucrative Vis...',
    advisor: 'Marta Pujol (Barcelona Lead)',
    currentPhase: 2,
    totalPhases: 3,
    progress: 60,
    status: 'Scouting Trip Active',
    notes: 'Currently on-site in Barcelona for property viewings.',
  },
];

export default function ClientDossiersPage() {
  const [dossiers, setDossiers] = useState<DossierData[]>(initialDossiers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [countryFilter, setCountryFilter] = useState('ALL');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDossier, setEditingDossier] = useState<DossierData | null>(
    null
  );
  const [deletingDossier, setDeletingDossier] = useState<DossierData | null>(
    null
  );

  // Search and Filtered Dossiers
  const filteredDossiers = useMemo(() => {
    return dossiers.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.advisor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' || item.status === statusFilter;

      const matchesCountry =
        countryFilter === 'ALL' ||
        (countryFilter === 'Spain' &&
          (item.destination.includes('Valencia') ||
            item.destination.includes('Madrid') ||
            item.destination.includes('Barcelona'))) ||
        (countryFilter === 'Portugal' &&
          (item.destination.includes('Porto') ||
            item.destination.includes('Lisbon')));

      return matchesSearch && matchesStatus && matchesCountry;
    });
  }, [dossiers, searchQuery, statusFilter, countryFilter]);

  // Create new Dossier
  const handleAddDossier = (data: AddDossierFormValues) => {
    const newEntry: DossierData = {
      id: Date.now().toString(),
      name: data.clientName.toUpperCase(),
      email: data.email,
      destination: data.destination,
      visaType: data.visaTrack || 'Standard Visa Track',
      advisor: data.advisor,
      currentPhase: 1,
      totalPhases: 3,
      progress: 20,
      status: 'Pre-Scouting',
      notes: data.notes || '',
    };
    setDossiers((prev) => [newEntry, ...prev]);
  };

  // Update existing Dossier
  const handleUpdateDossier = (data: UpdateDossierFormValues) => {
    setDossiers((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? {
              ...item,
              name: data.clientName.toUpperCase(),
              email: data.email,
              destination: data.destination,
              status: data.status,
              advisor: data.advisor,
              visaType: data.visaType || item.visaType,
              notes: data.notes || '',
            }
          : item
      )
    );
  };

  // Delete Dossier Confirm
  const handleConfirmDelete = () => {
    if (deletingDossier) {
      setDossiers((prev) => prev.filter((item) => item.id !== deletingDossier.id));
      setDeletingDossier(null);
    }
  };

  // Transform DossierData for Update Form
  const getUpdateFormData = (
    dossier: DossierData | null
  ): UpdateDossierFormValues | null => {
    if (!dossier) return null;
    return {
      id: dossier.id,
      clientName: dossier.name,
      email: dossier.email,
      destination: dossier.destination,
      status: dossier.status,
      advisor: dossier.advisor,
      visaType: dossier.visaType,
      notes: dossier.notes || '',
    };
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Controls & Filter Header */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Input Bar */}
          <div className="relative flex items-center flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients, advisor, city..."
              className="pl-9 pr-3 py-2 bg-neutral-50/60 border border-neutral-200 rounded text-xs text-neutral-800 placeholder:text-neutral-400 w-full sm:w-64 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
          </div>

          {/* Status Dropdown Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-neutral-50/60 border border-neutral-200 rounded pl-3 pr-8 py-2 text-xs font-bold text-neutral-700 uppercase tracking-wider focus:outline-none focus:border-neutral-400 cursor-pointer"
            >
              <option value="ALL">ALL STATUSES ({dossiers.length})</option>
              <option value="Post-Trip Filing">POST-TRIP FILING</option>
              <option value="Pre-Scouting">PRE-SCOUTING</option>
              <option value="Scouting Trip Active">SCOUTING TRIP ACTIVE</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Country Dropdown Filter */}
          <div className="relative">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="appearance-none bg-neutral-50/60 border border-neutral-200 rounded pl-3 pr-8 py-2 text-xs font-bold text-neutral-700 uppercase tracking-wider focus:outline-none focus:border-neutral-400 cursor-pointer"
            >
              <option value="ALL">ALL COUNTRIES</option>
              <option value="Spain">SPAIN</option>
              <option value="Portugal">PORTUGAL</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right Add Client Button */}
        <div className="w-full sm:w-auto flex justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-black text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>CLIENT</span>
          </button>
        </div>
      </div>

      {/* Dossier Cards Responsive Grid */}
      {filteredDossiers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDossiers.map((dossier) => (
            <ClientDossiersCard
              key={dossier.id}
              dossier={dossier}
              onEdit={(data) => setEditingDossier(data)}
              onDelete={() => setDeletingDossier(dossier)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No client dossiers found matching your search.
        </div>
      )}

      {/* Add Client Dossier Modal */}
      <AddClientDossiers
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddDossier}
      />

      {/* Edit Client Dossier Modal */}
      <UpdateClientDossiers
        isOpen={!!editingDossier}
        dossier={getUpdateFormData(editingDossier)}
        onClose={() => setEditingDossier(null)}
        onSubmit={handleUpdateDossier}
      />

      {/* Delete Client Dossier Confirmation Modal */}
      <DeleteClientDossiers
        isOpen={!!deletingDossier}
        clientName={deletingDossier?.name}
        onClose={() => setDeletingDossier(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}