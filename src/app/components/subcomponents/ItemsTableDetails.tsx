"use client";

import * as React from "react";
import { Trash } from "lucide-react";
import { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/app/figma/components/table";
import { Button } from "@/app/figma/components/button";
import UpdateUserDialog from "@/app/components/subcomponents/UpdateUserCard";
import DeleteConfirmationModal from '@/app/components/subcomponents/DeleteConfirmationModal';

interface User {
    id: string;
    name: string;
    employee_no: number | string;
    email: string;
    user_role: string;
    manager_no: string;
}
const userRoleMapping = {
    '101': 'Admin',
    '102': 'Manager',
    '103': 'Assitant Manager',
    '104': 'User',
    // You can add more roles here
};
// Define the props for the UsersTable component
interface UsersTableProps {
    users: User[];
}

export function ItemsTableDetails({ users }: UsersTableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | number>('');
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDeleteClick = (item: string | number) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };
    return (
        <Table className="rounded-md border bg-white shadow-sm">
            <TableCaption>A list of company users.</TableCaption>

            <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/50">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Manager ID</TableHead>
                    <TableHead >Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.employee_no}>
                        <TableCell className="w-[50px]" />
                        <TableCell>{user.employee_no}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{userRoleMapping[user.user_role as keyof typeof userRoleMapping]}</TableCell>
                        <TableCell>{user.manager_no}</TableCell>
                        <TableCell className="text-right space-x-2 flex flex-column">
                            <UpdateUserDialog
                                userId={user.employee_no}
                                initialData={
                                    {
                                        userName: user.name,
                                        email: user.email,
                                        manager_id: user.manager_no,
                                        user_role: user.user_role
                                    }
                                }
                            />
                            <Button
                                size="icon"
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDeleteClick(user.employee_no)}
                            >
                                <Trash className="size-4" />
                            </Button>
                            <DeleteConfirmationModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                isDeleting={isDeleting}
                                employee_no={user.employee_no}
                                onUserDeleted={() => setIsModalOpen(false)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}