'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { UserPlus, X, Loader2 } from 'lucide-react';
import { useCreateClientMutation } from '@/redux/features/app/app.api';

const addClientSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(1, 'Phone is required'),
  target_destination: z.string().min(1, 'Target destination is required'),
  visa: z.string().min(1, 'Visa is required'),
  target_arrival_timeline: z.string().min(1, 'Target arrival timeline is required'),
  household_size: z.string().min(1, 'Household size is required'),
  lead_advisor_name: z.string().min(1, 'Lead advisor name is required'),
  notes: z.string().optional(),
});

export type AddClientFormValues = z.infer<typeof addClientSchema>;

interface AddClientDossiersProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddClientDossiers({
  isOpen,
  onClose,
}: AddClientDossiersProps) {
  const [createClient, { isLoading }] = useCreateClientMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddClientFormValues>({
    resolver: zodResolver(addClientSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      target_destination: '',
      visa: '',
      target_arrival_timeline: '',
      household_size: '',
      lead_advisor_name: '',
      notes: '',
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = async (data: AddClientFormValues) => {
    try {
      await createClient(data).unwrap();
      toast.success('Client dossier created successfully!');
      reset();
      onClose();
    } catch (err: any) {
      console.error('Failed to create client dossier:', err);
      const errorMsg =
        err?.data?.detail ||
        err?.data?.message ||
        'Failed to create client dossier. Please try again.';
      toast.error(errorMsg);
    }
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
            {/* FULL NAME */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                placeholder="e.g. Jane smith"
                {...register('full_name')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.full_name && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                placeholder="e.g. murad@gmail.com"
                {...register('email')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                PHONE *
              </label>
              <input
                type="text"
                placeholder="e.g. +1987654321"
                {...register('phone')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.phone && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* TARGET DESTINATION */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                TARGET DESTINATION *
              </label>
              <input
                type="text"
                placeholder="e.g. Lisbon"
                {...register('target_destination')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.target_destination && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.target_destination.message}
                </p>
              )}
            </div>

            {/* VISA */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                VISA *
              </label>
              <input
                type="text"
                placeholder="e.g. D7 Visa"
                {...register('visa')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.visa && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.visa.message}
                </p>
              )}
            </div>

            {/* TARGET ARRIVAL TIMELINE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                TARGET ARRIVAL TIMELINE *
              </label>
              <input
                type="text"
                placeholder="e.g. October 2026 Arrival"
                {...register('target_arrival_timeline')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.target_arrival_timeline && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.target_arrival_timeline.message}
                </p>
              )}
            </div>

            {/* HOUSEHOLD SIZE */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                HOUSEHOLD SIZE *
              </label>
              <input
                type="text"
                placeholder="e.g. 2"
                {...register('household_size')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.household_size && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.household_size.message}
                </p>
              )}
            </div>

            {/* LEAD ADVISOR NAME */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                LEAD ADVISOR NAME *
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Guide"
                {...register('lead_advisor_name')}
                disabled={isLoading}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.lead_advisor_name && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.lead_advisor_name.message}
                </p>
              )}
            </div>
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              DOSSIER NOTES & PREFERENCES
            </label>
            <input
              type="text"
              placeholder="e.g. Interested in food and culture."
              {...register('notes')}
              disabled={isLoading}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-neutral-50 uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-[#ff3b30] hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>CREATING...</span>
                </>
              ) : (
                <span>CREATE CLIENT DOSSIER</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}