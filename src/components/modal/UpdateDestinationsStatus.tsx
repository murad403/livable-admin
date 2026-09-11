'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DestinationModalData {
  id: string;
  name: string;
  status: string;
}

interface UpdateDestinationsStatusProps {
  isOpen: boolean;
  destination: DestinationModalData | null;
  onClose: () => void;
  onSave: (id: string, newStatus: string) => void;
}

export default function UpdateDestinationsStatus({
  isOpen,
  destination,
  onClose,
  onSave,
}: UpdateDestinationsStatusProps) {
  const [status, setStatus] = useState('PUBLISHED');

  useEffect(() => {
    if (destination) {
      setStatus(destination.status.toUpperCase());
    }
  }, [destination]);

  if (!isOpen || !destination) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(destination.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-white rounded-sm border border-neutral-200 shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
            {destination.name} DESTINATION GUIDE
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
              PUBLICATION STATUS
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-neutral-50/80 border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 font-bold uppercase focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
              <option value="IN REVIEW">IN REVIEW</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-neutral-200 rounded text-xs font-bold text-neutral-600 hover:bg-neutral-50 uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1c1c1c] hover:bg-black text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}