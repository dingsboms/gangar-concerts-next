// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Concert } from "../generated-api";
import { fetchConcerts } from "./utils/fetchConcerts";
import { createConcert } from "./utils/createConcert";
import { updateConcert } from "./utils/updateConcert";
import { deleteConcert } from "./utils/deleteConcert"; // Import new utility
import ConcertTile from "./components/ConcertTile";
import AddConcertButton from "./components/AddConcertButton";
import NewConcertModal from "./components/NewConcertModal";
import EditConcertModal from "./components/EditConcertModal";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<Partial<Concert>>({});

  useEffect(() => {
    fetchConcerts()
      .then(setConcerts)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Unknown error")
      )
      .finally(() => setLoading(false));
  }, []);

  const openNewConcertModal = () => {
    setIsNewModalOpen(true);
  };

  const handleSaveNewConcert = async (newConcert: Partial<Concert>) => {
    try {
      await createConcert(newConcert);
      const updatedConcerts = await fetchConcerts();
      setConcerts(updatedConcerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save concert");
      console.error("Save concert error:", err);
    } finally {
      setIsNewModalOpen(false);
    }
  };

  const handleEditConcert = (concert: Concert) => {
    const concertToEdit = {
      id: concert.id,
      title: concert.title,
      location: concert.location,
      date: concert.date instanceof Date
        ? concert.date
        : concert.date
        ? new Date(concert.date)
        : undefined,
      created: concert.created,
      lastModified: concert.lastModified,
    };
    setSelectedConcert(concertToEdit);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedConcert = async (updatedConcert: Partial<Concert>) => {
    try {
      await updateConcert(updatedConcert);
      const updatedConcerts = await fetchConcerts();
      setConcerts(updatedConcerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update concert");
      console.error("Update concert error:", err);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteConcert = async (id: number) => {
    try {
      await deleteConcert(id);
      const updatedConcerts = await fetchConcerts();
      setConcerts(updatedConcerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete concert");
      console.error("Delete concert error:", err);
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-black bg-white">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-3xl font-bold">Gangar Concerts</h1>

        {loading && <p>Loading concerts...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && concerts.length === 0 && (
          <p>No concerts available.</p>
        )}

        {!loading && !error && concerts.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {concerts.map((concert) => (
              <ConcertTile
                key={concert.id ?? concert.title}
                concert={concert}
                onClick={handleEditConcert}
              />
            ))}
          </ul>
        )}
        <AddConcertButton onClick={openNewConcertModal} />
        <NewConcertModal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          onSave={handleSaveNewConcert}
        />
        <EditConcertModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedConcert}
          onDelete={handleDeleteConcert} // Pass delete handler
          initialConcert={selectedConcert}
        />
      </main>
    </div>
  );
}
