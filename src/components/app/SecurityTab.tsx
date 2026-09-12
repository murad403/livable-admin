'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useChangePasswordMutation } from '@/redux/features/auth/auth.api';
import { removeToken } from '@/utils/auth';

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(6, 'New password must be at least 6 characters'),
    confirm_new_password: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'New passwords do not match',
    path: ['confirm_new_password'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function SecurityTab() {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const res = await changePassword({
        current_password: data.current_password,
        new_password: data.new_password,
        confirm_new_password: data.confirm_new_password,
      }).unwrap();

      const detailMsg = res?.detail || 'Password updated successfully. Please log in again.';
      toast.success(detailMsg);
      reset();

      setTimeout(async () => {
        await removeToken();
        router.push('/sign-in');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      console.error('Change password error:', err);
      const apiError =
        err?.data?.detail ||
        err?.data?.message ||
        (Array.isArray(err?.data?.current_password) && `Current password: ${err.data.current_password[0]}`) ||
        (Array.isArray(err?.data?.non_field_errors) && err.data.non_field_errors[0]) ||
        'Failed to update password. Please check your credentials and try again.';
      toast.error(apiError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-3">
        <Lock className="w-4 h-4 text-[#ff3b30]" />
        <span>ADMIN SECURITY & PASSWORD UPDATE</span>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4">
        {/* CURRENT PASSWORD */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            CURRENT PASSWORD
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            {...register('current_password')}
            disabled={isLoading}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono disabled:opacity-50"
          />
          {errors.current_password && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.current_password.message}
            </p>
          )}
        </div>

        {/* NEW ADMIN PASSWORD */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            NEW ADMIN PASSWORD
          </label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            {...register('new_password')}
            disabled={isLoading}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono disabled:opacity-50"
          />
          {errors.new_password && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.new_password.message}
            </p>
          )}
        </div>

        {/* CONFIRM NEW PASSWORD */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            CONFIRM NEW PASSWORD
          </label>
          <input
            type="password"
            placeholder="Re-enter new password"
            {...register('confirm_new_password')}
            disabled={isLoading}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono disabled:opacity-50"
          />
          {errors.confirm_new_password && (
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              {errors.confirm_new_password.message}
            </p>
          )}
        </div>
      </div>

      {/* Red Alert Banner */}
      <div className="flex items-start gap-3 bg-red-50/50 border border-red-100 p-3.5 rounded-xs text-xs text-[#ff3b30]">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Updating your password will require signing in again. Two-Factor Authentication (2FA) is enforced for all admin accounts.
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#1c1c1c] hover:bg-black text-white px-6 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>UPDATING PASSWORD...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>UPDATE PASSWORD</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}