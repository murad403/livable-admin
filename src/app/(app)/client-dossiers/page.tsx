'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Loader2, Users } from 'lucide-react';
import ClientDossiersCard from '@/components/shared/ClientDossiersCard';
import AddClientDossiers from '@/components/modal/AddClientDossiers';
import { useGetClientsQuery } from '@/redux/features/app/app.api';

export default function ClientDossiersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: clients, isLoading, isError } = useGetClientsQuery();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header - Requested Clients Button Left & + Client Button Right */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex items-center justify-between flex-wrap gap-3">
        <Link
          href="/requested-clients"
          className="bg-[#ff3b30] hover:bg-red-600 text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Users className="w-4 h-4" />
          <span>REQUESTED CLIENTS</span>
        </Link>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1c1c1c] hover:bg-black text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>CLIENT</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-neutral-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs font-medium uppercase tracking-wider">Loading client dossiers...</span>
        </div>
      ) : isError ? (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-red-500 text-sm font-medium">
          Failed to load client dossiers. Please verify your connection or backend server.
        </div>
      ) : clients && clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clients.map((client) => (
            <ClientDossiersCard
              key={client.id}
              dossier={client}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No client dossiers found.
        </div>
      )}

      {/* Add Client Dossier Modal */}
      <AddClientDossiers
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}