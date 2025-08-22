"use client";

import { useState } from 'react';

import { NextPage } from 'next';
import ToolsTableDetails from '@/app/components/subcomponents/ToolsTableDetails';
import AddToolsCard from '@/app/components/subcomponents/AddToolsCard';


interface Tool {
    id: number;
    created_at: string;
    name: string;
    description: string;
    is_shared: boolean;
}

const ToolsPage: NextPage = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);
        setHasSearched(true);
        try {
            const response = await fetch('/api/tools/get-all-tools');
            if (!response.ok) {
                throw new Error('Failed to fetch tool data');
            }
            const data = await response.json();
            setTools(data);
        } catch (err: any) {
            setError(err.message);
            setTools([]);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

        return (
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Searching..." : "Search Tools"}
              </button>
              {hasSearched && !isLoading && !error && (
                <AddToolsCard onToolAdded={handleSearch} />
              )}
            </div>
            {isLoading && <div>Loading tools...</div>}
            {hasSearched && error && (
              <div className="text-red-500">Error: {error}</div>
            )}
            {hasSearched && !isLoading && !error && (
              <ToolsTableDetails tools={tools} />
            )}
          </div>
        );
};

export default ToolsPage;