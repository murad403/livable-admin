'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  X,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: {
    text: string;
    variant: 'default' | 'danger';
  };
}

interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    id: 'operations',
    title: 'OPERATIONS',
    items: [
      {
        id: 'overview',
        label: 'OVERVIEW',
        href: '/',
        icon: LayoutGrid,
      },
      {
        id: 'client-dossiers',
        label: 'CLIENT DOSSIERS',
        href: '/client-dossiers',
        icon: Users,
        badge: { text: '5', variant: 'default' },
      },
      {
        id: 'scouting-trips',
        label: 'SCOUTING TRIPS',
        href: '#',
        icon: Compass,
        badge: { text: '3', variant: 'danger' },
      },
      {
        id: 'support-queue',
        label: 'SUPPORT QUEUE',
        href: '#',
        icon: MessageSquare,
        badge: { text: '2', variant: 'danger' },
      },
    ],
  },
  {
    id: 'directory-hubs',
    title: 'DIRECTORY & HUBS',
    items: [
      {
        id: 'user-directory',
        label: 'USER DIRECTORY',
        href: '#',
        icon: UserCheck,
      },
      {
        id: 'destinations',
        label: 'DESTINATIONS',
        href: '#',
        icon: BookOpen,
      },
    ],
  },
  {
    id: 'reports-config',
    title: 'REPORTS & CONFIG',
    items: [
      {
        id: 'analytics',
        label: 'ANALYTICS',
        href: '#',
        icon: BarChart2,
      },
      {
        id: 'notifications',
        label: 'NOTIFICATIONS',
        href: '#',
        icon: Bell,
        badge: { text: '3', variant: 'danger' },
      },
      {
        id: 'settings',
        label: 'SETTINGS',
        href: '#',
        icon: Settings,
      },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  isOpen = false,
  isCollapsed = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 bg-[#141414] text-white flex flex-col justify-between h-screen border-r border-neutral-800 shrink-0 select-none transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-16' : 'w-64'}`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div
            className={`p-4 border-b border-neutral-800/80 flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#ff3b30] flex items-center justify-center font-black text-white text-xl rounded-sm tracking-tighter shrink-0 shadow-sm">
                L
              </div>
              {!isCollapsed && (
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
              )}
            </div>

            {/* Mobile Close Button */}
            {onClose && !isCollapsed && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                title="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation List mapped over navGroups */}
          <nav className="px-2 sm:px-3 py-4 space-y-6 flex-1">
            {navGroups.map((group) => (
              <div key={group.id}>
                {/* Group Title */}
                {!isCollapsed && (
                  <div className="px-3 text-[11px] font-bold text-neutral-500 tracking-widest uppercase mb-2">
                    {group.title}
                  </div>
                )}

                {/* Group Items */}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive =
                      item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onClose}
                        title={isCollapsed ? item.label : undefined}
                        className={`flex items-center ${
                          isCollapsed
                            ? 'justify-center p-2.5'
                            : 'justify-between px-3 py-2.5'
                        } font-bold text-xs uppercase tracking-wider rounded-sm transition-colors group relative ${
                          isActive
                            ? 'bg-[#ff3b30] text-white shadow-xs'
                            : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent
                            className={`w-4 h-4 shrink-0 ${
                              isActive
                                ? 'text-white'
                                : 'text-neutral-400 group-hover:text-white'
                            }`}
                          />
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>

                        {/* Badge if present */}
                        {item.badge && (
                          <span
                            className={`text-[11px] font-bold flex items-center justify-center rounded-xs ${
                              isCollapsed
                                ? 'absolute -top-1 -right-1 w-4 h-4 text-[9px] rounded-full'
                                : 'w-5 h-5'
                            } ${
                              item.badge.variant === 'danger'
                                ? 'bg-[#ff3b30] text-white'
                                : 'bg-[#1f1f1f] border border-neutral-700 text-white'
                            }`}
                          >
                            {item.badge.text}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-neutral-800/80 bg-[#111111]">
          <div
            className={`flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 bg-[#ff3b30] flex items-center justify-center font-extrabold text-white text-xs rounded-xs shrink-0">
                L
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
                    LIVABLE OPERATIONS L...
                  </span>
                  <span className="text-[10px] text-neutral-400 truncate font-mono">
                    admin@livable.co
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button
                title="Log out"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}