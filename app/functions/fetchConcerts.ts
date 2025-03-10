import {
    Concert,
    Configuration,
    FirstWebApplicationApi,
} from "../../generated-api";

export async function fetchConcerts(): Promise<Concert[]> {
    try {
        const config = new Configuration({
            basePath: process.env.NEXT_PUBLIC_BACKEND_URL,
        });
        const api = new FirstWebApplicationApi(config);
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
