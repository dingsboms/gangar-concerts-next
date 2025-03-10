// components/editConcertModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Concert } from "../../generated-api";
import { ConcertModal } from "./ConcertModal";

interface EditConcertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (concert: Partial<Concert>) => void;
    onDelete: (id: number) => void; // Add onDelete prop
    initialConcert: Partial<Concert>;
}

export default function EditConcertModal({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialConcert,
}: EditConcertModalProps) {
    const [formData, setFormData] = useState<Partial<Concert>>({});

    useEffect(() => {
        setFormData({
            id: initialConcert.id,
            title: initialConcert.title || "",
            location: initialConcert.location || "",
            date: initialConcert.date instanceof Date
                ? initialConcert.date
                : initialConcert.date
                ? new Date(initialConcert.date)
                : undefined,
            created: initialConcert.created,
            lastModified: initialConcert.lastModified,
        });
    }, [initialConcert]);

    return (
        <ConcertModal
            isOpen={isOpen}
            onClose={onClose}
            onSave={onSave}
            onDelete={onDelete} // Pass onDelete to ConcertModal
            formData={formData}
            setFormData={setFormData}
            title="Edit Concert"
            submitButtonText="Update"
        />
    );
}
