// lib/searchParams.ts
import { createLoader, parseAsString, parseAsInteger } from "nuqs/server";

export const loader = createLoader({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(5),
});
