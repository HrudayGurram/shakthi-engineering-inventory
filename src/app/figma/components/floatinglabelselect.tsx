import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { cn } from './utils';

interface FloatingLabelSelectProps {
    label: string;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
}

export function FloatingLabelSelect({
    label,
    placeholder,
    className,
    icon,
    value,
    onValueChange,
    children,
    ...props
}: FloatingLabelSelectProps) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const isFloated = isFocused || hasValue;

    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10">
                    {icon}
                </div>
            )}

            <Select
                value={value}
                onValueChange={onValueChange}
                onOpenChange={setIsFocused}
                {...props}
            >
                <SelectTrigger
                    className={cn(
                        "bg-input-background border-border rounded-lg pt-6 pb-2 transition-all duration-200",
                        icon ? "pl-10" : "pl-3",
                        className
                    )}
                >
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    {children}
                </SelectContent>
            </Select>

            <label
                className={cn(
                    "absolute left-3 text-muted-foreground transition-all duration-200 cursor-text select-none pointer-events-none",
                    icon ? "left-10" : "left-3",
                    isFloated
                        ? "top-2 text-xs transform-none"
                        : "top-1/2 -translate-y-1/2 text-base"
                )}
            >
                {label}
            </label>
        </div>
    );
}