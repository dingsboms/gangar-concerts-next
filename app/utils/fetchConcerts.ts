// utils/fetchConcerts.ts
import { Concert } from "../../generated-api";
import { api } from "./apiClient";

export async function fetchConcerts(): Promise<Concert[]> {
    try {
        const concertList = await api.concertsGet();
        return concertList;
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        const details = err instanceof Response
            ? `Status: ${err.status} ${err.statusText}`
            : "";
        throw new Error(
            `Failed to fetch concerts: ${message}${
                details ? " - " + details : ""
            }`,
        );
    }
}
