"use client";
import React, { useEffect, useState } from "react";
import { Concert } from "../generated-api";
import { fetchConcerts } from "./functions/fetchConcerts";
import ConcertTile from "./components/concertTile";
import AddButton from "./components/addConcertButton";
import AddConcertButton from "./components/addConcertButton";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConcerts()
      .then(setConcerts)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Unknown error")
      )
      .finally(() => setLoading(false));
  }, []);

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
            {concerts.map((concert, index) => (
              <ConcertTile key={index} concert={concert} />
            ))}
          </ul>
        )}
        <AddConcertButton />
      </main>
    </div>
  );
}
