'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Edit2, X, Loader2 } from 'lucide-react';
import { TScoutingTrip } from '@/redux/features/app/app.type';
import { useUpdateScoutingTripMutation } from '@/redux/features/app/app.api';
import { toast } from 'sonner';

const updateScoutingTripSchema = z.object({
  city: z.string().min(1, 'City is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  guide_name: z.string().min(1, 'Guide name is required'),
  property_views: z.number().min(0, 'Property views count is required'),
});

export type UpdateScoutingTripFormValues = z.infer<typeof updateScoutingTripSchema>;

interface UpdateScoutingTripsProps {
  isOpen: boolean;
  trip: TScoutingTrip | null;
  onClose: () => void;
}

export default function UpdateScountingTrips({
  isOpen,
  trip,
  onClose,
}: UpdateScoutingTripsProps) {
  const [updateScoutingTrip, { isLoading: isUpdating }] = useUpdateScoutingTripMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateScoutingTripFormValues>({
    resolver: zodResolver(updateScoutingTripSchema),
    defaultValues: {
      city: '',
      timeline: '',
      guide_name: '',
      property_views: 0,
    },
  });

  useEffect(() => {
    if (trip) {
      reset({
        city: trip.city || '',
        timeline: trip.timeline || '',
        guide_name: trip.guide_name || '',
        property_views: trip.property_views || 0,
      });
    }
  }, [trip, reset]);

  if (!isOpen || !trip) return null;

  const handleFormSubmit = async (values: UpdateScoutingTripFormValues) => {
    try {
      await updateScoutingTrip({
        clientId: trip.client_id,
        id: trip.id,
        data: {
          city: values.city,
          timeline: values.timeline,
          guide_name: values.guide_name,
          property_views: Number(values.property_views),
        },
      }).unwrap();
      toast.success('Scouting trip updated successfully!');
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update scouting trip');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Edit2 className="w-5 h-5 text-[#ff3b30]" />
            <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
              UPDATE SCOUTING TRIP
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
          {/* CLIENT READONLY INFO */}
          <div className="bg-neutral-50 p-3 rounded border border-neutral-200/60">
            <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              CLIENT
            </span>
            <span className="text-xs font-extrabold text-neutral-900 uppercase">
              {trip.client_name} ({trip.email})
            </span>
          </div>

          {/* CITY * */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              CITY *
            </label>
            <input
              type="text"
              placeholder="e.g. Porto"
              {...register('city')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.city && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors.city.message}
              </p>
            )}
          </div>

          {/* TIMELINE * */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              TIMELINE *
            </label>
            <input
              type="text"
              placeholder="e.g. Nov 12 - Nov 15, 2026"
              {...register('timeline')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.timeline && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors.timeline.message}
              </p>
            )}
          </div>

          {/* GUIDE NAME & PROPERTY VIEWS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                GUIDE NAME *
              </label>
              <input
                type="text"
                placeholder="e.g. Anna"
                {...register('guide_name')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.guide_name && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.guide_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                PROPERTY VIEWS *
              </label>
              <input
                type="number"
                placeholder="4"
                {...register('property_views', { valueAsNumber: true })}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.property_views && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.property_views.message}
                </p>
              )}
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
              disabled={isUpdating}
              className="px-5 py-2 bg-[#ff3b30] hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              {isUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>SAVE CHANGES</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}