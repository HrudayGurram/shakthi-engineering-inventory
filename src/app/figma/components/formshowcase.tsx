import React from 'react';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { User, ChevronDown } from 'lucide-react';

export function FormInputsShowcase() {
    return (
        <div className="space-y-8">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        {/* Regular text inputs */}
                        <Input
                            placeholder="Textbox"
                            className="bg-input-background border-border rounded-lg"
                        />
                        <Input
                            placeholder="Textbox"
                            className="bg-input-background border-border rounded-lg"
                        />

                        {/* Select dropdowns */}
                        <Select>
                            <SelectTrigger className="bg-input-background border-border rounded-lg">
                                <SelectValue placeholder="Textbox" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                                <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="bg-input-background border-border rounded-lg">
                                <SelectValue placeholder="Textbox" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                                <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Inputs with user icons */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Textbox"
                                className="bg-input-background border-border rounded-lg pl-10"
                            />
                        </div>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Textbox"
                                className="bg-input-background border-border rounded-lg pl-10"
                            />
                        </div>

                        {/* Select with user icon */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                            <Select>
                                <SelectTrigger className="bg-input-background border-border rounded-lg pl-10">
                                    <SelectValue placeholder="Textbox" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Textarea */}
                        <Textarea
                            placeholder="Textarea"
                            className="bg-input-background border-border rounded-lg min-h-[80px]"
                        />

                        {/* Labeled input */}
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input
                                placeholder="Textbox"
                                className="bg-input-background border-border rounded-lg"
                            />
                        </div>

                        {/* Phone number input */}
                        <div className="space-y-1">
                            <Label className="text-blue-600">Enter Phone Number</Label>
                            <div className="flex">
                                <Select>
                                    <SelectTrigger className="bg-input-background border-border rounded-l-lg border-r-0 w-20">
                                        <SelectValue placeholder="+" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="+1">+1</SelectItem>
                                        <SelectItem value="+44">+44</SelectItem>
                                        <SelectItem value="+33">+33</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="(605) 555-0123"
                                    className="bg-input-background border-border rounded-r-lg flex-1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Column 2 - Similar inputs */}
                    <div className="space-y-4">
                        {/* Regular text inputs */}
                        <Input
                            placeholder="Textbox"
                            className="bg-input-background border-border rounded-lg"
                        />
                        <Input
                            placeholder="Textbox"
                            className="bg-input-background border-border rounded-lg"
                        />

                        {/* Select dropdowns */}
                        <Select>
                            <SelectTrigger className="bg-input-background border-border rounded-lg">
                                <SelectValue placeholder="Textbox" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                                <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="bg-input-background border-border rounded-lg">
                                <SelectValue placeholder="Textbox" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                                <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Inputs with user icons */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Textbox"
                                className="bg-input-background border-border rounded-lg pl-10"
                            />
                        </div>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Textbox"
                                className="bg-input-background border-border rounded-lg pl-10"
                            />
                        </div>

                        {/* Select with user icon */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                            <Select>
                                <SelectTrigger className="bg-input-background border-border rounded-lg pl-10">
                                    <SelectValue placeholder="Textbox" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Skip textarea for this column to match layout */}
                        <div className="h-[80px]"></div>

                        {/* Labeled input */}
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input
                                placeholder="Textbox"
                                className="bg-input-background border-border rounded-lg"
                            />
                        </div>

                        {/* Phone number input */}
                        <div className="space-y-1">
                            <Label className="text-blue-600">Enter Phone Number</Label>
                            <div className="flex">
                                <Select>
                                    <SelectTrigger className="bg-input-background border-border rounded-l-lg border-r-0 w-20">
                                        <SelectValue placeholder="+" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="+1">+1</SelectItem>
                                        <SelectItem value="+44">+44</SelectItem>
                                        <SelectItem value="+33">+33</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="(605) 555-0123"
                                    className="bg-input-background border-border rounded-r-lg flex-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}