"use client";

import { useState } from 'react';
import { NextPage } from 'next';
import { ItemsTableDetails } from '@/app/components/subcomponents/ItemsTableDetails';
import AddUserPopover from '@/app/components/subcomponents/AddUserCard';
interface User {
  id: string;
  name: string;
  email: string;
  manager_id: string | null;
}

const AdminUsersPage: NextPage = () => {
  // Initialize state with an empty array for better type safety
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // New state to track if a search has been attempted
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    setHasSearched(true); // Mark that a search has been initiated

    try {
      // Fetch data from your secure, server-side API Route.
      const response = await fetch('/api/admin/get-all-users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
      setUsers([]); // Clear users on error
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        {/* Search button is always visible */}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Searching...' : 'Search Items'}
        </button>
        {hasSearched && !isLoading && !error && (
          <AddUserPopover />
        )}
      </div>

      {/* Conditional rendering for loading, error, and results states */}
      {isLoading && <div>Loading users...</div>}

      {hasSearched && error && <div className="text-red-500">Error: {error}</div>}

      {hasSearched && !isLoading && !error && (
        <ItemsTableDetails users={users} />
      )}
    </div>
  );
};

export default AdminUsersPage;