"use client";
import * as React from "react";
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/figma/components/dialog";
import { Input } from "@/app/figma/components/input";
import { Label } from "@/app/figma/components/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from "@/app/figma/components/select";
// Define the props interface for the FormField component
interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}
const Button = ({ className, children, ...props }: { className?: string, children: React.ReactNode, [key: string]: any }) => (
    <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-slate-900 text-white shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${className}`}
        {...props}
    >
        {children}
    </button>
);
// Reusable component for form fields with TypeScript
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
interface AddUserDialogProps {
    onUserAdded?: () => void;
}

export default function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [managerId, setManagerId] = useState(0);
    const [employeeId, setEmployeeId] = useState(0);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [userRole, setUserRole] = useState('104');

    // This is a placeholder for the API call. In a real app, you would
    // replace this with your actual API endpoint.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/admin/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    manager_no: managerId,
                    employee_no: employeeId,
                    password,
                    user_role: userRole,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create user.');
            }

            setSuccess(true);
            if (onUserAdded) {
                onUserAdded();
            }
            setEmail('');
            setName('');
            setManagerId(0);
            setEmployeeId(0);
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
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >Create New User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-4">
                    <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                        <DialogDescription>
                            Enter the details below to add a new user to the system.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField id="name" label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <FormField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FormField id="employeeId" label="Employee ID" type="string" value={employeeId} onChange={(e) => setEmployeeId(Number(e.target.value))} />
                        <FormField id="managerId" label="Manager ID (optional)" type="string" value={managerId} onChange={(e) => setManagerId(Number(e.target.value))} />
                        <FormField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

                        <DialogFooter>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating...' : 'Create User'}
                            </button>
                        </DialogFooter>
                        {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
                        {success && <p className="mt-3 text-sm text-green-600 text-center">User created successfully!</p>}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
