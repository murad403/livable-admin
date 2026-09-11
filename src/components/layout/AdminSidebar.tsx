'use client';

import React from 'react';
import {
  LayoutGrid,
  Users,
  Compass,
  MessageSquare,
  UserCheck,
  BookOpen,
  BarChart2,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#141414] text-white flex flex-col justify-between h-screen border-r border-neutral-800 shrink-0 select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="p-4 border-b border-neutral-800/80 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#ff3b30] flex items-center justify-center font-black text-white text-xl rounded-sm tracking-tighter shrink-0 shadow-sm">
            L
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm text-white uppercase">
                LIVABLE™
              </span>
              <span className="bg-[#ff3b30] text-white text-[9px] font-bold px-1 py-0.2 rounded-xs uppercase tracking-widest leading-none">
                ADMIN
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium truncate mt-0.5">
              RELOCATION OPS HUB
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="px-3 py-4 space-y-6 flex-1">
          {/* Group 1: Operations */}
          <div>
            <div className="px-3 text-[11px] font-bold text-neutral-500 tracking-widest uppercase mb-2">
              OPERATIONS
            </div>
            <div className="space-y-1">
              {/* Active Item: OVERVIEW */}
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2.5 bg-[#ff3b30] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-4 h-4" />
                  <span>OVERVIEW</span>
                </div>
              </a>

              {/* Item: CLIENT DOSSIERS */}
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                  <span>CLIENT DOSSIERS</span>
                </div>
                <span className="w-5 h-5 bg-[#1f1f1f] border border-neutral-700 text-white text-[11px] font-bold flex items-center justify-center rounded-xs">
                  5
                </span>
              </a>

              {/* Item: SCOUTING TRIPS */}
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                  <span>SCOUTING TRIPS</span>
                </div>
                <span className="w-5 h-5 bg-[#ff3b30] text-white text-[11px] font-bold flex items-center justify-center rounded-xs">
                  3
                </span>
              </a>

              {/* Item: SUPPORT QUEUE */}
              <a
                href="#"
                className="flex items-center justify-between px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                  <span>SUPPORT QUEUE</span>
                </div>
                <span className="w-5 h-5 bg-[#ff3b30] text-white text-[11px] font-bold flex items-center justify-center rounded-xs">
                  2
                </span>
              </a>
            </div>
          </div>

          {/* Group 2: Directory & Hubs */}
          <div>
            <div className="px-3 text-[11px] font-bold text-neutral-500 tracking-widest uppercase mb-2">
              DIRECTORY & HUBS
            </div>
            <div className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <UserCheck className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>USER DIRECTORY</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <BookOpen className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>DESTINATIONS</span>
              </a>
            </div>
          </div>

          {/* Group 3: Reports & Config */}
          <div>
            <div className="px-3 text-[11px] font-bold text-neutral-500 tracking-widest uppercase mb-2">
              REPORTS & CONFIG
            </div>
            <div className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <BarChart2 className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>ANALYTICS</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                  <span>NOTIFICATIONS</span>
                </div>
                <span className="w-5 h-5 bg-[#ff3b30] text-white text-[11px] font-bold flex items-center justify-center rounded-xs">
                  3
                </span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/50 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group"
              >
                <Settings className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>SETTINGS</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-neutral-800/80 bg-[#111111]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 bg-[#ff3b30] flex items-center justify-center font-extrabold text-white text-xs rounded-xs shrink-0">
              L
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
                LIVABLE OPERATIONS L...
              </span>
              <span className="text-[10px] text-neutral-400 truncate font-mono">
                admin@livable.co
              </span>
            </div>
          </div>
          <button
            title="Log out"
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}