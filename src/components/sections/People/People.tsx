import type { ImageField } from "@prismicio/client";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { Link, SectionIntro as SectionIntroContent } from "@/types/content";
import { PeopleGallery } from "./PeopleGallery";

export type PeopleProps = {
  intro: SectionIntroContent & { cta: Link };
  photos: ImageField[];
};

export function People({ intro, photos }: PeopleProps) {
  return (
    <Section id="community" aria-labelledby="people-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-15">
        <div className="lg:flex-1">
          <SectionIntro
            content={intro}
            titleId="people-title"
            titleClassName="mt-2"
            descriptionClassName="mt-6 lg:mt-8"
          />
          <ButtonLink href={intro.cta.href} variant="secondary" className="mt-6 lg:mt-8">
            {intro.cta.label}
          </ButtonLink>
        </div>
        <PeopleGallery photos={photos} className="lg:mr-2.5 lg:flex-1" />
      </div>
    </Section>
  );
}
