import { asImageSrc } from "@prismicio/client";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { SocialCard } from "@/components/og/SocialCard";
import { hero } from "@/content/landing";
import { loadGoogleFont, loadImageAsDataUrl, readPublicSvg } from "@/lib/og";
import { getLandingImages } from "@/lib/prismic/getLandingImages";

export const alt = `Luma — ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Renders the card once and caches the PNG. Font downloads, the Prismic photo and file reads all
 * happen inside the cache scope, so the route is prerendered at build time instead of per request.
 */
async function renderSocialCard(): Promise<ArrayBuffer> {
  "use cache";
  cacheLife("max");

  const { hero_image } = await getLandingImages();
  const badge = hero.coursesBadge;
  const socialProof = `${hero.socialProof.highlight} ${hero.socialProof.text}`;
  const interText = `${hero.eyebrow.toUpperCase()}${badge.value} ${badge.label}${socialProof}·★ ${hero.ratingBadge.label}`;

  const [logoSrc, photoSrc, jakarta, inter] = await Promise.all([
    readPublicSvg("icons/logo-dark.svg"),
    // Satori decodes PNG/JPEG only, so ask imgix for a JPEG cropped to the card's photo slot.
    loadImageAsDataUrl(asImageSrc(hero_image, { w: 840, h: 1004, fit: "crop", fm: "jpg", q: 80 }) ?? ""),
    loadGoogleFont("Plus Jakarta Sans", 800, hero.title),
    loadGoogleFont("Inter", 600, interText),
  ]);

  const image = new ImageResponse(
    <SocialCard
      logoSrc={logoSrc}
      photoSrc={photoSrc}
      eyebrow={hero.eyebrow}
      title={hero.title}
      badge={badge}
      socialProof={socialProof}
      rating={hero.ratingBadge.label}
    />,
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: jakarta, weight: 800, style: "normal" },
        { name: "Inter", data: inter, weight: 600, style: "normal" },
      ],
    },
  );
  return image.arrayBuffer();
}

/** Share image (Open Graph; Next.js also emits it as the X/Twitter image). */
export default async function OpengraphImage() {
  return new Response(await renderSocialCard(), { headers: { "Content-Type": contentType } });
}
