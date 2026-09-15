'use client';

import { useState } from 'react';
import { Plus, Loader2, FlaskConical } from 'lucide-react';
import CityTestCard from '@/components/app/CityTestCard';
import AddCityTest from '@/components/modal/AddCityTest';
import UpdateCityTest from '@/components/modal/UpdateCityTest';
import DeleteCityTest from '@/components/modal/DeleteCityTest';
import { useGetCityTestsQuery } from '@/redux/features/app/app.api';
import { TCityTest } from '@/redux/features/app/app.type';

export default function CityTestPage() {
  const { data: tests, isLoading, isError } = useGetCityTestsQuery();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<TCityTest | null>(null);
  const [deletingTest, setDeletingTest] = useState<TCityTest | null>(null);

  const testList = Array.isArray(tests) ? tests : [];

  const filteredTests = testList.filter((item) => {
    if (categoryFilter === 'ALL') return true;
    const cat = item.category || item.category_id;
    return cat === categoryFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Action Header */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 border border-red-100 rounded flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5 text-[#ff3b30]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-neutral-900 uppercase tracking-wider">
              CITY TESTS MANAGEMENT
            </h1>
            <p className="text-xs text-neutral-500 font-medium">
              Configure food, free time, and infrastructure city test prompts
            </p>
          </div>
        </div>

        {/* Right Action Button (+ ADD CITY TEST) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-black text-white px-4 py-2.5 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>ADD CITY TEST</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
        {(['ALL', 'food', 'free_time', 'infrastructure'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider rounded transition-colors cursor-pointer ${categoryFilter === cat
                ? 'bg-[#ff3b30] text-white shadow-2xs'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
          >
            {cat === 'ALL' ? 'ALL CATEGORIES' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Loading, Error & Content Grid */}
      {isLoading ? (
        <div className="bg-white border border-neutral-200 rounded p-12 flex items-center justify-center gap-2 text-neutral-500 text-sm font-medium">
          <Loader2 className="w-5 h-5 animate-spin text-[#ff3b30]" />
          <span>Loading city tests...</span>
        </div>
      ) : isError ? (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-red-500 text-sm font-medium">
          Failed to load city tests. Please check your network connection.
        </div>
      ) : filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => (
            <CityTestCard
              key={test.id}
              test={test}
              onEdit={(data) => setEditingTest(data)}
              onDelete={(data) => setDeletingTest(data)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded p-12 text-center text-neutral-400 text-sm font-medium">
          No city tests found. Click &quot;ADD CITY TEST&quot; to create one.
        </div>
      )}

      {/* Add City Test Modal */}
      <AddCityTest
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Update City Test Modal */}
      <UpdateCityTest
        isOpen={!!editingTest}
        test={editingTest}
        onClose={() => setEditingTest(null)}
      />

      {/* Delete City Test Modal */}
      <DeleteCityTest
        isOpen={!!deletingTest}
        test={deletingTest}
        onClose={() => setDeletingTest(null)}
      />
    </div>
  );
}