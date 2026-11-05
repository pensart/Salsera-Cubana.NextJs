import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "Missing SANITY_PROJECT_ID. Copy .env.example to .env.local and fill in the ID of your Sanity project.",
  );
}

export const sanityClient = createClient({
  projectId,
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: "2026-11-01",
  useCdn: true,
  perspective: "published",
});
