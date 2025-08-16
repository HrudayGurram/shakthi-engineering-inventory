import React, { useState } from "react";

type TextProps = {
  type?: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Text({
  type = "text",
  label,
  required,
  value,
  onChange,
}: TextProps) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent bg-white"
        placeholder={label} // hidden due to placeholder-transparent
      />
      <label
        className={`absolute left-3 transition-all duration-200 
          ${shouldFloat
            ? "text-xs -top-2 bg-white px-1 text-gray-700"
            : "text-gray-400 top-3"
          }`}
      >
        {label}
        {shouldFloat && required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
    </div>
  );
}
