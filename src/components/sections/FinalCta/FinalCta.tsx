import type { ImageField } from "@prismicio/client";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { FinalCtaContent } from "@/types/content";
import { CtaDecorations } from "./CtaDecorations";

export type FinalCtaProps = {
  content: FinalCtaContent;
  avatars: ImageField[];
};

export function FinalCta({ content, avatars }: FinalCtaProps) {
  return (
    <Section tone="yellow" aria-labelledby="final-cta-title" className="relative overflow-hidden">
      <CtaDecorations className="hidden lg:block" />

      <div className="relative mx-auto max-w-180 text-center">
        <AvatarStack avatars={avatars} size="md" ring="yellow" className="justify-center" />
        <Heading id="final-cta-title" size="cta" className="mt-8">
          {content.title}
        </Heading>
        <Text className="mt-4">{content.description}</Text>
        <div className="mt-10 flex flex-col gap-3 md:flex-row md:justify-center">
          <ButtonLink href={content.primaryCta.href}>{content.primaryCta.label}</ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
