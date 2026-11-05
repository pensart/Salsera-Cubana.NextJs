import type { Metadata } from "next";

export const SITE_URL = "https://salsera-cubana.be";

const DEFAULT_DESCRIPTION =
  "Dansles Cubaanse Salsa voor beginners en gevorderden. Flexibel lesrooster met herhaaldagen en maandelijkse Salsa party's. Start jouw dansavontuur bij de leukste dansschool in Genk en Zolder, Limburg België.";

const OG_IMAGE = "/images/opengraph.jpg";

type PageMetadataOptions = {
  title: string;
  path: string;
  description?: string;
};

/**
 * Next.js replaces (rather than merges) `openGraph` and `twitter` from parent
 * layouts, so every page builds its complete set of tags here.
 */
export function pageMetadata({
  title,
  path,
  description = DEFAULT_DESCRIPTION,
}: PageMetadataOptions): Metadata {
  return {
    title: `${title} | Salsera Cubana`,
    description,
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: OG_IMAGE,
    },
    other: {
      "twitter:url": new URL(path, SITE_URL).href,
    },
  };
}
