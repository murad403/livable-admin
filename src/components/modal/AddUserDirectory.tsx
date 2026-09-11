'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const addUserSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  role: z.string().min(1, 'Role is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AddUserFormValues = z.infer<typeof addUserSchema>;

interface AddUserDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddUserFormValues) => void;
}

export default function AddUserDirectory({
  isOpen,
  onClose,
  onSubmit,
}: AddUserDirectoryProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: 'CLIENT USER',
      password: 'Livable2026!',
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: AddUserFormValues) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wider">
            ADD USER ACCOUNT
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              FULL NAME
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Henderson"
              {...register('fullName')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.fullName && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* EMAIL ADDRESS */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="alex@example.com"
              {...register('email')}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
            />
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* ROLE & INITIAL PASSWORD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                ROLE
              </label>
              <select
                {...register('role')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              >
                <option value="CLIENT USER">CLIENT USER</option>
                <option value="ADMIN USER">ADMIN USER</option>
                <option value="ADVISOR">ADVISOR</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                INITIAL PASSWORD
              </label>
              <input
                type="text"
                {...register('password')}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
              />
              {errors.password && (
                <p className="text-[11px] text-red-500 mt-0.5 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
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
              CREATE USER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}