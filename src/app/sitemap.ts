import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

const PATHS = ["/", "/danslessen/", "/evenementen/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: new URL(path, SITE_URL).href }));
}
