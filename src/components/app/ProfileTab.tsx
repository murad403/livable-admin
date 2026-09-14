'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Save } from 'lucide-react';
import { profileSchema, ProfileFormValues } from '@/validation/validation';
import { toast } from 'sonner';

export default function ProfileTab() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Livable Operations Lead',
      email: 'admin@livable.co',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast.success('Admin Profile changes saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-3">
        <User className="w-4 h-4 text-[#ff3b30]" />
        <span>ADMINISTRATOR PERSONAL & CONTACT INFORMATION</span>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FULL NAME */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <User className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>FULL NAME</span>
          </label>
          <input
            type="text"
            {...register('fullName')}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* ADMINISTRATIVE EMAIL */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>ADMINISTRATIVE EMAIL</span>
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#1c1c1c] hover:bg-black text-white px-6 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>SAVE ADMIN PROFILE CHANGES</span>
        </button>
      </div>
    </form>
  );
}