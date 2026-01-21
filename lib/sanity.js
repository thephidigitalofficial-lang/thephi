import { createClient } from "@sanity/client";
const NEXT_PUBLIC_SANITY_PROJECT_ID = "fhw90qa2";
const NEXT_PUBLIC_SANITY_DATASET = "production";
export const client = createClient({
    projectId: NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
    dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});

// Helper function to generate Sanity image URLs
export function getSanityImageUrl(source) {
    if (!source || !source.asset) return null;

    const projectId = NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
    const dataset = NEXT_PUBLIC_SANITY_DATASET || "production";

    // Extract image reference
    const ref = source.asset._ref || source.asset._id;
    if (!ref) return null;

    // Parse the reference (format: image-{id}-{dimensions}-{format})
    const [, id, dimensions, format] = ref.split('-');

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
