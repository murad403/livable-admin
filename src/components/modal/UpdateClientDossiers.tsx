'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SquarePen, X } from 'lucide-react';

const updateDossierSchema = z.object({
  id: z.string(),
  clientName: z.string().min(2, 'Client name is required'),
  email: z.string().email('Valid email address is required'),
  destination: z.string().min(1, 'Destination is required'),
  status: z.string().min(1, 'Status is required'),
  advisor: z.string().min(1, 'Advisor is required'),
  visaType: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateDossierFormValues = z.infer<typeof updateDossierSchema>;

interface UpdateClientDossiersProps {
  isOpen: boolean;
  dossier: UpdateDossierFormValues | null;
  onClose: () => void;
  onSubmit: (data: UpdateDossierFormValues) => void;
}

export default function UpdateClientDossiers({
  isOpen,
  dossier,
  onClose,
  onSubmit,
}: UpdateClientDossiersProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateDossierFormValues>({
    resolver: zodResolver(updateDossierSchema),
    defaultValues: {
      id: '',
      clientName: '',
      email: '',
      destination: '',
      status: 'POST-TRIP FILING',
      advisor: '',
      visaType: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (dossier) {
      reset(dossier);
    }
  }, [dossier, reset]);

  if (!isOpen || !dossier) return null;

  const handleFormSubmit = (data: UpdateDossierFormValues) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SquarePen className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
              EDIT DOSSIER: {dossier.clientName}
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
            {/* Field 1: CLIENT NAME */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                CLIENT NAME
              </label>
              <input
                type="text"
                {...register('clientName')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.clientName && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.clientName.message}
                </p>
              )}
            </div>

            {/* Field 2: EMAIL ADDRESS */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Field 3: DESTINATION */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                DESTINATION
              </label>
              <input
                type="text"
                {...register('destination')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            {/* Field 4: STATUS */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                STATUS
              </label>
              <select
                {...register('status')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              >
                <option value="Post-Trip Filing">POST-TRIP FILING</option>
                <option value="Pre-Scouting">PRE-SCOUTING</option>
                <option value="Scouting Trip Active">SCOUTING TRIP ACTIVE</option>
                <option value="Onboarding">ONBOARDING</option>
              </select>
            </div>

            {/* Field 5: ASSIGNED ADVISOR */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                ASSIGNED ADVISOR
              </label>
              <input
                type="text"
                {...register('advisor')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            {/* Field 6: VISA TYPE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                VISA TYPE
              </label>
              <input
                type="text"
                {...register('visaType')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Field 7: DOSSIER NOTES */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              DOSSIER NOTES
            </label>
            <textarea
              rows={3}
              {...register('notes')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
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
              className="px-6 py-2.5 bg-[#1c1c1c] hover:bg-black text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}