// NewConcertModal.tsx
"use client";
import React, { useState } from "react";
import { Concert } from "../../generated-api";
import { ConcertModal } from "./ConcertModal";

interface NewConcertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (concert: Partial<Concert>) => void;
}

export default function NewConcertModal({
    isOpen,
    onClose,
    onSave,
}: NewConcertModalProps) {
    const [formData, setFormData] = useState<Partial<Concert>>({
        title: "",
        location: "",
        date: undefined,
    });

    const handleSave = (concert: Partial<Concert>) => {
        onSave(concert);
        setFormData({ title: "", location: "", date: undefined }); // Reset form
    };

    return (
        <ConcertModal
            isOpen={isOpen}
            onClose={onClose}
            onSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            title="Add New Concert"
            submitButtonText="Save"
        />
    );
}
