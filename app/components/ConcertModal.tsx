// ConcertModal.tsx
"use client";
import React from "react";
import { Concert } from "../../generated-api";

interface ConcertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (concert: Partial<Concert>) => void;
    formData: Partial<Concert>;
    setFormData: React.Dispatch<React.SetStateAction<Partial<Concert>>>;
    title: string;
    submitButtonText: string;
    onDelete?: (id: number) => void; // Optional delete handler
}

export function ConcertModal({
    isOpen,
    onClose,
    onSave,
    formData,
    setFormData,
    title,
    submitButtonText,
    onDelete,
}: ConcertModalProps) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "date"
                ? value ? new Date(value) : undefined
                : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleDelete = () => {
        if (onDelete && formData.id) {
            onDelete(formData.id);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location || ""}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date (Optional)
                        </label>
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={formData.date instanceof Date
                                ? formData.date.toISOString().slice(0, 16)
                                : ""}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex justify-between gap-2">
                        {onDelete && formData.id && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        )}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                {submitButtonText}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
