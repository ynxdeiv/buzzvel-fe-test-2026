import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Text } from "@/components/ui/Text";
import type { SectionIntro as SectionIntroContent, Step } from "@/types/content";
import { StepIcon } from "./StepIcon";

export type HowItWorksProps = {
  intro: SectionIntroContent;
  steps: Step[];
};

/**
 * Steps are joined by a connector line: vertical between steps on mobile,
 * horizontal through the icons on desktop (drawn by each step's ::before, under the icons).
 */
export function HowItWorks({ intro, steps }: HowItWorksProps) {
  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-title">
      <SectionIntro content={intro} titleId="how-it-works-title" align="center" />

      <ol className="mt-10 flex flex-col lg:mt-20 lg:flex-row lg:gap-20 lg:py-7">
        {steps.map((step) => (
          <li
            key={step.label}
            className="relative pb-12 before:absolute before:bottom-0 before:left-7 before:h-12 before:w-px before:bg-line-1 last:pb-0 last:before:hidden lg:flex-1 lg:pb-0 lg:before:top-7 lg:before:bottom-auto lg:before:left-13 lg:before:h-px lg:before:w-[calc(100%+2.5625rem)]"
          >
            <StepIcon variant={step.icon} />
            <Eyebrow tone="muted" className="mt-6">
              {step.label}
            </Eyebrow>
            <Heading as="h3" size="card" className="mt-2">
              {step.title}
            </Heading>
            <Text size="subtitle-2" className="mt-3">
              {step.description}
            </Text>
          </li>
        ))}
      </ol>
    </Section>
  );
}
