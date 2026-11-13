import { PrismicNextImage, type PrismicNextImageProps } from "@prismicio/next";

/** AVIF/WebP when the browser supports it, plus compression (assets are stored as PNG in Prismic). */
const DEFAULT_IMGIX_PARAMS: PrismicNextImageProps["imgixParams"] = { auto: ["format", "compress"] };

export type PrismicImageProps = PrismicNextImageProps;

/** The only way the site renders Prismic images: `PrismicNextImage` with the project's imgix defaults. */
export function PrismicImage({ imgixParams, ...props }: PrismicImageProps) {
  return <PrismicNextImage imgixParams={{ ...DEFAULT_IMGIX_PARAMS, ...imgixParams }} {...props} />;
}
