import type { ImageField } from "@prismicio/client";
import { PrismicImage } from "@/components/ui/PrismicImage";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { FeaturedCourseContent } from "@/types/content";

export type FeaturedCourseProps = {
  content: FeaturedCourseContent;
  image: ImageField;
};

export function FeaturedCourse({ content, image }: FeaturedCourseProps) {
  return (
    <Section id="featured" tone="blue" aria-labelledby="featured-title">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-15">
        <div className="relative">
          <div className="relative h-70 overflow-hidden rounded-2xl bg-primary-blue-light md:h-102">
            <PrismicImage
              field={image}
              fill
              sizes="(min-width: 1024px) 530px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <Tag variant="highlight" className="absolute -top-3 -left-3">
            {content.tag}
          </Tag>
        </div>

        <div>
          <SectionIntro
            content={{ eyebrow: content.eyebrow, title: content.title }}
            titleId="featured-title"
            tone="inverse"
          />
          <Text size="subtitle-2" tone="inverse" className="mt-5">
            {content.description}
          </Text>
          <Text size="subtitle-2" tone="inverse" className="mt-6">
            {content.instructor}
          </Text>

          <ul aria-label="Course details" className="mt-6 flex flex-wrap gap-3">
            {content.details.map((detail) => (
              <li key={detail}>
                <Tag variant="outline">{detail}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <ButtonLink href={content.primaryCta.href} variant="accent">
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="ghost-inverse" size="text" className="group">
              {content.secondaryCta.label}
              <Icon
                name="arrow-light"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
