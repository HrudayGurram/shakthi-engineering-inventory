"use client"

import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { ItemsTableDetails } from '@/app/components/subcomponents/ItemsTableDetails';

interface User {
  id: string;
  name: string;
  email: string;
  manager_id: string | null;
}

const AdminUsersPage: NextPage = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Fetch data from your secure, server-side API Route.
        const response = await fetch('/api/admin/get-all-users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // The empty array ensures this only runs once, on component mount.[6]

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ItemsTableDetails
      users={users}
    />
  );
};

export default AdminUsersPage;