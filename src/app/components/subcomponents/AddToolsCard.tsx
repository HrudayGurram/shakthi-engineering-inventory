"use client";
import * as React from "react";
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/figma/components/dialog";
import { Input } from "@/app/figma/components/input";
import { Label } from "@/app/figma/components/label";

// Reusable component for form fields
const FormField = ({ id, label, type, value, onChange, required = false }: { id: string, label: string, type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }) => (
    <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id} className="text-sm font-medium leading-none text-gray-700">
            {label}
        </Label>
        <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
    </div>
);

interface AddToolDialogProps {
    onToolAdded?: () => void;
}

export default function AddToolsCard({ onToolAdded }: AddToolDialogProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isShared, setIsShared] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/tools/add-tool', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    is_shared: isShared,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create tool.');
            }

            setSuccess(true);
            if (onToolAdded) {
                onToolAdded();
            }
            setName('');
            setDescription('');
            setIsShared(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >Create New Tool</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-4">
                    <DialogHeader>
                        <DialogTitle>Create New Tool</DialogTitle>
                        <DialogDescription>
                            Enter the details below to add a new tool to the system.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField id="name" label="Tool Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <FormField id="description" label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <div className="flex items-center gap-2">
                            <input
                                id="isShared"
                                type="checkbox"
                                checked={isShared}
                                onChange={e => setIsShared(e.target.checked)}
                                className="h-4 w-4 border-gray-300 rounded"
                            />
                            <Label htmlFor="isShared">Is Shared</Label>
                        </div>
                        <DialogFooter>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : 'Create Tool'}
                            </button>
                        </DialogFooter>
                        {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
                        {success && <p className="mt-3 text-sm text-green-600 text-center">Tool created successfully!</p>}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
