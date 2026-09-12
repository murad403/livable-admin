'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useChangePasswordMutation } from '@/redux/features/auth/auth.api';
import { removeToken } from '@/utils/auth';

export default function SecurityTab() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!currentPassword) {
      setErrorMessage('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    try {
      const res = await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      }).unwrap();

      const detailMsg = res?.detail || 'Password updated successfully. Please log in again.';
      setSuccessMessage(detailMsg);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Remove tokens and redirect to sign-in page
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
      setErrorMessage(apiError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs font-extrabold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-3">
        <Lock className="w-4 h-4 text-[#ff3b30]" />
        <span>ADMIN SECURITY & PASSWORD UPDATE</span>
      </div>

      {/* Success Message Banner */}
      {successMessage && (
        <div className="flex items-center gap-2 p-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded">
          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={isLoading}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono disabled:opacity-50"
          />
        </div>

        {/* NEW ADMIN PASSWORD */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            NEW ADMIN PASSWORD
          </label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono disabled:opacity-50"
          />
        </div>

        {/* CONFIRM NEW PASSWORD */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            CONFIRM NEW PASSWORD
          </label>
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono disabled:opacity-50"
          />
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