'use client';

import React, { useState } from 'react';
import { Lock, AlertCircle, Save } from 'lucide-react';

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      alert('Please enter current password.');
      return;
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
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
            placeholder="Enter current password (e.g. Livable2026!)"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono"
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
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono"
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
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-mono"
          />
        </div>
      </div>

      {/* Red Alert Banner */}
      <div className="flex items-start gap-3 bg-red-50/50 border border-red-100 p-3.5 rounded-xs text-xs text-[#ff3b30]">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Updating your password will require signing in again on next session. Two-Factor Authentication (2FA) is enforced for all admin accounts.
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-[#1c1c1c] hover:bg-black text-white px-6 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Lock className="w-4 h-4" />
          <span>UPDATE PASSWORD</span>
        </button>
      </div>
    </form>
  );
}