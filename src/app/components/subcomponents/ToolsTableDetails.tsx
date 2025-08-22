"use client";

import * as React from "react";
import { useState } from "react";
import { Trash, Pen } from "lucide-react";
import { Button } from "@/app/figma/components/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/app/figma/components/table";

interface Tool {
  id: number;
  created_at: string;
  name: string;
  description: string;
  is_shared: boolean;
}

interface ToolsTableDetailsProps {
  tools: Tool[];
}

const ToolsTableDetails: React.FC<ToolsTableDetailsProps> = ({ tools }) => {
  const [toolToEdit, setToolToEdit] = useState<Tool | null>(null);
  const [toolToDelete, setToolToDelete] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIsShared, setEditIsShared] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toolsState, setToolsState] = useState<Tool[]>(() => [...tools]);

  // Handler for delete
  const handleDeleteClick = (tool: Tool) => {
    setToolToDelete(tool);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!toolToDelete) return;
    setIsDeleting(true);
    setError(null);
    try {
      const response = await fetch(`/api/tools/delete-tool?id=${toolToDelete.id}`, { method: 'DELETE' });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete tool.');
      }
      setToolsState(prev => prev.filter(t => t.id !== toolToDelete.id));
      setIsModalOpen(false);
      setToolToDelete(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler for edit
  const openEditDialog = (tool: Tool) => {
    setToolToEdit(tool);
    setEditName(tool.name);
    setEditDescription(tool.description);
    setEditIsShared(tool.is_shared);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolToEdit) return;
    setError(null);
    setIsEditing(true);
    try {
      const response = await fetch(`/api/tools/update-tool`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: toolToEdit.id,
          name: editName,
          description: editDescription,
          is_shared: editIsShared,
        }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to update tool.');
      }
      setToolsState(prev => prev.map(t => t.id === toolToEdit.id ? { ...t, name: editName, description: editDescription, is_shared: editIsShared } : t));
      setIsEditOpen(false);
      setToolToEdit(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <>
      <Table className="rounded-md border bg-white shadow-sm">
        <TableCaption>A list of company tools.</TableCaption>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/50">
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Is Shared</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toolsState.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="w-[50px]">{tool.id}</TableCell>
              <TableCell className="font-medium">{tool.name}</TableCell>
              <TableCell>{tool.description}</TableCell>
              <TableCell>{tool.is_shared ? "Yes" : "No"}</TableCell>
              <TableCell>{new Date(tool.created_at).toLocaleString()}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  onClick={() => openEditDialog(tool)}
                  disabled={isEditing}
                  aria-label="Modify"
                >
                  <Pen className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDeleteClick(tool)}
                  disabled={isDeleting}
                  aria-label="Delete"
                >
                  <Trash className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      {isEditOpen && toolToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Tool</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="editIsShared"
                  type="checkbox"
                  checked={editIsShared}
                  onChange={e => setEditIsShared(e.target.checked)}
                />
                <label htmlFor="editIsShared">Is Shared</label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setToolToEdit(null); setIsEditOpen(false); }}
                  disabled={isEditing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={isEditing}
                >
                  {isEditing ? 'Saving...' : 'Save'}
                </Button>
              </div>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isModalOpen && toolToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Trash className="text-red-600" /> Delete Tool</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{toolToDelete.name}</span>?</p>
            <div className="flex flex-row gap-2 justify-end items-center mt-4">
              <Button
                variant="outline"
                onClick={() => { setToolToDelete(null); setIsModalOpen(false); }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', minWidth: '90px', fontWeight: 600 }}
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ToolsTableDetails;
