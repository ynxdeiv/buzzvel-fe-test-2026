import type { ImageField } from "@prismicio/client";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { HeroContent } from "@/types/content";
import { HeroVisual } from "./HeroVisual";

export type HeroProps = {
  content: HeroContent;
  image: ImageField;
  avatars: ImageField[];
};

export function Hero({ content, image, avatars }: HeroProps) {
  return (
    <Section
      aria-labelledby="hero-title"
      className="overflow-x-clip"
      containerClassName="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-15"
    >
      <div className="xl:flex-1">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading as="h1" id="hero-title" size="display" className="mt-4">
          {content.title}
        </Heading>
        <Text className="mt-6 max-w-120">{content.description}</Text>

        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <ButtonLink href={content.primaryCta.href}>{content.primaryCta.label}</ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </ButtonLink>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
          <AvatarStack avatars={avatars} />
          <p className="text-body-1 text-text-secondary">
            <strong className="font-bold text-text-primary">{content.socialProof.highlight}</strong>{" "}
            {content.socialProof.text}
          </p>
        </div>
      </div>

      {/* Visually first until 1280px (as in the mobile design); text stays first in the DOM for screen readers.
            Side by side only from xl: the 500px visual does not fit next to the text at 1024px. */}
      <HeroVisual
        image={image}
        coursesBadge={content.coursesBadge}
        ratingBadge={content.ratingBadge}
        className="order-first xl:order-none xl:shrink-0"
      />
    </Section>
  );
}
