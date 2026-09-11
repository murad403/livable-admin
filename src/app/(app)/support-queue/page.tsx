'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Inquiries, { InquiryItem } from '@/components/app/Inquiries';
import Application from '@/components/app/Application';

const initialInquiries: InquiryItem[] = [
  {
    id: '1',
    clientName: 'ALEX & SARAH VANCE',
    email: 'client@livable.co',
    subject: 'Beckham Law application timing and Spanish NIE dispatch',
    category: '01 Legal & Visa',
    date: '2026-08-22 14:30',
    status: 'Open',
    messages: [
      {
        sender: 'ALEX & SARAH VANCE',
        date: '2026-08-22 14:30',
        text: 'Hello team, our US CPA asked whether our Beckham Law application must be lodged before or after our initial lease signing in Valencia.',
      },
      {
        sender: 'LIVABLE LEGAL OPS',
        isTeam: true,
        date: '2026-08-22 15:10',
        text: 'Hi Alex & Sarah! Your Spanish tax counsel will file the Beckham Law application within 6 months of your social security registration in Spain, which happens after NIE and arrival.',
      },
    ],
  },
  {
    id: '2',
    clientName: 'ELENA ROSSI & MARCUS COLE',
    email: 'elena.marcus@gmail.com',
    subject: "St. Julian's School tour confirmation for Scouting Trip",
    category: '03 School Admissions',
    date: '2026-08-21 09:15',
    status: 'In Progress',
    messages: [
      {
        sender: 'ELENA ROSSI & MARCUS COLE',
        date: '2026-08-21 09:15',
        text: "Can we add a 30-minute campus tour of St. Julian's during Day 2 of our Lisbon scouting trip?",
      },
    ],
  },
  {
    id: '3',
    clientName: 'DAVID CHEN',
    email: 'david.chen.tech@outlook.com',
    subject: 'Chamberí lease deposit bank guarantee (Aval Bancario)',
    category: '02 Housing & Leases',
    date: '2026-08-19 11:40',
    status: 'Resolved',
    messages: [
      {
        sender: 'DAVID CHEN',
        date: '2026-08-19 11:40',
        text: 'I need confirmation if the landlord accepts Aval Bancario for Chamberí lease.',
      },
    ],
  },
  {
    id: '4',
    clientName: 'SOPHIA & LIAM CLARK',
    email: 'sophia.clark@venturecap.io',
    subject: 'Portuguese NIF Certificate verification',
    category: '04 Banking & NIE',
    date: '2026-08-20 16:45',
    status: 'Open',
    messages: [
      {
        sender: 'SOPHIA & LIAM CLARK',
        date: '2026-08-20 16:45',
        text: 'Please verify if our Portuguese NIF certificate has been processed.',
      },
    ],
  },
];

export default function SupportQueuePage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filtered inquiries list
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch =
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'Open' && item.status === 'Open') ||
        (statusFilter === 'In Progress' && item.status === 'In Progress') ||
        (statusFilter === 'Resolved' && item.status === 'Resolved');

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchQuery, statusFilter]);

  // Selected inquiry object
  const selectedInquiry = useMemo(() => {
    return inquiries.find((item) => item.id === selectedId) || null;
  }, [inquiries, selectedId]);

  // Status Change Handler
  const handleStatusChange = (
    id: string,
    newStatus: InquiryItem['status']
  ) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Send Message Handler
  const handleSendMessage = (id: string, text: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(
      now.getHours()
    ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              messages: [
                ...item.messages,
                {
                  sender: 'LIVABLE SUPPORT OPS',
                  isTeam: true,
                  date: formattedDate,
                  text: text,
                },
              ],
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Filter Bar */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex items-center gap-3">
        {/* Search Input Bar */}
        <div className="relative flex items-center flex-1 sm:flex-initial">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries, client, topic..."
            className="pl-9 pr-3 py-2 bg-neutral-50/60 border border-neutral-200 rounded text-xs text-neutral-800 placeholder:text-neutral-400 w-full sm:w-72 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-normal"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-neutral-50/60 border border-neutral-200 rounded pl-3 pr-8 py-2 text-xs font-bold text-neutral-700 uppercase tracking-wider focus:outline-none focus:border-neutral-400 cursor-pointer"
          >
            <option value="ALL">ALL INQUIRIES ({inquiries.length})</option>
            <option value="Open">OPEN</option>
            <option value="In Progress">IN PROGRESS</option>
            <option value="Resolved">RESOLVED</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Main Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-140">
        {/* Left Column: Inquiries List (5 cols) */}
        <div className="lg:col-span-5 h-full">
          <Inquiries
            inquiries={filteredInquiries}
            selectedId={selectedId}
            onSelect={(inquiry) => setSelectedId(inquiry.id)}
          />
        </div>

        {/* Right Column: Inquiry Details & Reply Thread (7 cols) */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <Application
            inquiry={selectedInquiry}
            onStatusChange={handleStatusChange}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}