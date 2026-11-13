import { cn } from "@/lib/utils";
import type { SectionIntro as SectionIntroContent } from "@/types/content";
import { Eyebrow, type EyebrowProps } from "./Eyebrow";
import { Heading } from "./Heading";
import { Text } from "./Text";

export type SectionIntroProps = {
  content: SectionIntroContent;
  /** Id of the heading, referenced by the section's aria-labelledby. */
  titleId: string;
  align?: "start" | "center";
  tone?: "default" | "inverse";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

/** Eyebrow + section title (h2) + optional description, the opener of most sections. */
export function SectionIntro({
  content,
  titleId,
  align = "start",
  tone = "default",
  className,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) {
  const eyebrowTone: EyebrowProps["tone"] = tone === "inverse" ? "inverse" : "brand";

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Eyebrow tone={eyebrowTone}>{content.eyebrow}</Eyebrow>
      <Heading id={titleId} tone={tone} className={cn("mt-4", titleClassName)}>
        {content.title}
      </Heading>
      {content.description ? (
        <Text tone={tone === "inverse" ? "inverse" : "secondary"} className={cn("mt-4", descriptionClassName)}>
          {content.description}
        </Text>
      ) : null}
    </div>
  );
}
