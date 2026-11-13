import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

/**
 * Downloads one static weight of a Google Font as TrueType (Satori can't read WOFF2), subset to
 * the given text. Cached, so it only runs when the Open Graph image is generated at build time.
 */
export async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  "use cache";
  cacheLife("max");

  const query = `family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`).then((response) => response.text());
  const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!fontUrl) throw new Error(`Could not load ${family} ${weight} for the Open Graph image`);

  const response = await fetch(fontUrl);
  if (!response.ok) throw new Error(`Could not download ${family} ${weight} (${response.status})`);
  return response.arrayBuffer();
}

/** Fetches a remote image and returns it as a data URL, so Satori doesn't fetch it again uncached. */
export async function loadImageAsDataUrl(url: string): Promise<string> {
  "use cache";
  cacheLife("max");

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download ${url} (${response.status})`);
  const type = response.headers.get("content-type") ?? "image/jpeg";
  return `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
}

/** Reads an SVG from public/ as a data URL. Call it inside a cached scope: async file reads are uncached data. */
export async function readPublicSvg(file: string): Promise<string> {
  const svg = await readFile(path.join(process.cwd(), "public", file));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}
