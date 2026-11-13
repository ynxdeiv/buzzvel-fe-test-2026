import { ContactForm } from "@/components/forms/ContactForm";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Text } from "@/components/ui/Text";
import type { ContactContent } from "@/types/content";
import { ContactInfoCard } from "./ContactInfoCard";

export type ContactProps = {
  content: ContactContent;
};

export function Contact({ content }: ContactProps) {
  return (
    <Section id="contact" tone="white" aria-labelledby="contact-title">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-8 lg:w-120 lg:gap-10">
          <SectionIntro
            content={content}
            titleId="contact-title"
            descriptionClassName="text-mobile-subtitle-2 lg:text-desktop-subtitle-1"
          />
          <ul className="flex flex-col gap-4">
            {content.channels.map((channel) => (
              <li key={channel.label}>
                <ContactInfoCard channel={channel} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line-1 bg-background-white px-5 py-6 shadow-card lg:w-135 lg:shrink-0 lg:p-10">
          <Heading as="h3" size="form">
            {content.form.title}
          </Heading>
          <Text size="body" className="mt-2">
            {content.form.description}
          </Text>
          <ContactForm copy={content.form} className="mt-6" />
        </div>
      </div>
    </Section>
  );
}
