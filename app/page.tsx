"use client";
import React, { useEffect, useState } from "react";
import {
  Concert,
  Configuration,
  FirstWebApplicationApi,
} from "../generated-api";
import ConcertTile from "./components/concert_tile";

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const config = new Configuration({
          basePath:
            "https://gangarconcertswebapp-duchgsaff5enbfay.swedencentral-01.azurewebsites.net",
        });
        const api = new FirstWebApplicationApi(config);

        const concertList = await api.concertsGet();
        setConcerts(concertList);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        const details = err instanceof Response
          ? `Status: ${err.status} ${err.statusText}`
          : "";
        setError(
          `Failed to fetch concerts: ${message}${
            details ? " - " + details : ""
          }`,
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
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
      </main>
    </div>
  );
}
