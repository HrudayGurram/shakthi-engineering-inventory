import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDeleting: boolean;
    onUserDeleted: () => void;
    employee_no: number | string;
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    isDeleting,
    onUserDeleted,
    employee_no,
}: DeleteConfirmationModalProps) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleConfirmDelete = async () => {

        try {
            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ employee_no: employee_no }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete user.');
            }

            if (onUserDeleted) {
                onUserDeleted();
            }

        } catch (err) {
            console.error('Deletion fetch error:', err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                {/* Warning Icon */}
                <div className="mb-4 flex justify-center text-red-500">
                    <Trash2 size={48} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
                <p className="text-gray-500 text-sm mt-2">
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-6 rounded-lg font-medium text-gray-600 hover:text-gray-900"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className={`py-2 px-6 rounded-lg font-medium text-white transition-colors
                            ${isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}