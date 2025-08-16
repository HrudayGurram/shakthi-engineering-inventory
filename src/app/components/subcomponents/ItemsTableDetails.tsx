"use client";

import * as React from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/app/figma/components/table";
import { RadioGroup, RadioGroupItem } from "@/app/figma/components/radiogroup";
import { Button } from "@/app/figma/components/button";

// Define the shape of a single user object
interface User {
    id: string;
    name: string;
    employee_id: string;
    email: string;
    user_role: string;
}

// Define the props for the UsersTable component
interface UsersTableProps {
    users: User[];
}

export function ItemsTableDetails({ users }: UsersTableProps) {
    return (
        <Table className="rounded-md border bg-white shadow-sm">
            <TableCaption>A list of company users.</TableCaption>

            <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/50">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <RadioGroup>
                                <RadioGroupItem value={user.id} id={user.id} />
                            </RadioGroup>
                        </TableCell>

                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.employee_id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.user_role}</TableCell>

                        <TableCell className="text-right space-x-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="bg-yellow-400 hover:bg-yellow-500"
                            >
                                <Eye className="size-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            >
                                <Pencil className="size-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600"
                            >
                                <Trash className="size-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}