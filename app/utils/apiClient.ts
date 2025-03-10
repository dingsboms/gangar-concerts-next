// utils/apiClient.ts

import { Configuration, FirstWebApplicationApi } from "../../generated-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL environment variable is not set");
}

const config = new Configuration({ basePath: API_BASE_URL });
export const api = new FirstWebApplicationApi(config);
