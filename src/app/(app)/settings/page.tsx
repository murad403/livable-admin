'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  RotateCcw,
  User,
  Lock,
  FileText,
  AlertCircle,
} from 'lucide-react';
import ProfileTab from '@/components/app/ProfileTab';
import SecurityTab from '@/components/app/SecurityTab';
import PrivacyTab from '@/components/app/PrivacyTab';
import TermsTab from '@/components/app/TermsTab';
import Disclaimer from '@/components/app/Disclaimer';

type SettingsTab = 'profile' | 'security' | 'privacy' | 'terms' | 'disclaimer';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const getTabButtonStyle = (tabKey: SettingsTab) => {
    const isActive = activeTab === tabKey;
    if (!isActive) {
      return 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 font-bold';
    }
    if (tabKey === 'privacy' || tabKey === 'terms' || tabKey === 'disclaimer') {
      return 'bg-[#ff3b30] text-white font-extrabold border-[#ff3b30] shadow-2xs';
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
            <p className="text-xs text-neutral-400 font-medium">
              Manage administrative profile, credential security, and live legal compliance pages (Privacy Policy, Terms of Service, Legal Disclaimer).
            </p>
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

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${getTabButtonStyle(
            'privacy'
          )}`}
        >
          <FileText className="w-4 h-4" />
          <span>PRIVACY POLICY PAGE</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${getTabButtonStyle(
            'terms'
          )}`}
        >
          <FileText className="w-4 h-4" />
          <span>TERMS OF SERVICE PAGE</span>
        </button>

        <button
          onClick={() => setActiveTab('disclaimer')}
          className={`px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${getTabButtonStyle(
            'disclaimer'
          )}`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>LEGAL DISCLAIMER PAGE</span>
        </button>
      </div>

      {/* Main Tab Content Card */}
      <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'privacy' && <PrivacyTab />}
        {activeTab === 'terms' && <TermsTab />}
        {activeTab === 'disclaimer' && <Disclaimer />}
      </div>
    </div>
  );
}