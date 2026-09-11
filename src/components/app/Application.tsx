'use client';

import React, { useState } from 'react';
import { SendHorizontal, ShieldCheck } from 'lucide-react';
import { InquiryItem } from './Inquiries';

interface ApplicationProps {
  inquiry: InquiryItem | null;
  onStatusChange: (id: string, newStatus: InquiryItem['status']) => void;
  onSendMessage: (id: string, messageText: string) => void;
}

const templateReplies = [
  {
    label: 'NIE TIMELINE',
    text: 'Your Spanish tax counsel will file the Beckham Law application within 6 months of your social security registration in Spain, which happens after NIE and arrival.',
  },
  {
    label: 'RENTAL GUARANTEE',
    text: 'We have pre-approved your bank guarantee documentation with our partner bank in Spain for lease signing.',
  },
  {
    label: 'SCHOOL VISIT',
    text: 'We have confirmed private tour slots for your family during Day 2 of your upcoming Scouting Trip.',
  },
];

export default function Application({
  inquiry,
  onStatusChange,
  onSendMessage,
}: ApplicationProps) {
  const [replyText, setReplyText] = useState(
    'We have confirmed private tour slots for your family during Day 2 of your upcoming Scouting Trip.'
  );

  if (!inquiry) {
    return (
      <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium flex-1">
        Select an inquiry from the list to view thread details.
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendMessage(inquiry.id, replyText);
    setReplyText('');
  };

  const handleTemplateClick = (text: string) => {
    setReplyText(text);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs flex-1 flex flex-col justify-between space-y-6">
      {/* Top Header Section */}
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-sm font-extrabold text-neutral-900 uppercase tracking-tight leading-snug">
            {inquiry.subject}
          </h2>
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>{inquiry.clientName}</span>
            <span>·</span>
            <span className="font-mono text-neutral-400">{inquiry.email}</span>
          </div>
        </div>

        {/* Status Switcher Tabs */}
        <div className="inline-flex items-center gap-1 border border-neutral-200 rounded-xs p-1 bg-neutral-50/50">
          {(['Open', 'In Progress', 'Resolved'] as const).map((status) => {
            const isActive = inquiry.status === status;
            return (
              <button
                key={status}
                onClick={() => onStatusChange(inquiry.id, status)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1c1c1c] text-white font-extrabold shadow-2xs'
                    : 'text-neutral-400 hover:text-neutral-700 font-semibold'
                }`}
              >
                {status.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {inquiry.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xs border text-xs space-y-2 ${
              msg.isTeam
                ? 'bg-red-50/30 border-red-100/80'
                : 'bg-neutral-50/80 border-neutral-100'
            }`}
          >
            <div className="flex items-center justify-between">
              {msg.isTeam ? (
                <div className="flex items-center gap-1.5 text-[#ff3b30] font-extrabold uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#ff3b30]" />
                  <span>{msg.sender}</span>
                </div>
              ) : (
                <span className="font-extrabold text-neutral-900 uppercase tracking-tight">
                  {msg.sender}
                </span>
              )}
              <span className="font-mono text-[11px] text-neutral-400">
                {msg.date}
              </span>
            </div>
            <p className="text-neutral-800 leading-relaxed font-normal">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Reply Section */}
      <div className="space-y-4 pt-2 border-t border-neutral-100">
        {/* Templates Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mr-1">
            TEMPLATES:
          </span>
          {templateReplies.map((tmpl) => (
            <button
              key={tmpl.label}
              type="button"
              onClick={() => handleTemplateClick(tmpl.text)}
              className="border border-neutral-200 bg-white hover:bg-neutral-50 px-3 py-1.5 rounded-xs text-xs font-bold text-neutral-700 uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
            >
              {tmpl.label}
            </button>
          ))}
        </div>

        {/* Quick Reply Textarea & Send Button */}
        <form onSubmit={handleSend} className="flex items-stretch gap-2">
          <textarea
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your response..."
            className="flex-1 bg-white border border-neutral-200 rounded-xs p-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors resize-none font-normal"
          />
          <button
            type="submit"
            className="w-12 bg-[#1c1c1c] hover:bg-black text-white rounded-xs flex items-center justify-center transition-colors cursor-pointer shadow-2xs shrink-0"
            title="Send response"
          >
            <SendHorizontal className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}