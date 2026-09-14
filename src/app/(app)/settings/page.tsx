'use client';
import { useState } from 'react';
import { ShieldAlert, User, Lock } from 'lucide-react';
import ProfileTab from '@/components/app/ProfileTab';
import SecurityTab from '@/components/app/SecurityTab';

type SettingsTab = 'profile' | 'security';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const getTabButtonStyle = (tabKey: SettingsTab) => {
    const isActive = activeTab === tabKey;
    if (!isActive) {
      return 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 font-bold';
    }
    return 'bg-[#1c1c1c] text-white font-extrabold border-[#1c1c1c] shadow-2xs';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Title & Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-[#ff3b30] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h1 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">
              ADMIN SETTINGS & PLATFORM GOVERNANCE
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${getTabButtonStyle(
            'profile'
          )}`}
        >
          <User className="w-4 h-4" />
          <span>ADMIN PROFILE</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${getTabButtonStyle(
            'security'
          )}`}
        >
          <Lock className="w-4 h-4" />
          <span>SECURITY & PASSWORD</span>
        </button>
      </div>

      {/* Main Tab Content Card */}
      <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'security' && <SecurityTab />}
      </div>
    </div>
  );
}