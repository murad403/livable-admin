'use client';
import React, { useState } from 'react';
import { User, Mail, Save } from 'lucide-react';

export default function ProfileTab() {
  const [formData, setFormData] = useState({
    fullName: 'Livable Operations Lead',
    email: 'admin@livable.co'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Admin Profile changes saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* ADMINISTRATIVE EMAIL */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>ADMINISTRATIVE EMAIL</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-[#1c1c1c] hover:bg-black text-white px-6 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>SAVE ADMIN PROFILE CHANGES</span>
        </button>
      </div>
    </form>
  );
}