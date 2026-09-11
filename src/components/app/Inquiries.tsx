'use client';

import React from 'react';

export interface InquiryItem {
  id: string;
  clientName: string;
  email: string;
  subject: string;
  category: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  messages: {
    sender: string;
    isTeam?: boolean;
    date: string;
    text: string;
  }[];
}

interface InquiriesProps {
  inquiries: InquiryItem[];
  selectedId: string;
  onSelect: (inquiry: InquiryItem) => void;
}

export default function Inquiries({
  inquiries,
  selectedId,
  onSelect,
}: InquiriesProps) {
  const getBadgeStyle = (status: InquiryItem['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-red-50 text-red-500 border-red-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded p-5 shadow-2xs h-full flex flex-col">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-100 mb-2">
        <h2 className="text-xs font-bold text-neutral-800 uppercase tracking-widest">
          INQUIRIES ({inquiries.length})
        </h2>
      </div>

      {/* Inquiry List */}
      <div className="divide-y divide-neutral-100 flex-1 overflow-y-auto">
        {inquiries.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`p-4 transition-colors cursor-pointer relative ${
                isSelected
                  ? 'bg-red-50/20 border-l-2 border-l-[#ff3b30]'
                  : 'hover:bg-neutral-50/60 border-l-2 border-l-transparent'
              }`}
            >
              {/* Top Row: Client Name & Status */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-extrabold text-[#1a1a1a] text-xs uppercase tracking-tight">
                  {item.clientName}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 border rounded-xs ${getBadgeStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Subject */}
              <p className="text-xs text-neutral-800 font-medium line-clamp-2 leading-snug mb-3">
                {item.subject}
              </p>

              {/* Bottom Info: Category & Date */}
              <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                <span>{item.category}</span>
                <span className="font-mono font-normal">{item.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}