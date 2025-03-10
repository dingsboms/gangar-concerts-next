// utils/updateConcert.ts
import { Concert } from "../../generated-api";
import { api } from "./apiClient";

export async function updateConcert(
    concert: Partial<Concert>,
): Promise<void> {
    try {
        if (!concert.id) {
            throw new Error("Concert ID is required for updating");
        }
        return await api.concertsIdPut({
            id: concert.id,
            concert: concert as Concert,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        throw new Error(`Failed to update concert: ${message}`);
    }
}
