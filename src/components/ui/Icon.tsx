import Image, { type ImageProps } from "next/image";

/** Intrinsic sizes of the SVGs exported from Figma (public/icons). */
const ICONS = {
  "logo-dark": [54, 17],
  "logo-light": [54, 17],
  star: [14, 14],
  "arrow-dark": [20, 20],
  "arrow-light": [20, 20],
  quote: [24, 22],
  "icon-chat": [24, 24],
  "icon-clock": [20, 20],
  "icon-menu": [24, 24],
  "icon-close": [24, 24],
  "icon-alert": [16, 16],
  "cta-deco-1": [83, 83],
  "cta-deco-cube": [160, 160],
  "cta-deco-bubble": [32, 32],
  "cta-deco-3": [61, 61],
  "cta-deco-4": [48, 48],
} as const satisfies Record<string, readonly [number, number]>;

export type IconName = keyof typeof ICONS;

export type IconProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  name: IconName;
  /** Leave empty for decorative icons (default). */
  alt?: string;
};

/** Renders a static SVG asset from the design. Decorative unless `alt` is provided. */
export function Icon({ name, alt = "", ...props }: IconProps) {
  const [width, height] = ICONS[name];
  return (
    <Image
      src={`/icons/${name}.svg`}
      width={width}
      height={height}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      unoptimized
      {...props}
    />
  );
}
