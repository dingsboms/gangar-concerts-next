"use client";
import React, { useEffect, useState } from "react";
import {
  Concert,
  Configuration,
  FirstWebApplicationApi,
} from "../generated-api";

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
        <h1 className="text-3xl font-bold">Upcoming Concerts</h1>

        {loading && <p>Loading concerts...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && concerts.length === 0 && (
          <p>No concerts available.</p>
        )}

        {!loading && !error && concerts.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {concerts.map((concert) => (
              <li
                key={concert.id ?? concert.title}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-gray-50"
              >
                <h2 className="text-xl font-semibold">{concert.title}</h2>
                <p>Location: {concert.location}</p>
                <p>
                  Date: {concert.date
                    ? new Date(concert.date).toLocaleDateString()
                    : "TBA"}
                </p>
                <p>ID: {concert.id ?? "Not Assigned"}</p>
                <p className="text-sm text-gray-500">
                  Created: {concert.created
                    ? new Date(concert.created).toLocaleString()
                    : "Unknown"}
                </p>
                <p className="text-sm text-gray-500">
                  Last Modified: {concert.lastModified
                    ? new Date(concert.lastModified).toLocaleString()
                    : "Not Modified"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
