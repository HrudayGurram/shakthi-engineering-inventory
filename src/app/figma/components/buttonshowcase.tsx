import React from 'react';
import { Button } from './button';
import { ChevronRight, User } from 'lucide-react';

export function ButtonShowcase() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="mb-6">04. Buttons</h2>

                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 space-y-4">
                    {/* Row 1 - Regular buttons with arrows */}
                    <div className="flex gap-3 flex-wrap">
                        <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <ChevronRight className="h-4 w-4 mr-2" /> Button
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <ChevronRight className="h-4 w-4 mr-2" /> Button
                        </Button>
                    </div>

                    {/* Row 2 - Medium buttons */}
                    <div className="flex gap-3 flex-wrap">
                        <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <ChevronRight className="h-4 w-4 mr-2" /> Button
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Button <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <ChevronRight className="h-4 w-4 mr-2" /> Button
                        </Button>
                    </div>

                    {/* Row 3 - Small buttons */}
                    <div className="flex gap-3 flex-wrap">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 px-2">
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                            Button
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                            Button <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                            <ChevronRight className="h-3 w-3 mr-1" /> Button
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                            Button
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                            Button <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                            <ChevronRight className="h-3 w-3 mr-1" /> Button
                        </Button>
                    </div>

                    {/* Row 4 - Extra small buttons */}
                    <div className="flex gap-3 flex-wrap">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-1.5">
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-3">
                            Button
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-3">
                            Button <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-3">
                            <ChevronRight className="h-3 w-3 mr-1" /> Button
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-3">
                            Button
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-3">
                            Button <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-3">
                            <ChevronRight className="h-3 w-3 mr-1" /> Button
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}