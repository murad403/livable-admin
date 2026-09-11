'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, X } from 'lucide-react';

const addScoutingTripSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  city: z.string().min(1, 'City is required'),
  dates: z.string().min(1, 'Dates window is required'),
  assignedScout: z.string().min(1, 'Assigned scout is required'),
  propertyViews: z.string().optional(),
});

export type AddScoutingTripFormValues = z.infer<typeof addScoutingTripSchema>;

interface AddScoutingTripsProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddScoutingTripFormValues) => void;
}

export default function AddScoutingTrips({
  isOpen,
  onClose,
  onSubmit,
}: AddScoutingTripsProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddScoutingTripFormValues>({
    resolver: zodResolver(addScoutingTripSchema),
    defaultValues: {
      clientName: '',
      city: 'VALENCIA (SPAIN)',
      dates: 'Nov 12 - Nov 15, 2026',
      assignedScout: 'Tiago Santos',
      propertyViews: '4',
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: AddScoutingTripFormValues) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
              SCHEDULE 3-DAY SCOUTING TRIP
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
          {/* CLIENT NAME * */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              CLIENT NAME *
            </label>
            <input
              type="text"
              placeholder="e.g. Elena Rossi & Marcus Cole"
              {...register('clientName')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.clientName && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors.clientName.message}
              </p>
            )}
          </div>

          {/* CITY */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              CITY
            </label>
            <select
              {...register('city')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            >
              <option value="VALENCIA (SPAIN)">VALENCIA (SPAIN)</option>
              <option value="LISBON (PORTUGAL)">LISBON (PORTUGAL)</option>
              <option value="PORTO (PORTUGAL)">PORTO (PORTUGAL)</option>
              <option value="BARCELONA (SPAIN)">BARCELONA (SPAIN)</option>
            </select>
          </div>

          {/* DATES (3-DAY WINDOW) */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              DATES (3-DAY WINDOW)
            </label>
            <input
              type="text"
              placeholder="Nov 12 - Nov 15, 2026"
              {...register('dates')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.dates && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors.dates.message}
              </p>
            )}
          </div>

          {/* ASSIGNED SCOUT & PROPERTY VIEWS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                ASSIGNED SCOUT
              </label>
              <input
                type="text"
                placeholder="Tiago Santos"
                {...register('assignedScout')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                PROPERTY VIEWS
              </label>
              <input
                type="text"
                placeholder="4"
                {...register('propertyViews')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-neutral-50 uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#ff3b30] hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              SCHEDULE TRIP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}