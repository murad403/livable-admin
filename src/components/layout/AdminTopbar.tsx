'use client';

import React from 'react';
import { ChevronLeft, Search, Eye, Bell, ChevronDown } from 'lucide-react';

export default function AdminTopbar() {
  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-2.5 flex items-center justify-between h-14 select-none shrink-0">
      {/* Left Section: Back, Breadcrumb, Search */}
      <div className="flex items-center gap-6">
        {/* Back Button */}
        <button
          className="p-1 border border-neutral-200 hover:bg-neutral-50 rounded text-neutral-500 transition-colors"
          title="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider">
          <span className="text-neutral-400">ADMIN /</span>
          <span className="text-neutral-800">OVERVIEW</span>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search dossiers, tickets, trips..."
            className="pl-9 pr-4 py-1.5 bg-white border border-neutral-200 rounded text-xs text-neutral-800 placeholder:text-neutral-400 w-72 focus:outline-none focus:border-neutral-400 transition-colors shadow-2xs font-normal"
          />
        </div>
      </div>

      {/* Right Section: Status, Actions, Profile */}
      <div className="flex items-center gap-3">
        {/* Status Pill */}
        <div className="bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-full flex items-center gap-2 text-[11px] font-mono font-bold text-neutral-700 tracking-tight">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-2xs" />
          <span>DRF : LOCAL</span>
        </div>

        {/* Action Button (+ NEW ACTION v) */}
        <button className="bg-[#1c1c1c] hover:bg-black text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-colors cursor-pointer shadow-2xs">
          <span>+ NEW ACTION</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Client View Button */}
        <button className="border border-neutral-200 hover:bg-neutral-50 text-neutral-800 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs">
          <Eye className="w-3.5 h-3.5 text-[#ff3b30]" />
          <span>CLIENT VIEW</span>
        </button>

        {/* Notification Icon */}
        <button className="relative p-1.5 text-neutral-600 hover:bg-neutral-50 border border-neutral-200 rounded transition-colors">
          <Bell className="w-4 h-4 text-neutral-600" />
          <span className="absolute -top-1 -right-1 bg-[#ff3b30] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none border border-white">
            3
          </span>
        </button>

        {/* Profile Avatar */}
        <button className="w-7 h-7 bg-[#1c1c1c] text-white font-black text-xs flex items-center justify-center rounded-xs hover:bg-black transition-colors">
          L
        </button>
      </div>
    </header>
  );
}