'use client';

import React, { useState } from 'react';
import { User, Mail, Shield, Phone, MapPin, AlertCircle, Save } from 'lucide-react';

export default function ProfileTab() {
  const [formData, setFormData] = useState({
    fullName: 'Livable Operations Lead',
    email: 'admin@livable.co',
    title: 'Managing Director & Head of Iberian Relocations',
    phone: '+34 960 123 456',
    location: 'Valencia, Spain & Lisbon, Portugal',
    emergencyEmail: 'ops-emergency@livable.co',
    bio: 'Overseeing bespoke relocation advisory, scouting missions, and consular filing pipelines across Spain and Portugal.',
    alertIntake: true,
    alertSupport: true,
    alertReschedule: true,
    alertDigest: false,
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

        {/* OFFICIAL TITLE / DESIGNATION */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>OFFICIAL TITLE / DESIGNATION</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* DIRECT ADVISORY PHONE */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <Phone className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>DIRECT ADVISORY PHONE</span>
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* PRIMARY OPERATING BASE / LOCATION */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>PRIMARY OPERATING BASE / LOCATION</span>
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>

        {/* EMERGENCY OPS CHANNEL / EMAIL */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>EMERGENCY OPS CHANNEL / EMAIL</span>
          </label>
          <input
            type="email"
            value={formData.emergencyEmail}
            onChange={(e) => setFormData({ ...formData, emergencyEmail: e.target.value })}
            className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-mono focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* EXECUTIVE BIO & ADVISORY NOTES */}
      <div>
        <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
          EXECUTIVE BIO & ADVISORY NOTES
        </label>
        <textarea
          rows={3}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-normal focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* ADMIN ALERT & NOTIFICATION PREFERENCES */}
      <div className="bg-neutral-50/80 border border-neutral-200 rounded p-4 space-y-3">
        <h3 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
          ADMIN ALERT & NOTIFICATION PREFERENCES
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.alertIntake}
              onChange={(e) => setFormData({ ...formData, alertIntake: e.target.checked })}
              className="accent-[#ff3b30] w-4 h-4 rounded"
            />
            <span>Real-time alert on new client intake submission</span>
          </label>

          <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.alertSupport}
              onChange={(e) => setFormData({ ...formData, alertSupport: e.target.checked })}
              className="accent-[#ff3b30] w-4 h-4 rounded"
            />
            <span>Priority support ticket email notifications</span>
          </label>

          <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.alertReschedule}
              onChange={(e) => setFormData({ ...formData, alertReschedule: e.target.checked })}
              className="accent-[#ff3b30] w-4 h-4 rounded"
            />
            <span>Scouting trip itinerary reschedule alerts</span>
          </label>

          <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.alertDigest}
              onChange={(e) => setFormData({ ...formData, alertDigest: e.target.checked })}
              className="accent-[#ff3b30] w-4 h-4 rounded"
            />
            <span>Daily 08:00 AM pipeline digest summary</span>
          </label>
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