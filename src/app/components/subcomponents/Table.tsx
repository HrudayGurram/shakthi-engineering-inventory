"use client";

import * as React from "react";
import Image from "next/image";
import { Eye, Pencil, Trash } from "lucide-react";

import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/app/figma/components/table";

import { RadioGroup, RadioGroupItem } from "@/app/figma/components/radiogroup";
import { Label } from "@/app/figma/components/label";
import { Button } from "@/app/figma/components/button";

export function InventoryTable() {
    return (
        <Table className="rounded-md border bg-white shadow-sm">
            <TableCaption>Table</TableCaption>

            <TableHeader>
                <TableRow className="bg-muted/40">
                    <TableHead className="w-[40px]">
                        <RadioGroup>
                            <RadioGroupItem value="all" id="all" />
                        </RadioGroup>
                    </TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                        {/* Radio Selection */}
                        <TableCell className="text-center">
                            <RadioGroup>
                                <RadioGroupItem value={`row-${i}`} id={`row-${i}`} />
                            </RadioGroup>
                        </TableCell>

                        {/* Item Name */}
                        <TableCell className="font-medium">
                            {i === 0 ? "Gas Kitting" : "Condet"}
                        </TableCell>

                        {/* Model */}
                        <TableCell>{i === 1 ? "Co-7898" : "G-7893"}</TableCell>

                        {/* Type */}
                        <TableCell>IE Project Items</TableCell>

                        {/* Store */}
                        <TableCell>
                            {i === 0 ? "22 House Store" : "HQ Main Store"}
                        </TableCell>

                        {/* Amount */}
                        <TableCell>{i === 1 ? "3 pcs" : "5 pcs"}</TableCell>

                        {/* Project */}
                        <TableCell>HQ</TableCell>

                        {/* Account */}
                        <TableCell>
                            {i % 3 === 0 ? "Need Invitation" : "Activated"}
                        </TableCell>

                        {/* Actions */}
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
