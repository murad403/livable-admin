'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, X } from 'lucide-react';

const addDossierSchema = z.object({
  clientName: z.string().min(2, 'Client full name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().optional(),
  destination: z.string().min(1, 'Target destination is required'),
  visaTrack: z.string().optional(),
  arrivalTimeline: z.string().optional(),
  householdSize: z.string().optional(),
  advisor: z.string().min(1, 'Lead advisor is required'),
  notes: z.string().optional(),
});

export type AddDossierFormValues = z.infer<typeof addDossierSchema>;

interface AddClientDossiersProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddDossierFormValues) => void;
}

export default function AddClientDossiers({
  isOpen,
  onClose,
  onSubmit,
}: AddClientDossiersProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddDossierFormValues>({
    resolver: zodResolver(addDossierSchema),
    defaultValues: {
      clientName: '',
      email: '',
      phone: '',
      destination: 'VALENCIA & PORTO',
      visaTrack: 'Beckham Law / Spanish Digital Nomad',
      arrivalTimeline: 'October 2026 Arrival',
      householdSize: 'Couple',
      advisor: 'TIAGO SANTOS (VALENCIA LEAD)',
      notes: '',
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: AddDossierFormValues) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
              OPEN NEW CLIENT RELOCATION DOSSIER
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 1: CLIENT FULL NAME(S) * */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                CLIENT FULL NAME(S) *
              </label>
              <input
                type="text"
                placeholder="e.g. Alex & Sarah Vance"
                {...register('clientName')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.clientName && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.clientName.message}
                </p>
              )}
            </div>

            {/* Field 2: CLIENT EMAIL ADDRESS * */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                CLIENT EMAIL ADDRESS *
              </label>
              <input
                type="email"
                placeholder="e.g. alex.vance@example.com"
                {...register('email')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Field 3: PHONE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                PHONE (US OR WHATSAPP)
              </label>
              <input
                type="text"
                placeholder="+1 (555) 019-2834"
                {...register('phone')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            {/* Field 4: TARGET DESTINATION */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                TARGET DESTINATION
              </label>
              <select
                {...register('destination')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              >
                <option value="VALENCIA & PORTO">VALENCIA & PORTO</option>
                <option value="LISBON & CASCAIS">LISBON & CASCAIS</option>
                <option value="MADRID (SALAMANCA / CHAMBERÍ)">
                  MADRID (SALAMANCA / CHAMBERÍ)
                </option>
                <option value="PORTO (FOZ DO DOURO)">PORTO (FOZ DO DOURO)</option>
                <option value="BARCELONA (SARRIÀ-SANT GERVASI)">
                  BARCELONA (SARRIÀ-SANT GERVASI)
                </option>
              </select>
            </div>

            {/* Field 5: VISA & TAX TRACK */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                VISA & TAX TRACK
              </label>
              <input
                type="text"
                placeholder="Beckham Law / Spanish Digital Nomad"
                {...register('visaTrack')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            {/* Field 6: TARGET ARRIVAL TIMELINE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                TARGET ARRIVAL TIMELINE
              </label>
              <input
                type="text"
                placeholder="October 2026 Arrival"
                {...register('arrivalTimeline')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            {/* Field 7: HOUSEHOLD SIZE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                HOUSEHOLD SIZE
              </label>
              <input
                type="text"
                placeholder="Couple"
                {...register('householdSize')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            {/* Field 8: ASSIGNED LEAD ADVISOR */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                ASSIGNED LEAD ADVISOR
              </label>
              <select
                {...register('advisor')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              >
                <option value="TIAGO SANTOS (VALENCIA LEAD)">
                  TIAGO SANTOS (VALENCIA LEAD)
                </option>
                <option value="SOFIA MENDES (LISBON SCOUT)">
                  SOFIA MENDES (LISBON SCOUT)
                </option>
                <option value="CARLOS ALMODOVAR (MADRID LEAD)">
                  CARLOS ALMODOVAR (MADRID LEAD)
                </option>
                <option value="MARTA PUJOL (BARCELONA LEAD)">
                  MARTA PUJOL (BARCELONA LEAD)
                </option>
              </select>
            </div>
          </div>

          {/* Field 9: INITIAL DOSSIER NOTES & MICRO-DISTRICT PREFERENCES */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              INITIAL DOSSIER NOTES & MICRO-DISTRICT PREFERENCES
            </label>
            <textarea
              rows={3}
              placeholder="Specific requirements: bilingual schools, walkability, fiber internet, pet-friendly lease..."
              {...register('notes')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-neutral-50 uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#ff3b30] hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              CREATE CLIENT DOSSIER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}