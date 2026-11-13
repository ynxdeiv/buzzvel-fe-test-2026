export type Link = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: Link;
  secondaryCta: Link;
  socialProof: { highlight: string; text: string };
  coursesBadge: { value: string; label: string };
  ratingBadge: { label: string };
};

export type Category = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type FeaturedCourseContent = SectionIntro & {
  tag: string;
  instructor: string;
  details: string[];
  primaryCta: Link;
  secondaryCta: Link;
};

export type StepIconVariant = "focus" | "experience" | "practice";

export type Step = {
  label: string;
  title: string;
  description: string;
  icon: StepIconVariant;
};

export type Stat = {
  value: string;
  label: string;
};

export type TestimonialContent = {
  quote: string;
  author: { name: string; role: string };
  stats: Stat[];
};

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
  icon: "icon-chat" | "icon-clock";
};

export type ToastCopy = {
  title: string;
  description: string;
};

export type FieldCopy = {
  label: string;
  placeholder: string;
};

export type ContactFormCopy = {
  fields: Record<"name" | "email" | "question", FieldCopy>;
  submit: { label: string; pendingLabel: string };
  toast: { success: ToastCopy; error: ToastCopy };
};

export type ContactContent = SectionIntro & {
  channels: ContactChannel[];
  form: ContactFormCopy & { title: string; description: string };
};

export type FinalCtaContent = {
  title: string;
  description: string;
  primaryCta: Link;
  secondaryCta: Link;
};

export type FooterColumn = {
  title: string;
  links: Link[];
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
};

export type NavigationContent = {
  links: Link[];
  login: Link;
  cta: Link;
};
