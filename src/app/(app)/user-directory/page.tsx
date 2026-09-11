'use client';

import React, { useState, useMemo } from 'react';
import { Search, UserPlus } from 'lucide-react';
import AddUserDirectory, {
  AddUserFormValues,
} from '@/components/modal/AddUserDirectory';

export interface UserDirectoryItem {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT' | string;
  destination: string;
}

const initialUsers: UserDirectoryItem[] = [
  {
    id: '1',
    name: 'LIVABLE OPERATIONS LEAD',
    email: 'admin@livable.co',
    role: 'ADMIN',
    destination: 'Iberian Operations Hub (Madrid & Lisbon)',
  },
  {
    id: '2',
    name: 'ALEX & SARAH VANCE',
    email: 'client@livable.co',
    role: 'CLIENT',
    destination: 'Valencia & Porto',
  },
  {
    id: '3',
    name: 'ALEX & SARAH VANCE',
    email: 'alex.sarah@livable.co',
    role: 'CLIENT',
    destination: 'Valencia & Porto',
  },
  {
    id: '4',
    name: 'ELENA ROSSI & MARCUS COLE',
    email: 'elena.marcus@gmail.com',
    role: 'CLIENT',
    destination: 'Lisbon & Cascais',
  },
];

export default function UserDirectoryPage() {
  const [users, setUsers] = useState<UserDirectoryItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Search Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const query = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.role.toLowerCase().includes(query) ||
        u.destination.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

  // Create User Handler
  const handleAddUser = (data: AddUserFormValues) => {
    const newUser: UserDirectoryItem = {
      id: Date.now().toString(),
      name: data.fullName.toUpperCase(),
      email: data.email,
      role: data.role === 'ADMIN USER' ? 'ADMIN' : 'CLIENT',
      destination: 'Global Client Network',
    };
    setUsers((prev) => [...prev, newUser]);
  };

  // Reset Password Handler
  const handleResetPassword = (email: string) => {
    alert(`Password reset instructions sent to ${email}`);
  };

  // Delete User Handler
  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete user account "${name}"?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Filter & Control Bar */}
      <div className="bg-white border border-neutral-200 rounded p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Search Input */}
        <div className="relative flex items-center w-full sm:w-auto">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, email, role..."
            className="pl-9 pr-3 py-2 bg-neutral-50/60 border border-neutral-200 rounded text-xs text-neutral-800 placeholder:text-neutral-400 w-full sm:w-80 focus:outline-none focus:border-neutral-400 focus:bg-white transition-colors font-normal"
          />
        </div>

        {/* Right Add User Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-[#1c1c1c] hover:bg-black text-white px-4 py-2 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ ADD USER</span>
        </button>
      </div>

      {/* Main User Directory Table */}
      <div className="bg-white border border-neutral-200 rounded p-6 shadow-2xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">USER</th>
              <th className="py-3 px-4 font-bold">EMAIL</th>
              <th className="py-3 px-4 font-bold">ROLE</th>
              <th className="py-3 px-4 font-bold">DESTINATION</th>
              <th className="py-3 px-4 font-bold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-50/60 transition-colors"
                >
                  {/* USER Name */}
                  <td className="py-4 px-4 align-middle font-extrabold text-neutral-800 uppercase tracking-tight text-xs min-w-50">
                    {item.name}
                  </td>

                  {/* EMAIL */}
                  <td className="py-4 px-4 align-middle text-neutral-500 font-mono text-xs min-w-45">
                    {item.email}
                  </td>

                  {/* ROLE Badge */}
                  <td className="py-4 px-4 align-middle">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 border rounded-xs uppercase ${
                        item.role === 'ADMIN'
                          ? 'bg-red-50 text-red-500 border-red-200'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>

                  {/* DESTINATION */}
                  <td className="py-4 px-4 align-middle text-neutral-600 font-medium min-w-50">
                    {item.destination}
                  </td>

                  {/* ACTIONS Links */}
                  <td className="py-4 px-4 align-middle text-right min-w-45">
                    <div className="inline-flex items-center justify-end gap-3 text-[11px] font-bold uppercase tracking-wider">
                      <button
                        onClick={() => handleResetPassword(item.email)}
                        className="text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        RESET PASSWORD
                      </button>

                      {item.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleDeleteUser(item.id, item.name)}
                          className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-neutral-400 font-medium"
                >
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <AddUserDirectory
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}