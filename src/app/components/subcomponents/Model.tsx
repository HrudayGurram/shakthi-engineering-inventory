import React from "react";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function CustomModal({
    isOpen,
    onClose,
    icon,
    title,
    subtitle,
    buttonText,
    onButtonClick,
}: CustomModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal content */}
            <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center z-10">
                {icon && <div className="mb-4 flex justify-center">{icon}</div>}

                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {subtitle && (
                    <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
                )}

                {buttonText && (
                    <button
                        onClick={onButtonClick || onClose}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium"
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}
