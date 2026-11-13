import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Positions measured on the 1280px Figma frame: `x` scales with the width, `y` is in px. */
const FRAME_WIDTH = 1280;

type Decoration =
  | { kind: "ring" | "dot" | "square" | "outline-square"; x: number; y: number; size: number; rotate?: number }
  | { kind: "icon"; icon: IconName; x: number; y: number; size: number; rotate?: number };

const DECORATIONS: Decoration[] = [
  { kind: "ring", x: 22, y: 16, size: 108 },
  { kind: "dot", x: 56, y: 373, size: 120 },
  { kind: "dot", x: 1064, y: 468, size: 40 },
  { kind: "square", x: 1154.7, y: -13.2, size: 115, rotate: 12 },
  { kind: "square", x: -27.8, y: 235.3, size: 56, rotate: 12 },
  { kind: "ring", x: 1208, y: 429, size: 32 },
  { kind: "ring", x: 877, y: 43, size: 32 },
  { kind: "outline-square", x: 322.2, y: 47.6, size: 56, rotate: 12 },
  { kind: "icon", icon: "cta-deco-1", x: 281.3, y: 369.3, size: 82.56, rotate: 15 },
  { kind: "icon", icon: "cta-deco-cube", x: 1080, y: 180, size: 160 },
  { kind: "icon", icon: "cta-deco-bubble", x: 141, y: 214, size: 32 },
  { kind: "icon", icon: "cta-deco-3", x: 1016, y: 82, size: 61.376 },
  { kind: "icon", icon: "cta-deco-4", x: 963, y: 381, size: 48 },
];

const SHAPE_STYLES = {
  ring: "rounded-full border-2 border-background-orange",
  dot: "rounded-full bg-background-orange",
  square: "rounded-lg bg-background-orange",
  "outline-square": "rounded-lg border border-background-orange",
} as const;

export type CtaDecorationsProps = {
  className?: string;
};

/** Decorative shapes of the final call to action (desktop only, like the design). */
export function CtaDecorations({ className }: CtaDecorationsProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {DECORATIONS.map((decoration, index) => {
        const style: CSSProperties = {
          left: `${(decoration.x / FRAME_WIDTH) * 100}%`,
          top: decoration.y,
          width: decoration.size,
          height: decoration.size,
          rotate: decoration.rotate ? `${decoration.rotate}deg` : undefined,
        };

        if (decoration.kind === "icon") {
          return <Icon key={index} name={decoration.icon} className="absolute" style={style} />;
        }

        return <span key={index} className={cn("absolute", SHAPE_STYLES[decoration.kind])} style={style} />;
      })}
    </div>
  );
}
