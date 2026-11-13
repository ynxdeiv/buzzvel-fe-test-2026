import { cacheLife } from "next/cache";
import { cacheTagPrismicPages } from "@prismicio/next";
import { createClient } from "@/prismicio";

/**
 * Fetches every image of the landing page from the Prismic `landing_images` singleton.
 * Cached at build time (`'use cache'` + `cacheLife("max")`) so the page stays static;
 * the Prismic webhook (/api/revalidate) refreshes it when the document is republished.
 */
export async function getLandingImages() {
  "use cache";
  cacheLife("max");

  const client = createClient();
  const document = await client.getSingle("landing_images");
  cacheTagPrismicPages([document]);

  return document.data;
}

export type LandingImages = Awaited<ReturnType<typeof getLandingImages>>;
