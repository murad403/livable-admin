'use client';
import { useState } from 'react';
import { Plus, Loader2, Calendar } from 'lucide-react';
import ScheduleCard from '@/components/app/ScheduleCard';
import AddSchedule from '@/components/modal/AddSchedule';
import UpdateSchedule from '@/components/modal/UpdateSchedule';
import DeleteSchedule from '@/components/modal/DeleteSchedule';
import { useGetSchedulesQuery } from '@/redux/features/app/app.api';
import { TSchedule, TScheduleItem } from '@/redux/features/app/app.type';

export default function SchedulePage() {
  const { data: schedules, isLoading, isError } = useGetSchedulesQuery();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TScheduleItem | null>(null);
  const [deletingSchedule, setDeletingSchedule] = useState<TSchedule | null>(null);

  const scheduleList = Array.isArray(schedules) ? schedules : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 border border-red-100 rounded flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#ff3b30]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
              TODAY&apos;S SCHEDULE MANAGEMENT
            </h1>
            <p className="text-xs text-neutral-500 font-medium">
              Manage client itineraries, daily meetings, scouting tours, and schedules
            </p>
          </div>
        </div>

        {/* Right Action Button (+ CREATE SCHEDULE) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-black text-white px-4 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE SCHEDULE</span>
        </button>
      </div>

      {/* Loading, Error & Content Grid */}
      {isLoading ? (
        <div className="bg-white border border-neutral-200 rounded p-12 flex items-center justify-center gap-2 text-neutral-500 text-sm font-medium">
          <Loader2 className="w-5 h-5 animate-spin text-[#ff3b30]" />
          <span>Loading schedules...</span>
        </div>
      ) : isError ? (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-red-500 text-sm font-medium">
          Failed to load schedules. Please check your network connection.
        </div>
      ) : scheduleList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scheduleList.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onEditItem={(item) => setEditingItem(item)}
              onDeleteSchedule={(sched) => setDeletingSchedule(sched)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium space-y-2">
          <p>No schedules found.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff3b30] hover:underline uppercase"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create a new schedule now</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <AddSchedule
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <UpdateSchedule
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
      />

      <DeleteSchedule
        isOpen={!!deletingSchedule}
        schedule={deletingSchedule}
        onClose={() => setDeletingSchedule(null)}
      />
    </div>
  );
}
