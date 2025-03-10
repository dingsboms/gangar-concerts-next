// utils/createConcert.ts
import { Concert } from "../../generated-api";
import { api } from "./apiClient";

export async function createConcert(
    concert: Partial<Concert>,
): Promise<void> {
    try {
        return await api.concertsPost({ concert: concert as Concert });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        throw new Error(`Failed to create concert: ${message}`);
    }
}
