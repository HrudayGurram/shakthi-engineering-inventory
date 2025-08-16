"use client";
import * as React from "react";
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/figma/components/dialog";
import { Input } from "@/app/figma/components/input";
import { Label } from "@/app/figma/components/label";
import { Pen } from "lucide-react";
import { Button } from "@/app/figma/components/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/app/figma/components/select";
// Define props interfaces and reusable components for consistency
interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const FormField = ({ id, label, type, value, onChange, required = false }: FormFieldProps) => (
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

// New component for updating a user
interface UpdateUserDialogProps {
    userId: string | number;
    initialData: {
        userName?: number | string;
        email?: string;
        manager_id?: string | null;
        user_role?: string;
    };
    onUserUpdated?: () => void;
}

export default function UpdateUserDialog({ userId, initialData, onUserUpdated }: UpdateUserDialogProps) {
    const [name, setName] = useState(initialData?.userName || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [managerId, setManagerId] = useState(initialData?.manager_id || '');
    const [userRole, setUserRole] = useState(initialData?.user_role || '');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Effect to update state if initialData prop changes
    useEffect(() => {
        if (initialData) {
            setName(initialData.userName || '');
            setEmail(initialData.email || '');
            setManagerId(initialData.manager_id || '');
            setUserRole(initialData.user_role || '');
        }
    }, [initialData]);

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: userId,
                    name,
                    manager_id: managerId,
                    email,
                    user_role: userRole,
                    ...(password && { password }), // Only include password if it's not empty
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update user.');
            }

            setSuccess(true);
            if (onUserUpdated) {
                onUserUpdated();
            }
            // Clear password field after success for security
            setPassword('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        size="icon"
                        variant="destructive"
                        className="bg-yellow-500 hover:bg-yellow-600"
                    >
                        <Pen className="size-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-4">
                    <DialogHeader>
                        <DialogTitle>Update User</DialogTitle>
                        <DialogDescription>
                            Edit the details for user with ID: <span className="font-mono text-gray-600">{userId}</span>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <FormField id="name" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <FormField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FormField id="managerId" label="Manager ID (optional)" type="string" value={managerId} onChange={(e) => setManagerId(e.target.value)} />
                        <Label>User Role</Label>
                        <Select
                            onValueChange={(e) => setUserRole(e)}
                            value={userRole}
                        >
                            <SelectTrigger className=" border-border rounded-lg">
                                <SelectValue placeholder="User Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white"
                            >
                                <SelectItem value="101">Admin</SelectItem>
                                <SelectItem value="102">Manager</SelectItem>
                                <SelectItem value="103">Assit Manager</SelectItem>
                                <SelectItem value="104">User</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormField id="password" label="New Password (optional)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <DialogFooter>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Update User'}
                            </button>
                        </DialogFooter>
                        {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
                        {success && <p className="mt-3 text-sm text-green-600 text-center">User updated successfully!</p>}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}