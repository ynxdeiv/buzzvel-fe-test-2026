import type { CSSProperties } from "react";
import type { ImageField } from "@prismicio/client";
import { PrismicImage } from "@/components/ui/PrismicImage";
import { cn } from "@/lib/utils";

/** Collage geometry measured on the 520px-wide desktop frame; scaled fluidly with container units. */
const DESIGN_WIDTH = 520;
const COLUMN_GAP = 16;
const ROW_GAP = 12.84;
const CIRCLE_SIZE = 500;

type Column = {
  offsetTop: number;
  align: "start" | "end";
  photos: { width: number; height: number }[];
};

const COLUMNS: Column[] = [
  {
    offsetTop: 64.2,
    align: "end",
    photos: [
      { width: 102.7, height: 154.1 },
      { width: 138, height: 207 },
    ],
  },
  {
    offsetTop: 25.7,
    align: "start",
    photos: [
      { width: 102.7, height: 170.1 },
      { width: 102.7, height: 172.5 },
      { width: 102.7, height: 128.4 },
    ],
  },
  {
    offsetTop: 0,
    align: "start",
    photos: [
      { width: 102.7, height: 137.2 },
      { width: 102.7, height: 138 },
      { width: 102.7, height: 154.1 },
    ],
  },
  {
    offsetTop: 0,
    align: "start",
    photos: [
      { width: 128.4, height: 204.6 },
      { width: 102.7, height: 132.4 },
    ],
  },
];

/** Index of each column's first photo in the flat `photos` array. */
const COLUMN_START = COLUMNS.map((_, index) =>
  COLUMNS.slice(0, index).reduce((total, column) => total + column.photos.length, 0),
);

const cq = (px: number) => `${((px / DESIGN_WIDTH) * 100).toFixed(3)}cqw`;

export type PeopleGalleryProps = {
  /** Photos in column order (top to bottom, left to right). */
  photos: ImageField[];
  className?: string;
};

export function PeopleGallery({ photos, className }: PeopleGalleryProps) {
  return (
    <div className={cn("@container mx-auto w-full max-w-130", className)}>
      <div className="relative flex items-center justify-center" style={{ gap: cq(COLUMN_GAP) }}>
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 aspect-square -translate-1/2 rounded-full bg-primary-blue-light"
          style={{ width: cq(CIRCLE_SIZE) }}
        />
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={cn("relative flex flex-col", column.align === "end" ? "items-end" : "items-start")}
            style={{ gap: cq(ROW_GAP), paddingTop: cq(column.offsetTop) } satisfies CSSProperties}
          >
            {column.photos.map((photo, index) => {
              const photoIndex = COLUMN_START[columnIndex] + index;
              return (
                <div
                  key={photoIndex}
                  className="relative overflow-hidden rounded-sm bg-primary-blue-light shadow-photo"
                  style={{ width: cq(photo.width), aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <PrismicImage
                    field={photos[photoIndex]}
                    fallbackAlt=""
                    fill
                    sizes="(min-width: 1024px) 140px, 25vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
