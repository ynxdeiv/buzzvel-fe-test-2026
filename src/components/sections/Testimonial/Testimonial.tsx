import type { ImageField } from "@prismicio/client";
import { PrismicImage } from "@/components/ui/PrismicImage";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { TestimonialContent } from "@/types/content";
import { StatList } from "./StatList";

export type TestimonialProps = {
  content: TestimonialContent;
  avatar: ImageField;
};

export function Testimonial({ content, avatar }: TestimonialProps) {
  return (
    <Section tone="white" aria-label="What learners say">
      <div className="flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <figure className="max-w-150">
          <Icon name="quote" />
          <blockquote className="mt-4 font-heading text-mobile-quotes text-text-primary lg:text-desktop-quotes">
            <p>{content.quote}</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-primary-blue-light">
              <PrismicImage field={avatar} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span>
              <span className="block text-mobile-subtitle-1 font-bold text-text-primary lg:text-desktop-subtitle-2">
                {content.author.name}
              </span>
              <span className="block text-body-1 text-text-secondary">{content.author.role}</span>
            </span>
          </figcaption>
        </figure>

        <StatList stats={content.stats} />
      </div>
    </Section>
  );
}
