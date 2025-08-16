import React, { useState, useRef } from 'react';

interface FloatingLabelInputProps {
    label: string;
    type?: string;
    className?: string;
    icon?: React.ReactNode;
    isTextarea?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    id: string;
}
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)

export function FloatingLabelInput({
    id,
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
        <div id={id} className="relative">
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
                className={`bg-input-background border-border rounded-lg transition-all duration-200 px-3 py-2 ${isFloated ? "pt-6" : ""} ${icon ? "pl-10" : "pl-3"} ${isTextarea ? "min-h-[80px]" : ""} ${className}`}
                {...props}
            />

            <label
                onClick={handleLabelClick}
                className={`absolute text-muted-foreground transition-all duration-200 cursor-text select-none ${icon ? "left-10" : "left-3"} ${isFloated ? "top-2 text-xs" : "top-1/2 -translate-y-1/2"}`}
            >
                {label}
            </label>
        </div>
    );
};