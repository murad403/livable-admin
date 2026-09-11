'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
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

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDossier, setEditingDossier] = useState<DossierData | null>(
    null
  );
  const [deletingDossier, setDeletingDossier] = useState<DossierData | null>(
    null
  );

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
      {/* Top Header - Button Only */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex justify-end">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-black text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>CLIENT</span>
        </button>
      </div>

      {/* Dossier Cards Responsive Grid */}
      {dossiers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dossiers.map((dossier) => (
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
          No client dossiers found.
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