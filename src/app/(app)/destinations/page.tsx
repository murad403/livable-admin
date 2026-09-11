'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import DestinationsCard, {
  DestinationData,
} from '@/components/shared/DestinationsCard';
import UpdateDestinationsStatus from '@/components/modal/UpdateDestinationsStatus';

const initialDestinations: DestinationData[] = [
  {
    id: '1',
    name: 'VALENCIA',
    country: 'SPAIN',
    clientsCount: 4,
    leadScout: 'Tiago Santos',
    updatedDate: 'Aug 20, 2026',
    neighborhoods: ['RUZAFA', 'EL PLA DEL REAL', 'CABAÑAL-CANYAMELAR', 'GRAN VIA'],
    status: 'Published',
  },
  {
    id: '2',
    name: 'LISBON',
    country: 'PORTUGAL',
    clientsCount: 3,
    leadScout: 'Sofia Mendes',
    updatedDate: 'Aug 18, 2026',
    neighborhoods: [
      'PRÍNCIPE REAL',
      'CAMPO DE OURIQUE',
      'CHIADO',
      'PARQUE DAS NAÇÕES',
    ],
    status: 'Published',
  },
  {
    id: '3',
    name: 'MADRID',
    country: 'SPAIN',
    clientsCount: 3,
    leadScout: 'Carlos Almodovar',
    updatedDate: 'Aug 21, 2026',
    neighborhoods: ['CHAMBERÍ', 'SALAMANCA', 'JUSTICIA', 'RETIRO'],
    status: 'Published',
  },
  {
    id: '4',
    name: 'PORTO',
    country: 'PORTUGAL',
    clientsCount: 2,
    leadScout: 'Tiago Santos',
    updatedDate: 'Aug 15, 2026',
    neighborhoods: ['FOZ DO DOURO', 'CEDOFEITA', 'BOAVISTA', 'RIBEIRA'],
    status: 'Published',
  },
  {
    id: '5',
    name: 'BARCELONA',
    country: 'SPAIN',
    clientsCount: 2,
    leadScout: 'Marta Pujol',
    updatedDate: 'Aug 19, 2026',
    neighborhoods: ['SARRIÀ-SANT GERVASI', 'GRÀCIA', 'EIXAMPLE', 'POBLENOU'],
    status: 'Published',
  },
  {
    id: '6',
    name: 'CASCAIS & ESTORIL',
    country: 'PORTUGAL',
    clientsCount: 2,
    leadScout: 'Sofia Mendes',
    updatedDate: 'Aug 12, 2026',
    neighborhoods: [
      'QUINTA DA MARINHA',
      'HISTORIC CENTER',
      'MONTE ESTORIL',
      'GUINCHO COAST',
    ],
    status: 'Published',
  },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] =
    useState<DestinationData[]>(initialDestinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDestination, setEditingDestination] =
    useState<DestinationData | null>(null);

  // Search Filtered Destinations
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const query = searchQuery.toLowerCase();
      return (
        dest.name.toLowerCase().includes(query) ||
        dest.country.toLowerCase().includes(query) ||
        dest.leadScout.toLowerCase().includes(query) ||
        dest.neighborhoods.some((n) => n.toLowerCase().includes(query))
      );
    });
  }, [destinations, searchQuery]);

  // Handle Save Status from Modal
  const handleSaveStatus = (id: string, newStatus: string) => {
    setDestinations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                newStatus.charAt(0).toUpperCase() +
                newStatus.slice(1).toLowerCase(),
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Search Bar */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex items-center justify-between gap-4">
        <div className="relative flex items-center flex-1 sm:flex-initial">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination, scout..."
            className="pl-9 pr-3 py-2 bg-neutral-50/60 border border-neutral-200 rounded text-xs text-neutral-800 placeholder:text-neutral-400 w-full sm:w-80 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-normal"
          />
        </div>

        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest shrink-0">
          {filteredDestinations.length} DESTINATIONS
        </div>
      </div>

      {/* Destinations Cards Responsive Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDestinations.map((dest) => (
            <DestinationsCard
              key={dest.id}
              destination={dest}
              onEditStatus={(d) => setEditingDestination(d)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No destinations found matching your search.
        </div>
      )}

      {/* Update Publication Status Modal */}
      <UpdateDestinationsStatus
        isOpen={!!editingDestination}
        destination={editingDestination}
        onClose={() => setEditingDestination(null)}
        onSave={handleSaveStatus}
      />
    </div>
  );
}