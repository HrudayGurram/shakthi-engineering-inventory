import React, { useState, useRef } from 'react';
import { Input } from './input';
import { Textarea } from './textarea';
import { cn } from './utils';

interface FloatingLabelInputProps {
    label: string;
    type?: string;
    className?: string;
    icon?: React.ReactNode;
    isTextarea?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function FloatingLabelInput({
    label,
    type = "text",
    className,
    icon,
    isTextarea = false,
    value: controlledValue,
    onChange,
    ...props
}: FloatingLabelInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState('');
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const hasValue = value && value.length > 0;
    const isFloated = isFocused || hasValue;

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        } else {
            setInternalValue(e.target.value);
        }
    };

    const handleLabelClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const InputComponent = isTextarea ? Textarea : Input;

    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10">
                    {icon}
                </div>
            )}

            <InputComponent
                ref={inputRef as any}
                type={type}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={cn(
                    "bg-input-background border-border rounded-lg transition-all duration-200 pt-6 pb-2",
                    icon ? "pl-10" : "pl-3",
                    isTextarea ? "min-h-[80px] pt-6" : "",
                    className
                )}
                {...props}
            />

            <label
                onClick={handleLabelClick}
                className={cn(
                    "absolute left-3 text-muted-foreground transition-all duration-200 cursor-text select-none",
                    icon ? "left-10" : "left-3",
                    isFloated
                        ? "top-2 text-xs transform-none"
                        : isTextarea
                            ? "top-4 text-base"
                            : "top-1/2 -translate-y-1/2 text-base"
                )}
            >
                {label}
            </label>
        </div>
    );
}