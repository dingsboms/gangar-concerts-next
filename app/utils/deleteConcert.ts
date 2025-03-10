// utils/deleteConcert.ts
import { api } from "./apiClient";

export async function deleteConcert(id: number): Promise<void> {
    try {
        await api.concertsIdDelete({ id });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        throw new Error(`Failed to delete concert: ${message}`);
    }
}
