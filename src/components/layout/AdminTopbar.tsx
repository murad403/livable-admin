'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Bell, Menu } from 'lucide-react';

interface AdminTopbarProps {
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onMobileMenuClick?: () => void;
}

export default function AdminTopbar({
  isCollapsed = false,
  onToggleSidebar,
  onMobileMenuClick,
}: AdminTopbarProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes('/analytics')) {
      return 'ANALYTICS';
    }
    if (pathname.includes('/destinations')) {
      return 'DESTINATIONS';
    }
    if (pathname.includes('/user-directory')) {
      return 'USER DIRECTORY';
    }
    if (pathname.includes('/support-queue')) {
      return 'SUPPORT QUEUE';
    }
    if (pathname.includes('/scouting-trips')) {
      return 'SCOUTING TRIPS';
    }
    if (pathname.includes('/client-dossiers')) {
      return 'CLIENT DOSSIERS';
    }
    return 'OVERVIEW';
  };

  return (
    <header className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-2.5 flex items-center justify-between h-14 select-none shrink-0">
      {/* Left Section: Collapse Arrow Button & Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden p-1.5 border border-neutral-200 hover:bg-neutral-50 rounded text-neutral-700 transition-colors"
          title="Open menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Collapse Arrow Button */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 border border-neutral-200 hover:bg-neutral-50 rounded text-neutral-600 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          )}
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider">
          <span className="text-neutral-400">ADMIN /</span>
          <span className="text-neutral-800">{getPageTitle()}</span>
        </div>
      </div>

      {/* Right Section: Notification & Profile Avatar */}
      <div className="flex items-center gap-3">
        {/* Notification Icon */}
        <button className="relative p-1.5 text-neutral-600 hover:bg-neutral-50 border border-neutral-200 rounded transition-colors cursor-pointer">
          <Bell className="w-4 h-4 text-neutral-600" />
          <span className="absolute -top-1 -right-1 bg-[#ff3b30] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none border border-white">
            3
          </span>
        </button>

        {/* Profile Avatar */}
        <button className="w-7 h-7 bg-[#1c1c1c] text-white font-black text-xs flex items-center justify-center rounded-xs hover:bg-black transition-colors shrink-0 cursor-pointer">
          L
        </button>
      </div>
    </header>
  );
}